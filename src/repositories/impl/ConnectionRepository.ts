import React from 'react';
import { Edge } from 'react-flow-renderer';
import ConnectionAdapter from '../../adapters/ConnectionAdapter';
import Block from '../../model/Block';
import Connection from '../../model/Connection';
import { Optional } from '../../util/Optional';
import { IConnectionRepository } from '../IConnectionRepository';

export class ConnectionRepository implements IConnectionRepository {
  private _connectionMap: Map<string, Connection>;
  private _setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>;

  constructor(connectionMap: Map<string, Connection>, setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>) {
    this._connectionMap = connectionMap;
    this._setEdges = setEdges;
  }
  findAllBySourceIdOrTargetId(id: string): Connection[] {
    const result = [] as Connection[];
    this._connectionMap.forEach((c) => {
      if (c.sourceId === id || c.targetId === id) {
        result.push(c);
      }
    });
    return result;
  }
  updateHighlightedByIdList(ids: string[]): void {
    const result = [] as Connection[];
    const idSet = new Set<string>(ids);
    this._connectionMap.forEach((c) => {
      if (idSet.has(c.id)) {
        c.highlighted = true;
      } else {
        c.highlighted = false;
      }
      result.push(c);
    });
    this._setEdges(() => result.map((c) => ConnectionAdapter.toEdge(c)));
  }
  existsBySourceIdAndSourceHandleAndTargetIdAndTargetHandle(
    sourceId: string,
    sourceHandle: string | null,
    targetId: string,
    targetHandle: string | null
  ): boolean {
    const connectionIter = this._connectionMap.values();
    let it = connectionIter.next();
    while (!it.done) {
      const c = it.value;
      if (c.sourceId === sourceId && c.sourceHandle === sourceHandle && c.targetId === targetId && c.targetHandle === targetHandle) {
        return true;
      }
      it = connectionIter.next();
    }
    return false;
  }
  existsBySourceIdAndSourceHandle(sourceId: string, sourceHandle: string | null): boolean {
    const connectionIter = this._connectionMap.values();
    let it = connectionIter.next();
    while (!it.done) {
      const c = it.value;
      if (c.sourceId === sourceId && c.sourceHandle === sourceHandle) {
        return true;
      }
      it = connectionIter.next();
    }
    return false;
  }
  findBySourceHandleAndSourceId(handleId: string | null, sourceId: string): Optional<Connection> {
    const connectionIter = this._connectionMap.values();
    let it = connectionIter.next();
    while (!it.done) {
      const c = it.value;
      if (c.sourceHandle === handleId && c.sourceId === sourceId) {
        return new Optional(c);
      }
      it = connectionIter.next();
    }
    return new Optional<Connection>(undefined);
  }
  public findAllByIds(ids: string[]): Connection[] {
    const result = [] as Connection[];
    ids.forEach((id) => {
      const c = this._connectionMap.get(id);
      if (c) {
        result.push(c);
      }
    });
    return result;
  }
  public findAllBySourceId(id: string): Connection[] {
    const result = [] as Connection[];
    this._connectionMap.forEach((c) => {
      if (c.sourceId === id) {
        result.push(c);
      }
    });
    return result;
  }
  public findAllByTargetId(id: string): Connection[] {
    const result = [] as Connection[];
    this._connectionMap.forEach((c) => {
      if (c.targetId === id) {
        result.push(c);
      }
    });
    return result;
  }
  public findAllBySourceIdAndTargetId(sourceId: string, targetId: string): Connection[] {
    const result = [] as Connection[];
    this._connectionMap.forEach((c) => {
      if (c.sourceId === sourceId && c.targetId === targetId) {
        result.push(c);
      }
    });
    return result;
  }
  public findByBlocks(blocks: Block[]): Connection[] {
    const blockIdSet = new Set<string>(blocks.map((b) => b.id));
    const result = [] as Connection[];
    this._connectionMap.forEach((c) => {
      if (blockIdSet.has(c.sourceId) || blockIdSet.has(c.targetId)) {
        result.push(c);
      }
    });
    return result;
  }
  public countByBlocks(blocks: Block[]): number {
    return this.findByBlocks(blocks).length;
  }
  public save(connection: Connection): void {
    this._setEdges((edges) => {
      if (this._connectionMap.has(connection.id)) {
        return edges.map((e) => (e.id === connection.id ? ConnectionAdapter.toEdge(connection) : e));
      } else {
        return edges.concat(ConnectionAdapter.toEdge(connection));
      }
    });
    this._connectionMap.set(connection.id, connection);
  }
  public delete(connection: Connection): void {
    this._setEdges((edges) => edges.filter((e) => e.id !== connection.id));
    this._connectionMap.delete(connection.id);
  }
  public saveAll(connections: Connection[]): void {
    connections.forEach((c) => this.save(c));
  }
  public deleteAll(cs: Connection[]): void {
    cs.forEach((c) => this.delete(c));
  }
  public clear(): void {
    this._setEdges(() => []);
    this._connectionMap.clear();
  }
  public findById(id: string): Optional<Connection> {
    return new Optional(this._connectionMap.get(id));
  }
  public existsById(id: string): boolean {
    return this._connectionMap.has(id);
  }
  public getAll(): IterableIterator<Connection> {
    return this._connectionMap.values();
  }
  public countAll(): number {
    return this._connectionMap.size;
  }
}
