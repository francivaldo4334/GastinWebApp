import { DatabaseSQLInterface } from "@/data/SQL/DatabaseSQLInterface";
import initSqlJs, { Database, SqlJsStatic } from "sql.js";
import version_1 from "../SQL/migrations/version_1";
import version_2 from "../SQL/migrations/version_2";
import version_3 from "../SQL/migrations/version_3";
import squel from "squel";

const MIGRATIONS = [version_1, version_2, version_3];

export class SQLWeb implements DatabaseSQLInterface {
  private static db?: Database;
  private static ready: Promise<Database>;

  constructor() {
    this.init();
  }

  private static async initDb(): Promise<Database> {
    const SQL: SqlJsStatic = await initSqlJs({
      locateFile: (file) => `/sql-wasm.wasm`,
    });
    const base64 = localStorage.getItem("sqlite.db");
    if (base64) {
      const binary = new Uint8Array(
        atob(base64).split("").map((c) => c.charCodeAt(0))
      );
      this.db = new SQL.Database(binary);
    }
    else {
      this.db = new SQL.Database();
    }

    // Cria tabela de controle de versão, se necessário
    this.db.run(`
    CREATE TABLE IF NOT EXISTS __migrations (
      version INTEGER NOT NULL
    );
  `);

    // Verifica versão atual
    const res = this.db.exec(`SELECT MAX(version) as version FROM __migrations;`);
    const currentVersion = res[0]?.values[0][0] as number | null ?? -1;

    // Aplica migrações pendentes
    for (let i = currentVersion + 1; i < MIGRATIONS.length; i++) {
      const queries = MIGRATIONS[i];
      for (const query of queries) {
        this.db.run(query);
      }
      this.db.run(`INSERT INTO __migrations (version) VALUES (${i});`);
    }
    return this.db;
  }

  static getDb(): Promise<Database> {
    if (!this.ready) {
      this.ready = this.initDb();
    }
    return this.ready;
  }

  async init() {
    await SQLWeb.getDb(); // garante inicialização
  }

  saveData(db: Database) {
    const binary = db.export(); // Uint8Array
    const base64 = btoa(String.fromCharCode(...binary));
    localStorage.setItem("sqlite.db", base64);
  }

  async query(query: string): Promise<any> {
    const db = await SQLWeb.getDb();
    const result = db.exec(query);

    if (query.toUpperCase().includes("DELETE")) {
      this.saveData(db)
      return result
    }
    if (query.toUpperCase().includes("INSERT")) {
      const querylastId = squel
        .select()
        .field("last_insert_rowid()", "lastId")
        .toString();
      const resultLastId = db.exec(querylastId)
      this.saveData(db)
      return resultLastId?.[0].values?.[0]?.[0]
    }

    if (query.toUpperCase().includes("SELECT")) {
      if (!result.length) {
        return []
      }
      const { columns, values } = result[0]
      const mapValues = values.map(row =>
        Object.fromEntries(row.map((v: any, i: number) => [columns[i], v]))
      )
      return mapValues
    }
    return result;
  }
}
