import Dexie, { Collection, Table as DTable } from "dexie"
import { InterfaceDatabase, Table } from "./InterfaceDatabase";

const applyFilter = (table: DTable, filters?: Record<string, any>): Collection<any, any, any> => {
  if (!filters || Object.keys(filters).length === 0) {
    return table.toCollection()
  }

  let query: Collection<any, any, any> | undefined

  for (const [key, value] of Object.entries(filters)) {
    if (key.endsWith("__gt")) {
      const field = key.replace("__gt", "")
      query = table.where(field).above(value)
      break;
    }
    if (key.endsWith("__lt")) {
      const field = key.replace("__lt", "")
      query = table.where(field).below(value)
    }
  }
  if (!query) {
    query = table.toCollection()
  }
  return query
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
    const collection = applyFilter(this.table, filters)
    const items = await collection
      .offset((page - 1) * perPage)
      .limit(perPage)
      .toArray()
    const count = await this.table.count()
    return { items, count }
  }

  async add(data: any): Promise<any> {
    const id = await this.table.add(data)
    const it = await this.get(id)
    return it
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
  filter(filters: Record<string, any>): Promise<any[]> {
    const collection = this.table.toArray()
    if (!filters)
      return collection;
    function conditionallookup(it: any, lookup: string | undefined, field: string, value: any): boolean {
      switch (lookup) {
        case "gt":
          return it[field] > value
        case "lt":
          return it[field] < value
        case "gte":
          return it[field] >= value
        case "lte":
          return it[field] <= value
        default:
          return it[field] === value
      }
    }

    function handlerfilter(list: any[], filter: any) {
      if (!Object.keys(filter).length)
        return list
      let filteredList = list
      for (const [key, value] of Object.entries(filter)) {
        if (key.startsWith("block_")) {
          const [, condition] = key.split("__")
          switch (condition) {
            case "or":
              const list_or = value as any[]
              for (const or_filter of list_or) {
                //...
              }
              filteredList = filteredList.filter(it => true)
              break;
            case "and":
              //
              break;
            case "not":
              //
              break;
          }
        }
        else {
          const [field, lookup] = key.split("__")
          if (!lookup) {
            filteredList = filteredList.filter(it => it[field] === value)
          }
          else {
            if (lookup.startsWith("query_")) {
              //...
            }
            else {
              filteredList = filteredList.filter(it => conditionallookup(it, lookup, field, value))
            }
          }
        }
      }
      return filteredList
    }


    return collection;
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
