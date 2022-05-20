export interface ISimulationControllerService {
  start(): void;
  stop(): void;
  next(): void;
  resume(): void;
}
