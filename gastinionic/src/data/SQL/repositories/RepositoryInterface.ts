export interface RepositoryInterface<T> {
  insert(data: T): Promise<T | undefined>;
  getById(ID: number): Promise<T | undefined>;
  selectAll(): Promise<T[]>;
  selectPaginated(perPage: number, page: number, filter?: "value_lt" | "value_gt"): Promise<T[]>;
  deleteById(ID: number): Promise<boolean>;
  updateItem(ID: number, data: T): Promise<T | undefined>;
  count(): Promise<number>;
}
