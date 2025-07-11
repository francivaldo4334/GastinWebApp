import { DatabaseSQLInterface } from "@/data/SQL/DatabaseSQLInterface";

export class SQLAndroid implements DatabaseSQLInterface {
  init(): void {
    throw new Error("Method not implemented.");
  }
  query(query: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

}
