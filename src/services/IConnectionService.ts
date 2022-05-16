import { CreateConnectionDto } from '../dto/CreateConnectionDto';
import { UpdateConnectionDto } from '../dto/UpdateConnectionDto';
import Connection from '../model/Connection';

export interface IConnectionService {
  isValidConnection(c: Connection): boolean;
  isValidOnConnect(c: Connection): boolean;
  isValidOnUpdate(oldConnection: Connection, newConnection: Connection): boolean;
  create(createConnectionDto: CreateConnectionDto): Connection | null;
  update(id: string, updateConnectionDto: UpdateConnectionDto): Connection | null;
}
