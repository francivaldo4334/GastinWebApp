import { DatabaseSQLInterface } from "@/data/SQL/DatabaseSQLInterface";
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";
import version_1 from "../SQL/migrations/version_1";
import version_2 from "../SQL/migrations/version_2";
import version_3 from "../SQL/migrations/version_3";
import squel from "squel";

export class SQLAndroid implements DatabaseSQLInterface {
  static db: SQLiteDBConnection;
  constructor() {
    this.init()
  }
  static async initDb() {
    const sqlite = new SQLiteConnection(CapacitorSQLite);
    await CapacitorSQLite.addSQLiteSuffix({ dbNameList: ["GASTIN_DATABASE"] })
    await CapacitorSQLite.checkConnectionsConsistency({ dbNames: ["GASTIN_DATABASE"], openModes: ["no-encryption"] });
    await CapacitorSQLite.closeConnection({ database: "GASTIN_DATABASE" }).catch(() => { });

    const database = await sqlite.createConnection(
      "GASTIN_DATABASE",
      false,
      "no-encryption",
      3,
      false
    )

    await database.open()

    for (const query of version_1) {
      database.execute(query);
    }

    await CapacitorSQLite.addUpgradeStatement({
      database: "GASTIN_DATABASE",
      upgrade: [
        {
          toVersion: 2,
          statements: version_2
        },
        {
          toVersion: 3,
          statements: version_3
        }
      ]
    })
    return database

  }
  static async getDb() {
    if (!this.db) {
      this.db = await this.initDb()
    }
    return this.db
  }
  init(): void {
    SQLAndroid.getDb()
  }
  async query(query: string): Promise<any> {
    const db = await SQLAndroid.getDb()
    const result = await db.query(query);
    if (query.toUpperCase().includes("INSERT")) {
      const querylastId = squel
        .select()
        .field("last_insert_rowid()", "lastId")
        .toString();
      const resultLastId = await db.query(querylastId)
      return resultLastId.values?.[0].values?.[0]?.[0]
    }

    if (query.toUpperCase().includes("SELECT")) {
      if (!result.values?.length) {
        return []
      }
      const mapValues = result.values
      return mapValues
    }
    return result;
  }

}
