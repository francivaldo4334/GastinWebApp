import { RepositoryInterface } from "./SQL/repositories/RepositoryInterface";

export interface Table<T = any, R = any> {
  sqlRepo?: RepositoryInterface<R>
  toModel?: (data: R) => T;
  toData?: (model: T) => R;
  add(data: T): Promise<T>;
  get(id: number): Promise<T>;
  delete(id: number): Promise<void>;
  toArray(): Promise<T[]>;
  update(id: number, model: T): Promise<T>;
  filter(object: Record<string, any>): Promise<T[]>;
  paginate(page: number, perPage: number, filters?: Record<string, any>): Promise<{
    items: any[]
    count: number
  }>;
  range?: (init: string, end:string) => Promise<any>;
}

export interface InterfaceDatabase {
  categories: Table;
  records: Table;
  validities: Table;
}
