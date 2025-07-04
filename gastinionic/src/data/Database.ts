import { CategoryModel } from "./dbmodels/CategoryModel"
import { RecordModel } from "./dbmodels/RecordModel"
import { ValidityModel } from "./dbmodels/ValidityModel"

import Dexie, { Table } from "dexie"

export class Database extends Dexie {

  categories!: Table<CategoryModel, number>;
  records!: Table<RecordModel, number>;
  validities!: Table<ValidityModel, number>;


  constructor() {
    super("gastindatabase")
    this.version(1).stores({
      categories: "++id,title,description,color",
      records: "++id,title,description,value,categoryId,validityId,createdAt,date",
      validities: "++id,isEveryDays,initValidity,endValidity",
    })
  }

  private static _instance: Database
  static get instance(): Database {
    if (!this._instance) {
      this._instance = new Database()
    }
    return this._instance
  }

  static async init() {
    this._instance = new Database()
  }
}
