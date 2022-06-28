import { CreateConnectionDto } from '../../dto/CreateConnectionDto';
import { UpdateConnectionDto } from '../../dto/UpdateConnectionDto';
import Connection from '../../model/Connection';
import { IBlockRepository } from '../../repositories/IBlockRepository';
import { IConnectionRepository } from '../../repositories/IConnectionRepository';
import { ContainerBlockHandle, GlowTypes } from '../../types';
import { IConnectionService } from '../IConnectionService';

export class ConnectionService implements IConnectionService {
  private _connectionRepository: IConnectionRepository;
  private _blockRepository: IBlockRepository;

  constructor(connectionRepository: IConnectionRepository, blockRepository: IBlockRepository) {
    this._connectionRepository = connectionRepository;
    this._blockRepository = blockRepository;
  }

  public create(createConnectionDto: CreateConnectionDto): Connection | null {
    const connection = new Connection(
      createConnectionDto.sourceId,
      createConnectionDto.targetId,
      createConnectionDto.sourceHandle,
      createConnectionDto.targetHandle
    );
    if (this.isValidConnection(connection) && this.isValidOnConnect(connection)) {
      this._connectionRepository.save(connection);
      return connection;
    }
    return null;
  }

  public update(id: string, updateConnectionDto: UpdateConnectionDto): Connection | null {
    const newConnection = new Connection(
      updateConnectionDto.sourceId,
      updateConnectionDto.targetId,
      updateConnectionDto.sourceHandle,
      updateConnectionDto.targetHandle
    );
    newConnection.id = id;
    const oldConnection = this._connectionRepository.findById(id).orElseThrow(new Error('Connection not found'));
    if (this.isValidConnection(newConnection) && this.isValidOnUpdate(oldConnection, newConnection)) {
      this._connectionRepository.save(newConnection);
      return newConnection;
    }
    return null;
  }

  public highlightByBlockId(blockId: string | null, glow: GlowTypes): void {
    if (blockId === null) {
      this._connectionRepository.updateHighlightedByIdList([], glow);
    } else {
      const connections = this._connectionRepository.findAllBySourceIdOrTargetId(blockId);
      this._connectionRepository.updateHighlightedByIdList(
        connections.map((c) => c.id),
        glow
      );
    }
  }

  public delete(id: string): void {
    const c = this._connectionRepository.findById(id).orElseThrow(new Error('Connection not found'));
    this._connectionRepository.delete(c);
  }

  public isValidConnection(c: Connection): boolean {
    const source = this._blockRepository.findById(c.sourceId).orElseThrow(new Error('Source not found'));
    const target = this._blockRepository.findById(c.targetId).orElseThrow(new Error('Target not found'));

    // refuse illegal connections to container
    const expr1 = c.targetHandle === ContainerBlockHandle.INNER_TARGET && source.parentNodeId !== target.id;
    const expr2 = c.sourceHandle === ContainerBlockHandle.INNER_SOURCE && target.parentNodeId !== source.id;
    const expr3 = c.targetHandle === ContainerBlockHandle.OUTER_TARGET && source.parentNodeId === target.id;
    const expr4 = c.sourceHandle === ContainerBlockHandle.OUTER_SOURCE && target.parentNodeId === source.id;
    if (expr1 || expr2 || expr3 || expr4) {
      return false;
    }

    if (source.parentNodeId !== target.parentNodeId && !(source.parentNodeId === target.id || target.parentNodeId === source.id)) {
      return false;
    }

    return true;
  }
  public isValidOnConnect(c: Connection): boolean {
    // there can be only one edge with same source data between two nodes
    return !this._connectionRepository.existsBySourceIdAndSourceHandle(c.sourceId, c.sourceHandle);
  }
  public isValidOnUpdate(oldConnection: Connection, newConnection: Connection): boolean {
    return (
      this._connectionRepository.existsById(oldConnection.id) &&
      !this._connectionRepository.existsBySourceIdAndSourceHandleAndTargetIdAndTargetHandle(
        newConnection.sourceId,
        newConnection.sourceHandle,
        newConnection.targetId,
        newConnection.targetHandle
      )
    );
  }
}
