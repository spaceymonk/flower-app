export interface IExportService {
  toPNG(): Promise<void>;
  toCode(): string;
}
