import Dexie, { Table as DTable } from "dexie"
import { InterfaceDatabase, Table } from "./InterfaceDatabase";

const applyFilter = (filter?: Record<string, any>, item?: any): boolean => {
  if (!filter)
    return true
  if (!item)
    return true

  return Object.entries(filter).every(([key, value]) => {
    if (key.endsWith("__gt")) {
      const [v,] = key.split("__")
      return filter[v] > value
    }
    if (key.endsWith("__lt")) {
      const [v,] = key.split("__")
      return filter[v] < value
    }
    return value == null ? true : filter[key] === value
  })
}

class DeixieTable implements Table {
  tablename: keyof DeixieDatabase
  get table(): DTable {
    return DeixieDatabase.getInstance()[this.tablename]
  }
  constructor(tablename: keyof DeixieDatabase) {
    this.tablename = tablename
  }
  async paginate(page: number, perPage: number, filters?: Record<string, any>): Promise<{
    items: any[]
    count: number
  }> {
    const items = await this.table.orderBy("id")
      .filter(applyFilter.bind(filters))
      .offset((page - 1) * perPage)
      .limit(perPage)
      .toArray()
    const count = await this.table.count()
    return { items, count }
  }

  add(data: any): Promise<any> {
    return this.table.add(data)
  }
  get(id: any): Promise<any> {
    return this.table.get(id)
  }
  delete(id: any): Promise<void> {
    return this.table.delete(id)
  }
  toArray(): Promise<any[]> {
    return this.table.toArray()
  }
  update(id: any, model: any): Promise<any> {
    return this.table.update(id, model)
  }
  filter(object: Record<string, any>): Promise<any[]> {
    return this.table
      .filter((it: any) =>
        Object.entries(object).every(([key, value]) =>
          value == null ? true : it[key] === value
        )
      )
      .toArray();
  }

}

export class _DeixieDatabase extends Dexie {
  categories!: DTable
  records!: DTable
  validities!: DTable
  constructor() {
    super("gastindatabase")
    this.version(1).stores({
      categories: "++id,title,description,color",
      records: "++id,title,description,value,categoryId,validityId,createdAt,date",
      validities: "++id,isEveryDays,initValidity,endValidity",
    })
  }
}

export class DeixieDatabase implements InterfaceDatabase {
  static deixei: _DeixieDatabase
  static getInstance() {
    if (!this.deixei) {
      this.deixei = new _DeixieDatabase()
    }
    return this.deixei
  }
  constructor() {
    this.categories = new DeixieTable("categories");
    this.records = new DeixieTable("records");
    this.validities = new DeixieTable("validities");
  }
  categories!: Table
  records!: Table
  validities!: Table
}
