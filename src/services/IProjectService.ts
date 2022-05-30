import { ProjectData } from '../types';

export interface IProjectService {
  snapshot(): ProjectData;
  load(pd: ProjectData): void;
  save(): void;
  download(): void;
  open(file: Blob): void;
}
