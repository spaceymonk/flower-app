import React from 'react';
import { Edge } from 'react-flow-renderer';
import ConnectionAdapter from '../../adapters/ConnectionAdapter';
import Block from '../../model/Block';
import Connection from '../../model/Connection';
import { Optional } from '../../util/Optional';
import { IConnectionRepository } from '../IConnectionRepository';

export class ConnectionRepository implements IConnectionRepository {
  private _getConnections: () => Connection[];
  private _setConnections: ((bs: Connection[]) => void) & ((arg0: (bs: Connection[]) => Connection[]) => void);

  private _setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>;

  constructor(
    getConnections: () => Connection[],
    setConnections: ((bs: Connection[]) => void) & ((arg0: (bs: Connection[]) => Connection[]) => void),
    setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>
  ) {
    this._getConnections = getConnections;
    this._setConnections = setConnections;
    this._setEdges = setEdges;
  }
  findBySourceHandleAndSourceId(handleId: string | null, sourceId: string): Optional<Connection> {
    return new Optional(this._getConnections().find((c) => c.sourceHandle === handleId && c.sourceId === sourceId));
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
    this._setEdges((edges) => {
      if (edges.some((e) => e.id === connection.id)) {
        return edges.map((e) => (e.id === connection.id ? ConnectionAdapter.toEdge(connection) : e));
      } else {
        return [...edges, ConnectionAdapter.toEdge(connection)];
      }
    });
    this._setConnections((connections) => {
      if (connections.some((c) => c.id === connection.id)) {
        return connections.map((c) => (c.id === connection.id ? connection : c));
      } else {
        return [...connections, connection];
      }
    });
  }
  public delete(connection: Connection): void {
    this._setConnections((connections) => connections.filter((c) => c.id !== connection.id));
    this._setEdges((edges) => edges.filter((e) => e.id !== connection.id));
  }
  public saveAll(connections: Connection[]): void {
    connections.forEach((c) => this.save(c));
  }
  public deleteAll(cs: Connection[]): void {
    cs.forEach((c) => this.delete(c));
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
