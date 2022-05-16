import { ProjectData } from '../types';

export interface IExportService {
  toPNG(title: string): Promise<void>;
  toCode(pd: ProjectData): string;
}
