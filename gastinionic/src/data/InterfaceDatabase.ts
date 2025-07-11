
export interface Table<T = any> {
  add(data: T): Promise<T>;
  get(id: T): Promise<T>;
  delete(id: T): Promise<void>;
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
