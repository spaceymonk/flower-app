import React from 'react';
import { toast } from 'react-toastify';
import MultipleStartError from '../../exceptions/MultipleStartError';
import MultipleStopError from '../../exceptions/MultipleStopError';
import NotConnectedError from '../../exceptions/NotConnectedError';
import { useSimulationContext } from '../../providers/SimulationProvider';
import { GlowTypes, SimulationActions } from '../../types';
import useBlockService from './useBlockService';
import useFlowParser from './useFlowParser';

const useSimulation = () => {
  const speedInMsRef = React.useRef(500);
  const jumpNextBlockRef = React.useRef(false);
  const actionRef = React.useRef(SimulationActions.none);

  const flowParser = useFlowParser();
  const { highlightBlocks } = useBlockService();
  const { isRunning, setRunning } = useSimulationContext();

  const stop = React.useCallback(() => {
    if (isRunning()) {
      console.log('[simulation] stop');
      actionRef.current = SimulationActions.stop;
    }
  }, [isRunning]);

  const run = React.useCallback(() => {
    setRunning(true);
    toast.info('Simulation started!');
    const simulationLoop = () => {
      console.log('[simualtion] timeout', actionRef.current);
      if (actionRef.current === SimulationActions.stop || !flowParser.hasNext()) {
        highlightBlocks(null);
        setRunning(false);
        actionRef.current = SimulationActions.none;
        toast.info('Simulation ended!');
      } else {
        if (actionRef.current === SimulationActions.continue) {
          flowParser.parse();
        } else if (actionRef.current === SimulationActions.debug && jumpNextBlockRef.current) {
          jumpNextBlockRef.current = false;
          flowParser.parse();
        }
        setTimeout(simulationLoop, speedInMsRef.current);
      }
    };
    simulationLoop();
  }, [setRunning, flowParser, highlightBlocks]);

  const start = React.useCallback(() => {
    actionRef.current = SimulationActions.debug;
    jumpNextBlockRef.current = false;
    try {
      flowParser.validate();
      run();
    } catch (e: any) {
      if (e instanceof NotConnectedError) {
        highlightBlocks(e.blockId, GlowTypes.ERROR);
      } else if (e instanceof MultipleStartError || e instanceof MultipleStopError) {
        highlightBlocks(e.blockIdList, GlowTypes.ERROR);
      }
      toast.error(e.message);
      console.error(e);
      setRunning(false);
      actionRef.current = SimulationActions.none;
    }
  }, [flowParser, run, setRunning, highlightBlocks]);

  const next = React.useCallback(() => {
    if (isRunning()) {
      console.log('[simulation] next');
      jumpNextBlockRef.current = true;
    }
  }, [isRunning]);

  const continueFn = React.useCallback(() => {
    if (isRunning()) {
      console.log('[simulation] continue');
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
