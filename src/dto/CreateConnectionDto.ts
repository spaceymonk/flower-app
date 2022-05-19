export interface CreateConnectionDto {
  sourceId: string;
  targetId: string;
  sourceHandle: string | null;
  targetHandle: string | null;
}
