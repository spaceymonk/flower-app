import { Optional } from '../types/Optional';

export interface IRepository<Entity> {
  save(entity: Entity): void;
  delete(entity: Entity): void;
  saveAll(entities: Entity[]): void;
  deleteAll(entities: Entity[]): void;
  findById(id: string): Optional<Entity>;
  existsById(id: string): boolean;
  getAll(): Entity[];
}
