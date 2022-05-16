import { ProjectData } from '../types';

export interface IProjectService {
  load(pd: ProjectData): void;
  save(pd: ProjectData): void;
  download(pd: ProjectData): void;
  open(file: Blob, onOpen?: (content: ProjectData) => void): void;
}
