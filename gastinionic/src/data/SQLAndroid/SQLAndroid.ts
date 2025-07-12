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
    if (!SQLAndroid.db) {
      const sqlite = new SQLiteConnection(CapacitorSQLite);
      await CapacitorSQLite.addSQLiteSuffix({ dbNameList: ["GASTIN_DATABASE"] })

      await CapacitorSQLite.checkConnectionsConsistency({ dbNames: ["GASTIN_DATABASE"], openModes: ["no-encryption"] });
      await CapacitorSQLite.closeConnection({ database: "GASTIN_DATABASE" }).catch(() => { });
      const dbV1 = await sqlite.createConnection(
        "GASTIN_DATABASE",
        false,
        "no-encryption",
        3,
        false
      )

      await dbV1.open()

      for (const query of version_1) {
        await dbV1.execute(query)
      }

      await sqlite.closeConnection("GASTIN_DATABASE", false).catch(() => { });

      await CapacitorSQLite.closeConnection({ "database": "GASTIN_DATABASE" }).catch(() => { })

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
      const dbV3 = await sqlite.createConnection(
        "GASTIN_DATABASE",
        false,
        "no-encryption",
        3,
        false
      )
      await dbV3.open()
      SQLAndroid.db = dbV3
    }
    return SQLAndroid.db

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
      const id = resultLastId.values?.[0].lastId
      return id
    }

    if (query.toUpperCase().includes("SELECT")) {
      if (!result.values?.length) {
        return []
      }
      const mapValues = result.values
      return mapValues
    }

    if (query.toUpperCase().includes("UPDATE")) {
      const id = result.values?.[0].ID
      return id
    }
    return result;
  }

}
