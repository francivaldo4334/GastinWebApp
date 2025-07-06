export interface IRepositoryDomain<M extends IDomainModel> {
  list(params?: {
    page: number;
    perPage: number;
  }): Promise<M[]>;
  get(id: number): Promise<M>;
  set(m: M): Promise<M>;
  edit(id: number, m: M): Promise<M>;
  delete(id: number): Promise<boolean>;
}
