import Dexie from "dexie"
import { InterfaceDatabase, Table } from "./InterfaceDatabase";

export class DeixieDatabase extends Dexie implements InterfaceDatabase {
  constructor() {
    super("gastindatabase")
    this.version(1).stores({
      categories: "++id,title,description,color",
      records: "++id,title,description,value,categoryId,validityId,createdAt,date",
      validities: "++id,isEveryDays,initValidity,endValidity",
    })
  }
  categories!: Table;
  records!: Table;
  validities!: Table;
}
