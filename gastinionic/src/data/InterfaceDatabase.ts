
export interface Table {
  add(data: any): Promise<any>;
  get(id: any): Promise<any>;
  delete(id: any): Promise<void>;
  toArray(): Promise<any[]>;
  update(id: any, model: any): Promise<any>;
  filter(object: Record<string, any>): Promise<any[]>;
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
