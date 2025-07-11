import { DatabaseSQLInterface } from "@/data/SQL/DatabaseSQLInterface";
import initSqlJs, { Database, SqlJsStatic } from "sql.js"

export class SQLWeb implements DatabaseSQLInterface {
  SQL?: SqlJsStatic
  db?: Database
  constructor() {
    this.init()

  }
  async init() {
    this.SQL = await initSqlJs()
    this.db = new this.SQL.Database()
  }
  async query(query: string): Promise<any> {
    if (!this.db) {
      throw new Error("db nao inicializado")
    }
    const result = this.db.exec(query)
    return result
  }

}
