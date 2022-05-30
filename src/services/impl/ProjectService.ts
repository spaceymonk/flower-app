import { toast } from 'react-toastify';
import { IBlockRepository } from '../../repositories/IBlockRepository';
import { IConnectionRepository } from '../../repositories/IConnectionRepository';
import { AppContextType, ProjectData } from '../../types';
import { download, save, open } from '../helpers/ProjectHelper';
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

  public save(): void {
    save(this.snapshot());
  }

  public download(): void {
    download(this.snapshot());
  }

  public open(file: Blob): void {
    open(file, (content: ProjectData) => {
      this.load(content);
      toast.success('Project loaded!');
    });
  }
}
