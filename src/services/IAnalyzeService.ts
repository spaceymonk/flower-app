import { BlockTypes } from '../types';

export interface IAnalyzeService {
  getCyclomaticComplexity(): Promise<number>;
  getBlockCountByTypes(): Promise<{ [type in BlockTypes]?: number }>;
}
