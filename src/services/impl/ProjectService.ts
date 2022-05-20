import FileSaver from 'file-saver';
import { toast } from 'react-toastify';
import LocalStorageManager from '../../config/LocalStorageManager';
import { ProjectDataSchema } from '../../config/ProjectDataValidation';
import { IBlockRepository } from '../../repositories/IBlockRepository';
import { IConnectionRepository } from '../../repositories/IConnectionRepository';
import { AppContextType, ProjectData } from '../../types';
import { nameof, throwErrorIfNull } from '../../util';
import { BlockCreateFactory } from '../helpers/BlockHelper';
import { IProjectService } from '../IProjectService';

export class ProjectService implements IProjectService {
  private _appContext: AppContextType;
  private _blocksRepository: IBlockRepository;
  private _connectionRepository: IConnectionRepository;

  constructor(appContext: AppContextType, blocksRepository: IBlockRepository, connectionRepository: IConnectionRepository) {
    this._appContext = appContext;
    this._blocksRepository = blocksRepository;
    this._connectionRepository = connectionRepository;
  }

  public snapshot(): ProjectData {
    return {
      blocks: this._blocksRepository.getAll(),
      connections: this._connectionRepository.getAll(),
      title: this._appContext.getTitle(),
      inputParams: this._appContext.getInputParams(),
    };
  }

  public load(pd: ProjectData): void {
    this._blocksRepository.clear();
    this._connectionRepository.clear();
    this._appContext.setTitle(pd.title);
    this._appContext.setInputParams(pd.inputParams);
    this._blocksRepository.saveAll(pd.blocks);
    this._connectionRepository.saveAll(pd.connections);
  }
  public save(pd: ProjectData): void {
    window.localStorage.clear();
    window.localStorage.setItem(nameof<ProjectData>('blocks'), JSON.stringify(pd.blocks));
    window.localStorage.setItem(nameof<ProjectData>('connections'), JSON.stringify(pd.connections));
    window.localStorage.setItem(nameof<ProjectData>('title'), pd.title);
    window.localStorage.setItem(nameof<ProjectData>('inputParams'), pd.inputParams);
    LocalStorageManager.refresh();
  }
  public download(pd: ProjectData): void {
    const blob = new Blob([JSON.stringify(pd, null, 2)], { type: 'application/json' });
    FileSaver.saveAs(blob, pd.title + '.json');
  }
  public open(file: Blob, onOpen?: (content: ProjectData) => void): void {
    const fileReader = new FileReader();
    const handleFileRead = () => {
      try {
        const content: ProjectData = JSON.parse(throwErrorIfNull(fileReader.result).toString());
        const result = ProjectDataSchema.validate(content);
        if (result.error) {
          throw new Error(result.error.message);
        }
        if (onOpen) {
          onOpen({
            title: content.title,
            blocks: content.blocks.map((b: any) => BlockCreateFactory.fromJSON(b)),
            connections: content.connections,
            inputParams: content.inputParams,
          });
        }
      } catch (e: any) {
        toast.error('Invalid project file: ' + e.message);
      }
    };
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  }
}
