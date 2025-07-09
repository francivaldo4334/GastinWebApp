import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { InterfaceDatabase, Table } from "../InterfaceDatabase";
import { CategoryAndroidRepository } from "./repositores/CategoryAndroidRepository";
import { RecordAndroidRepository } from "./repositores/RecordAndroidRepository";
import { ValidityAndroidRepository } from "./repositores/ValidityAndroidRepository";

export class AndroidDatabase implements InterfaceDatabase {
  categories: Table = new CategoryAndroidRepository();
  records: Table = new RecordAndroidRepository();
  validities: Table = new ValidityAndroidRepository();

  static db: SQLiteDBConnection;

  constructor() {
    AndroidDatabase.getDb()
  }

  static async getDb() {
    if (!AndroidDatabase.db) {
      const sqlite = new SQLiteConnection(CapacitorSQLite);
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

      await dbV1.execute(`
        CREATE TABLE IF NOT EXISTS TB_CATEGORIA (
          ID INTEGER PRIMARY KEY AUTOINCREMENT,
          NAME TEXT NOT NULL,
          DESCRIPTION TEXT NOT NULL,
          COLOR INTEGER NOT NULL,
          CREATE_AT INTEGER NOT NULL,
          TOTAL INTEGER NOT NULL
        );
      `);

      await dbV1.execute(`
        CREATE TABLE IF NOT EXISTS TB_REGISTRO (
          ID INTEGER PRIMARY KEY AUTOINCREMENT,
          VALUE INTEGER NOT NULL,
          DESCRIPTION TEXT NOT NULL,
          CATEGORIA_FK INTEGER NOT NULL,
          CREATE_AT INTEGER NOT NULL,
          UPDATE_AT INTEGER NOT NULL,
          IS_DEPESA INTEGER NOT NULL,
          FOREIGN KEY (CATEGORIA_FK) REFERENCES TB_CATEGORIA(ID) ON DELETE CASCADE
        );
      `);


      await sqlite.closeConnection("GASTIN_DATABASE", false).catch(() => { });

      await CapacitorSQLite.closeConnection({ "database": "GASTIN_DATABASE" }).catch(() => { })

      await CapacitorSQLite.addUpgradeStatement({
        database: "GASTIN_DATABASE",
        upgrade: [
          {
            toVersion: 2,
            statements: [
              `ALTER TABLE TB_REGISTRO ADD COLUMN START_DATE INTEGER DEFAULT NULL;`,
              `ALTER TABLE TB_REGISTRO ADD COLUMN END_DATE INTEGER DEFAULT NULL;`,
              `ALTER TABLE TB_REGISTRO ADD COLUMN IS_RECURRENT INTEGER NOT NULL DEFAULT 0;`,
              `ALTER TABLE TB_REGISTRO ADD COLUMN IS_EVER_DAYS INTEGER NOT NULL DEFAULT 0;`
            ]
          },
          {
            toVersion: 3,
            statements: [
              `
                CREATE TABLE IF NOT EXISTS TB_VALIDITY (
                  ID INTEGER PRIMARY KEY AUTOINCREMENT,
                  IS_EVER_DAYS INTEGER NOT NULL,
                  IS_EVER_MONTH INTEGER NOT NULL DEFAULT 0,
                  START_DATE INTEGER,
                  END_DATE INTEGER,
                  REGISTRO_ID INTEGER
                );
              `,
              "ALTER TABLE TB_REGISTRO ADD COLUMN SALE_DATE INTEGER DEFAULT NULL;",
              "ALTER TABLE TB_REGISTRO ADD COLUMN UNIQUE_ID INTEGER DEFAULT NULL;",
              "ALTER TABLE TB_REGISTRO ADD COLUMN VALIDITY_ID INTEGER DEFAULT NULL;",
              `
              INSERT INTO TB_VALIDITY (REGISTRO_ID, IS_EVER_DAYS, START_DATE, END_DATE)
              SELECT ID,IS_EVER_DAYS,START_DATE,END_DATE FROM TB_REGISTRO
              WHERE IS_RECURRENT = 1;
              `,
              `
              UPDATE TB_REGISTRO SET VALIDITY_ID = (
                SELECT v.ID FROM TB_VALIDITY v WHERE v.REGISTRO_ID = TB_REGISTRO.ID
              );
              `
            ]
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

      AndroidDatabase.db = dbV3
    }
    return AndroidDatabase.db
  }
}
