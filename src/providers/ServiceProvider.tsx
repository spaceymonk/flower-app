import React from 'react';
import { useReactFlow } from 'react-flow-renderer';
import CanvasFacade from '../adapters/CanvasFacade';
import { IBlockRepository } from '../repositories/IBlockRepository';
import { IConnectionRepository } from '../repositories/IConnectionRepository';
import { BlockRepository } from '../repositories/impl/BlockRepository';
import { ConnectionRepository } from '../repositories/impl/ConnectionRepository';
import { IBlockService } from '../services/IBlockService';
import { IConnectionService } from '../services/IConnectionService';
import { IExportService } from '../services/IExportService';
import { BlockService } from '../services/impl/BlockService';
import { ConnectionService } from '../services/impl/ConnectionService';
import { ExportService } from '../services/impl/ExportService';
import { ProjectService } from '../services/impl/ProjectService';
import { IProjectService } from '../services/IProjectService';
import { ICanvasFacade } from '../types/ICanvasFacade';
import { throwErrorIfNull } from '../util';
import { useAppContext } from './AppProvider';

type ServiceContextType = {
  canvasFacade: ICanvasFacade;
  blockService: IBlockService;
  blockRepository: IBlockRepository;
  connectionService: IConnectionService;
  connectionRepository: IConnectionRepository;
  projectService: IProjectService;
  exportService: IExportService;
};

const ServiceContext = React.createContext<ServiceContextType | null>(null);


/**
 * This component is used to inject services to all the components.
 */
export const ServiceProvider = (props: React.PropsWithChildren<React.ReactNode>) => {
  const appContext = useAppContext();
  const reactFlowInstance = useReactFlow();

  const canvasFacade = React.useMemo<ICanvasFacade>(() => new CanvasFacade(reactFlowInstance), [reactFlowInstance]);
  const blockRepository = React.useMemo<IBlockRepository>(() => new BlockRepository(appContext.getBlocks, appContext.setBlocks), [appContext]);
  const connectionRepository = React.useMemo<IConnectionRepository>(
    () => new ConnectionRepository(appContext.getConnections, appContext.setConnections),
    [appContext]
  );
  const connectionService = React.useMemo<IConnectionService>(
    () => new ConnectionService(connectionRepository, blockRepository),
    [connectionRepository, blockRepository]
  );
  const projectService = React.useMemo<IProjectService>(() => new ProjectService(appContext), [appContext]);
  const exportService = React.useMemo<IExportService>(
    () => new ExportService(blockRepository, connectionRepository),
    [blockRepository, connectionRepository]
  );
  const blockService = React.useMemo<IBlockService>(
    () => new BlockService(blockRepository, connectionRepository, canvasFacade),
    [blockRepository, canvasFacade, connectionRepository]
  );

  const value: ServiceContextType = {
    canvasFacade: canvasFacade,
    blockService: blockService,
    blockRepository: blockRepository,
    connectionService: connectionService,
    connectionRepository: connectionRepository,
    projectService: projectService,
    exportService: exportService,
  };

  return <ServiceContext.Provider value={value}>{props.children}</ServiceContext.Provider>;
};

export const useServiceContext = (): ServiceContextType => {
  const context = React.useContext(ServiceContext);
  return throwErrorIfNull(context, 'ServiceContext not initialized');
};
