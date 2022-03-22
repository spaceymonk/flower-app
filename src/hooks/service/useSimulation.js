import React from 'react';
import { toast } from 'react-toastify';
import NotConnectedError from '../../exceptions/NotConnectedError';
import { SimulationContext } from '../../providers/SimulationProvider';
import useBlockService, { GlowTypes } from './useBlockService';
import useParser from './useParser';

const SimulationActions = Object.freeze({
  none: 0,
  stop: 1,
  continue: 2,
  debug: 3,
});

const useSimulation = () => {
  const speedInMsRef = React.useRef(500);
  const jumpNextBlockRef = React.useRef(false);
  const actionRef = React.useRef(SimulationActions.none);

  const parser = useParser();
  const { highlightNode } = useBlockService();
  const { isRunning, setRunning } = React.useContext(SimulationContext);

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
      if (actionRef.current === SimulationActions.stop || !parser.hasNext()) {
        highlightNode();
        setRunning(false);
        actionRef.current = SimulationActions.none;
        toast.info('Simulation ended!');
      } else {
        if (actionRef.current === SimulationActions.continue) {
          parser.parse();
        } else if (actionRef.current === SimulationActions.debug && jumpNextBlockRef.current) {
          jumpNextBlockRef.current = false;
          parser.parse();
        }
        setTimeout(simulationLoop, speedInMsRef.current);
      }
    };
    simulationLoop();
  }, [highlightNode, parser, setRunning]);

  const start = React.useCallback(() => {
    actionRef.current = SimulationActions.debug;
    jumpNextBlockRef.current = false;
    try {
      parser.validate();
      run();
    } catch (e) {
      if (e instanceof NotConnectedError) {
        highlightNode(e.blockId, GlowTypes.ERROR);
      }
      toast.error(e.message);
      console.error(e);
      setRunning(false);
      actionRef.current = SimulationActions.none;
    }
  }, [highlightNode, parser, run, setRunning]);

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
    setSpeedInMs: (val) => (speedInMsRef.current = val),
  };
};

export default useSimulation;
