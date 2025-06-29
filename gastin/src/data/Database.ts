import { models } from "beast-orm"
import { CategoryModel } from "./dbmodels/CategoryModel"
import { RecordModel } from "./dbmodels/RecordModel"
import { ValidityModel } from "./dbmodels/ValidityModel"

export class Database {
  static instance: Database
  static async init() {
    return await models.register({
      databaseName: "gastindatabase",
      version: 1,
      type: "indexedDB",
      models: [CategoryModel, RecordModel, ValidityModel]
    }).then(it => {
      this.instance = new Database()
    })
  }
}
