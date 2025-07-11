export interface RepositoryInterface<T> {
  getById(ID: number):T | undefined;
  selectAll(): T[];
  deleteById(ID: number): boolean;
  updateItem(ID: number, data: T): T | undefined
}
