export interface ISimulationService {
  start(): void;
  stop(): void;
  next(): void;
  resume(): void;
}
