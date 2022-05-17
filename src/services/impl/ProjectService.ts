import FileSaver from 'file-saver';
import { toast } from 'react-toastify';
import InitialValues from '../../config/InitialValues';
import { ProjectDataSchema } from '../../config/ProjectDataValidation';
import { AppContextType, ProjectData } from '../../types';
import { nameof, throwErrorIfNull } from '../../util';
import { IProjectService } from '../IProjectService';

export class ProjectService implements IProjectService {
  private _appContext: AppContextType;
  constructor(appContext: AppContextType) {
    this._appContext = appContext;
  }

  public load(pd: ProjectData): void {
    this._appContext.setEdges(pd.edges);
    this._appContext.setBlocks(pd.blocks);
    this._appContext.setTitle(pd.title);
    this._appContext.setInputParams(pd.inputParams);
  }
  public save(pd: ProjectData): void {
    window.localStorage.clear();
    window.localStorage.setItem(nameof<ProjectData>('blocks'), JSON.stringify(pd.blocks));
    window.localStorage.setItem(nameof<ProjectData>('edges'), JSON.stringify(pd.edges));
    window.localStorage.setItem(nameof<ProjectData>('title'), pd.title);
    window.localStorage.setItem(nameof<ProjectData>('inputParams'), pd.inputParams);
    InitialValues.refresh();
  }
  public download(pd: ProjectData): void {
    const blob = new Blob([JSON.stringify(pd, null, 2)], { type: 'application/json' });
    FileSaver.saveAs(blob, pd.title + '.json');
  }
  public open(file: Blob, onOpen?: (content: ProjectData) => void): void {
    const fileReader = new FileReader();
    const handleFileRead = () => {
      try {
        const content: ProjectData = JSON.parse(throwErrorIfNull(fileReader.result));
        const result = ProjectDataSchema.validate(content);
        if (result.error) {
          throw new Error(result.error.message);
        }
        if (onOpen) onOpen(content);
      } catch (e: any) {
        toast.error('Invalid project file: ' + e.message);
      }
    };
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  }
}
