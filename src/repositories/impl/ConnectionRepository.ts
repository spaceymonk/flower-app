import Block from '../../model/Block';
import Connection from '../../model/Connection';
import { includesConnection } from '../../services/helpers/ConnectionHelper';
import { Optional } from '../../util/Optional';
import { IConnectionRepository } from '../IConnectionRepository';

export class ConnectionRepository implements IConnectionRepository {
  private _getConnections: () => Connection[];
  private _setConnections: ((bs: Connection[]) => void) & ((arg0: (bs: Connection[]) => Connection[]) => void);

  constructor(
    getConnections: () => Connection[],
    setConnections: ((bs: Connection[]) => void) & ((arg0: (bs: Connection[]) => Connection[]) => void)
  ) {
    this._getConnections = getConnections;
    this._setConnections = setConnections;
  }
  public findAllByIds(ids: string[]): Connection[] {
    return this._getConnections().filter((c) => ids.includes(c.id));
  }
  public findAllBySourceId(id: string): Connection[] {
    return this._getConnections().filter((c) => c.sourceId === id);
  }
  public findAllByTargetId(id: string): Connection[] {
    return this._getConnections().filter((c) => c.targetId === id);
  }
  public findAllBySourceIdAndTargetId(sourceId: string, targetId: string): Connection[] {
    return this._getConnections().filter((c) => c.sourceId === sourceId && c.targetId === targetId);
  }
  public findByBlocks(blocks: Block[]): Connection[] {
    return this._getConnections().filter((c) => blocks.some((b) => b.id === c.sourceId || b.id === c.targetId));
  }
  public save(connection: Connection): void {
    this._setConnections((connections) => connections.map((c) => (c.id === connection.id ? connection : c)));
  }
  public delete(connection: Connection): void {
    this._setConnections((connections) => connections.filter((c) => c.id !== connection.id));
  }
  public saveAll(connections: Connection[]): void {
    this._setConnections((cs) =>
      cs.map((c) => {
        const connection = connections.find((c2) => c2.id === c.id);
        return connection ? connection : c;
      })
    );
  }
  public deleteAll(c: Connection[]): void {
    this._setConnections((cs) => cs.filter((c) => !includesConnection(cs, c)));
  }
  public findById(id: string): Optional<Connection> {
    return new Optional(this._getConnections().find((c) => c.id === id));
  }
  public existsById(id: string): boolean {
    return this._getConnections().some((c) => c.id === id);
  }
  public getAll(): Connection[] {
    return this._getConnections();
  }
}
