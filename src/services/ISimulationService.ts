export interface ISimulationService {
  hasNext(): boolean;
  initialize(): void;
  process(): Promise<void>;
}
