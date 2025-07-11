import { Capacitor } from "@capacitor/core";
import { InterfaceDatabase, Table } from "./InterfaceDatabase";
import { SQLDatabase } from "./SQLDatabase";
import { DatabaseSQLInterface } from "./SQL/DatabaseSQLInterface";
import { SQLAndroid } from "./SQLAndroid/SQLAndroid";
import { SQLWeb } from "./SQLWeb/SQLWeb";
export class Database implements InterfaceDatabase {
  private static _instance: Database

  categories!: Table;
  records!: Table;
  validities!: Table;

  static get instance(): Database {
    if (!this._instance) {
      const platform = Capacitor.getPlatform()
      let db: DatabaseSQLInterface
      if (platform === "android") {
        db = new SQLAndroid()
      }
      else if (platform === "web") {
        db = new SQLWeb()
      }
      else {
        throw new Error("plataforma nao implementada")
      }

      this._instance = new SQLDatabase(db)

    }
    return this._instance
  }

  static async init() {
    return this.instance
  }
}
