export interface IAnalyzeService {
  getCyclomaticComplexity(): Promise<number>;
}
