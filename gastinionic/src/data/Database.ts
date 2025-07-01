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
      records: "++id,title,description,value,categoryId,validityId",
      validities: "++id,isEveryDays,initValidity,endValidity",
    })
  }

  static instance: Database

  static async init() {
    this.instance = new Database()
  }
}
