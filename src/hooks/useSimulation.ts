import React from 'react';
import { toast } from 'react-toastify';
import { InvalidDecisionError, MultipleStartError, NotConnectedError } from '../exceptions';
import { useSimulationContext } from '../providers/SimulationProvider';
import { GlowTypes, SimulationActions } from '../types';
import useBlockHelper from './useBlockHelper';
import useFlowParser from './useFlowParser';

const useSimulation = () => {
  const speedInMsRef = React.useRef<number>(500);
  const jumpNextBlockRef = React.useRef<boolean>(false);
  const actionRef = React.useRef<SimulationActions>(SimulationActions.none);

  const flowParser = useFlowParser();
  const { highlightBlocks } = useBlockHelper();
  const { isRunning, setRunning } = useSimulationContext();

  const abort = React.useCallback(
    (msg: string | null = null) => {
      if (msg) toast.error(msg);
      setRunning(false);
      actionRef.current = SimulationActions.none;
    },
    [setRunning]
  );

  const stop = React.useCallback(() => {
    if (isRunning()) {
      actionRef.current = SimulationActions.stop;
    }
  }, [isRunning]);

  const run = React.useCallback(() => {
    setRunning(true);
    toast.info('Simulation started!');
    const simulationLoop = () => {
      if (actionRef.current === SimulationActions.stop || !flowParser.hasNext()) {
        highlightBlocks(null);
        setRunning(false);
        actionRef.current = SimulationActions.none;
        toast.info('Simulation ended!');
      } else {
        try {
          if (actionRef.current === SimulationActions.continue) {
            flowParser.process();
          } else if (actionRef.current === SimulationActions.debug && jumpNextBlockRef.current) {
            jumpNextBlockRef.current = false;
            flowParser.process();
          }
          setTimeout(simulationLoop, speedInMsRef.current);
        } catch (e: any) {
          console.error(e);
          abort(e.message);
        }
      }
    };
    simulationLoop();
  }, [setRunning, flowParser, highlightBlocks, abort]);

  const start = React.useCallback(() => {
    actionRef.current = SimulationActions.debug;
    jumpNextBlockRef.current = false;
    try {
      flowParser.initialize();
      run();
    } catch (e: any) {
      if (e instanceof NotConnectedError || e instanceof InvalidDecisionError) {
        highlightBlocks([e.blockId], GlowTypes.ERROR);
      } else if (e instanceof MultipleStartError || e instanceof MultipleStartError) {
        highlightBlocks(e.blockIdList, GlowTypes.ERROR);
      }
      abort(e.message);
    }
  }, [flowParser, run, abort, highlightBlocks]);

  const next = React.useCallback(() => {
    if (isRunning()) {
      jumpNextBlockRef.current = true;
    }
  }, [isRunning]);

  const continueFn = React.useCallback(() => {
    if (isRunning()) {
      if (actionRef.current === SimulationActions.continue) {
        actionRef.current = SimulationActions.debug;
        jumpNextBlockRef.current = false;
      } else if (actionRef.current === SimulationActions.debug) {
        actionRef.current = SimulationActions.continue;
        jumpNextBlockRef.current = false;
      }
    }
  }, [isRunning]);

  return {
    start,
    stop,
    run,
    next,
    continueFn,
    getSpeedInMs: () => speedInMsRef.current,
    setSpeedInMs: (val: number) => (speedInMsRef.current = val),
  };
};

export default useSimulation;
