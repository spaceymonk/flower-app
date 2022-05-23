import React from 'react';
import { useReactFlow } from 'react-flow-renderer';
import CanvasFacade from '../services/impl/CanvasFacade';
import { IBlockRepository } from '../repositories/IBlockRepository';
import { IConnectionRepository } from '../repositories/IConnectionRepository';
import { BlockRepository } from '../repositories/impl/BlockRepository';
import { ConnectionRepository } from '../repositories/impl/ConnectionRepository';
import { IBlockService } from '../services/IBlockService';
import { IConnectionService } from '../services/IConnectionService';
import { IExportService } from '../services/IExportService';
import { IFlowService } from '../services/IFlowService';
import { BlockService } from '../services/impl/BlockService';
import { ConnectionService } from '../services/impl/ConnectionService';
import { ExportService } from '../services/impl/ExportService';
import { FlowService } from '../services/impl/FlowService';
import { ProjectService } from '../services/impl/ProjectService';
import { SimulationControllerService } from '../services/impl/SimulationControllerService';
import { SimulationService } from '../services/impl/SimulationService';
import { IProjectService } from '../services/IProjectService';
import { ISimulationControllerService } from '../services/ISimulationControllerService';
import { ISimulationService } from '../services/ISimulationService';
import { throwErrorIfNull } from '../util';
import { useAppContext } from './AppProvider';
import { useSimulationContext } from './SimulationProvider';
import { ICanvasFacade } from '../services/ICanvasFacade';
import { IAnalyzeService } from '../services/IAnalyzeService';
import { AnalyzeService } from '../services/impl/AnalyzeService';

type ServiceContextType = {
  canvasFacade: ICanvasFacade;
  blockService: IBlockService;
  blockRepository: IBlockRepository;
  connectionService: IConnectionService;
  connectionRepository: IConnectionRepository;
  projectService: IProjectService;
  exportService: IExportService;
  flowService: IFlowService;
  simulationService: ISimulationService;
  simulationControllerService: ISimulationControllerService;
  analyzeService: IAnalyzeService;
};

const ServiceContext = React.createContext<ServiceContextType | null>(null);

/**
 * This component is used to inject services to all the components.
 */
export const ServiceProvider = (props: React.PropsWithChildren<React.ReactNode>) => {
  const simulationContext = useSimulationContext();
  const appContext = useAppContext();
  const reactFlowInstance = useReactFlow();

  const canvasFacade = React.useMemo<ICanvasFacade>(() => new CanvasFacade(reactFlowInstance), [reactFlowInstance]);
  const blockRepository = React.useMemo<IBlockRepository>(
    () => new BlockRepository(appContext.getBlocks, appContext.setBlocks, appContext.nodesState[1]),
    [appContext]
  );
  const connectionRepository = React.useMemo<IConnectionRepository>(
    () => new ConnectionRepository(appContext.getConnections, appContext.setConnections, appContext.edgesState[1]),
    [appContext]
  );
  const connectionService = React.useMemo<IConnectionService>(
    () => new ConnectionService(connectionRepository, blockRepository),
    [connectionRepository, blockRepository]
  );
  const projectService = React.useMemo<IProjectService>(
    () => new ProjectService(appContext, blockRepository, connectionRepository),
    [appContext, blockRepository, connectionRepository]
  );
  const blockService = React.useMemo<IBlockService>(
    () => new BlockService(blockRepository, connectionRepository, canvasFacade),
    [blockRepository, canvasFacade, connectionRepository]
  );
  const flowService = React.useMemo<IFlowService>(
    () => new FlowService(blockService, blockRepository, connectionRepository),
    [blockRepository, blockService, connectionRepository]
  );
  const analyzeService = React.useMemo<IAnalyzeService>(
    () => new AnalyzeService(blockRepository, connectionRepository, flowService),
    [blockRepository, connectionRepository, flowService]
  );

  const exportService = React.useMemo<IExportService>(
    () => new ExportService(flowService, blockService, connectionRepository),
    [blockService, connectionRepository, flowService]
  );

  const simulationService = React.useMemo<ISimulationService>(
    () => new SimulationService(flowService, blockService, blockRepository, connectionRepository, simulationContext, appContext),
    [appContext, blockRepository, blockService, connectionRepository, flowService, simulationContext]
  );

  const simulationControllerService = React.useMemo<ISimulationControllerService>(
    () => new SimulationControllerService(simulationContext, blockService, simulationService),
    [blockService, simulationContext, simulationService]
  );

  const value: ServiceContextType = {
    canvasFacade: canvasFacade,
    blockService: blockService,
    blockRepository: blockRepository,
    connectionService: connectionService,
    connectionRepository: connectionRepository,
    projectService: projectService,
    exportService: exportService,
    flowService: flowService,
    simulationService: simulationService,
    simulationControllerService: simulationControllerService,
    analyzeService: analyzeService,
  };

  return <ServiceContext.Provider value={value}>{props.children}</ServiceContext.Provider>;
};

export const useServiceContext = (): ServiceContextType => {
  const context = React.useContext(ServiceContext);
  return throwErrorIfNull(context, 'ServiceContext not initialized');
};
