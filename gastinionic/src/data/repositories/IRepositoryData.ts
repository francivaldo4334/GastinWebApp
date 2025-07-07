export interface IRepositoryData<M extends IDataModel> {
  list(): Promise<M[]>;
  get(id: number): Promise<M>;
  set(m: M): Promise<M>;
  edit(id: number, m: M): Promise<M>;
  delete(id: number): Promise<boolean>;
  paginate(page: number, perPage: number, filter?: Record<string, any>): Promise<{
    items: M[];
    count: number;
  }>;
}
