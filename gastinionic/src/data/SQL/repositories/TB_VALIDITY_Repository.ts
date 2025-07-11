import squel from "squel";
import { DatabaseSQLInterface } from "../DatabaseSQLInterface";
import { TB_VALIDITY } from "../tables/TB_VALIDITY";
import { RepositoryInterface } from "./RepositoryInterface";

export class TB_CATEGORIA_Repository implements RepositoryInterface<TB_VALIDITY> {

  db: DatabaseSQLInterface
  tableName = "TB_VALIDITY"
  constructor(db: DatabaseSQLInterface) {
    this.db = db
  }
  insert(data: TB_VALIDITY): TB_VALIDITY | undefined {
    const queryString = squel.insert()
      .into(this.tableName)
      .set("START_DATE", data.START_DATE)
      .set("END_DATE", data.END_DATE)
      .set("IS_EVER_MONTH", data.IS_EVER_MONTH)
      .set("IS_EVER_DAYS", data.IS_EVER_DAYS)
      .toString()
    const pk = this.db.query(queryString)
    if (pk) {
      const result = this.getById(pk)
      return result
    }
    return
  }

  getById(ID: number): TB_VALIDITY | undefined {
    const queryString = squel.select().from(this.tableName).where("ID = ?", ID).toString()
    const results: TB_VALIDITY[] = this.db.query(queryString)
    return results?.[0]
  }
  selectAll(): TB_VALIDITY[] {
    const queryString = squel.select().from(this.tableName).toString()
    return this.db.query(queryString)
  }
  deleteById(ID: number): boolean {
    const queryString = squel.delete().from(this.tableName).where("ID = ?", ID).toString()
    const result = this.db.query(queryString)
    return Boolean(result)
  }
  updateItem(ID: number, data: TB_VALIDITY): TB_VALIDITY | undefined {
    const queryString = squel
      .update()
      .table(this.tableName)
      .set("START_DATE", data.START_DATE)
      .set("END_DATE", data.END_DATE)
      .set("IS_EVER_MONTH", data.IS_EVER_MONTH)
      .set("IS_EVER_DAYS", data.IS_EVER_DAYS)
      .where("ID = ?", ID)
      .toString()
    const pk: number | undefined = this.db.query(queryString)

    if (pk) {
      const result = this.getById(pk)
      return result
    }
    return
  }
}
