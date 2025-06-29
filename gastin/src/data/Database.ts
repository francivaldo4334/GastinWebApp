import { models } from "beast-orm"
import { CategoryModel } from "./dbmodels/CategoryModel"
import { RecordModel } from "./dbmodels/RecordModel"
import { ValidityModel } from "./dbmodels/ValidityModel"

export class Database {
  static instance: Database
  static getInstance() {
    if (!this.instance) {
      this.instance = new Database()
      models.register({
        databaseName: "gastindatabase",
        version: 1,
        type: "indexedDB",
        models: [CategoryModel, RecordModel, ValidityModel]
      })
    }
    return this.instance
  }
}
