import Dexie, { Table as DTable } from "dexie"
import { InterfaceDatabase, Table } from "./InterfaceDatabase";

class DeixieTable implements Table {
  table: DTable

  constructor(db: DeixieDatabase, tablename: string) {
    this.table = (db as any)[tablename]
  }
  async paginate(page: number, perPage: number): Promise<{
    items: any[]
    count: number
  }> {
    const items = await this.table.orderBy("id")
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

export class DeixieDatabase extends Dexie implements InterfaceDatabase {
  constructor() {
    super("gastindatabase")
    this.version(1).stores({
      categories: "++id,title,description,color",
      records: "++id,title,description,value,categoryId,validityId,createdAt,date",
      validities: "++id,isEveryDays,initValidity,endValidity",
    })
    this.on("ready", () => {
      this.categories = new DeixieTable(this, "categories");
      this.records = new DeixieTable(this, "records");
      this.validities = new DeixieTable(this, "validities");
    });
  }
  categories!: Table
  records!: Table
  validities!: Table
}
