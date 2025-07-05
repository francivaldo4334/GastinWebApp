import { Capacitor } from "@capacitor/core";
import { DeixieDatabase } from "./DeixieDatabase"
import { InterfaceDatabase, Table } from "./InterfaceDatabase";
import { AndroidDatabase } from "./AndroidDatabase";
export class Database implements InterfaceDatabase {
  private static _instance: Database

  categories!: Table;
  records!: Table;
  validities!: Table;

  static get instance(): Database {
    if (!this._instance) {
      const platform = Capacitor.getPlatform()
      if (platform == "android") {
        this._instance = new AndroidDatabase()
      }
      else {
        this._instance = new DeixieDatabase()
      }

    }
    return this._instance
  }

  static async init() {
    return this.instance
  }
}
