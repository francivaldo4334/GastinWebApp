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
      const CREATE_IF_NOT_EXISTS_TB_VALIDITY = `
        CREATE TABLE IF NOT EXISTS TB_VALIDITY (
          ID INTEGER PRIMARY KEY AUTOINCREMENT,
          IS_EVER_DAYS INTEGER NOT NULL,
          START_DATE INTEGER,
          END_DATE INTEGER,
          REGISTRO_ID INTEGER
        );
      `
      const sqlite = new SQLiteConnection(CapacitorSQLite);
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
              "ALTER TABLE TB_REGISTRO ADD COLUMN SALE_DATE INTEGER DEFAULT NULL;",
              "ALTER TABLE TB_REGISTRO ADD COLUMN UNIQUE_ID INTEGER DEFAULT NULL;",
              "ALTER TABLE TB_REGISTRO ADD COLUMN VALIDITY_ID INTEGER DEFAULT NULL;",
              CREATE_IF_NOT_EXISTS_TB_VALIDITY,
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
      const database = await sqlite.createConnection(
        "GASTIN_DATABASE",
        false,
        "no-encryption",
        3,
        false
      )

      await database.open()


      await database.execute(`
        CREATE TABLE IF NOT EXISTS TB_CATEGORIA (
          ID INTEGER PRIMARY KEY AUTOINCREMENT,
          NAME TEXT NOT NULL,
          DESCRIPTION TEXT NOT NULL,
          COLOR INTEGER NOT NULL,
          CREATE_AT INTEGER NOT NULL,
          TOTAL INTEGER NOT NULL
        );
      `);

      await database.execute(`
        CREATE TABLE IF NOT EXISTS TB_REGISTRO (
          ID INTEGER PRIMARY KEY AUTOINCREMENT,
          VALUE INTEGER NOT NULL,
          DESCRIPTION TEXT NOT NULL,
          CATEGORIA_FK INTEGER NOT NULL,
          CREATE_AT INTEGER NOT NULL,
          UPDATE_AT INTEGER NOT NULL,
          IS_DEPESA INTEGER NOT NULL,
          SALE_DATE INTEGER,

          IS_RECURRENT INTEGER,
          IS_EVER_DAYS INTEGER,
          START_DATE INTEGER,
          END_DATE INTEGER,

          VALIDITY_ID INTEGER,
          UNIQUE_ID INTEGER,

          FOREIGN KEY (CATEGORIA_FK) REFERENCES TB_CATEGORIA(ID) ON DELETE CASCADE,
          FOREIGN KEY (VALIDITY_ID) REFERENCES TB_VALIDITY(ID) ON DELETE CASCADE
        );
      `);
      await database.execute(CREATE_IF_NOT_EXISTS_TB_VALIDITY)

      AndroidDatabase.db = database
    }
    return AndroidDatabase.db
  }
}
