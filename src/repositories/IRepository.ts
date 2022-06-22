import { Optional } from '../util/Optional';

export interface IRepository<Entity> {
  save(entity: Entity): void;
  delete(entity: Entity): void;
  saveAll(entities: Entity[]): void;
  deleteAll(entities: Entity[]): void;
  findById(id: string): Optional<Entity>;
  findAllByIds(ids: string[]): Entity[];
  existsById(id: string): boolean;
  getAll(): IterableIterator<Entity>;
  countAll(): number;
  clear(): void;
}
