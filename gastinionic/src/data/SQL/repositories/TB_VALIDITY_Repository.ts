import squel from "squel";
import { DatabaseSQLInterface } from "../DatabaseSQLInterface";
import { TB_VALIDITY } from "../tables/TB_VALIDITY";
import { RepositoryInterface } from "./RepositoryInterface";

export class TB_VALIDITY_Repository implements RepositoryInterface<TB_VALIDITY> {

  db: DatabaseSQLInterface
  tableName = "TB_VALIDITY"
  constructor(db: DatabaseSQLInterface) {
    this.db = db
  }

  async count(): Promise<number> {
    const queryString = squel.select()
      .field("COUNT(*)", "TOTAL")
      .from(this.tableName).where("1").toString()
    const result: any[] = await this.db.query(queryString)
    if (!result.length)
      return 0

    return result[0].TOTAL
  }
  selectPaginated(perPage: number, page: number): Promise<TB_VALIDITY[]> {
    const offset = (page - 1) * perPage
    const queryString = squel.select()
      .from(this.tableName)
      .limit(perPage)
      .offset(offset)
      .toString()
    return this.db.query(queryString)
  }
  async insert(data: TB_VALIDITY): Promise<TB_VALIDITY | undefined> {
    const queryString = squel.insert()
      .into(this.tableName)
      .set("START_DATE", data.START_DATE)
      .set("END_DATE", data.END_DATE)
      .set("IS_EVER_MONTH", data.IS_EVER_MONTH)
      .set("IS_EVER_DAYS", data.IS_EVER_DAYS)
      .toString()
    const pk = await this.db.query(queryString)
    if (pk) {
      const result = await this.getById(pk)
      return result
    }
    return
  }

  async getById(ID: number): Promise<TB_VALIDITY | undefined> {
    const queryString = squel.select().from(this.tableName).where("ID = ?", ID).toString()
    const results: TB_VALIDITY[] = await this.db.query(queryString)
    return results?.[0]
  }
  selectAll(): Promise<TB_VALIDITY[]> {
    const queryString = squel.select().from(this.tableName).toString()
    return this.db.query(queryString)
  }
  async deleteById(ID: number): Promise<boolean> {
    const queryString = squel.delete().from(this.tableName).where("ID = ?", ID).toString()
    const result = await this.db.query(queryString)
    return Boolean(result)
  }
  async updateItem(ID: number, data: TB_VALIDITY): Promise<TB_VALIDITY | undefined> {
    const queryString = squel
      .update()
      .table(this.tableName)
      .set("START_DATE", data.START_DATE)
      .set("END_DATE", data.END_DATE)
      .set("IS_EVER_MONTH", data.IS_EVER_MONTH)
      .set("IS_EVER_DAYS", data.IS_EVER_DAYS)
      .where("ID = ?", ID)
      .toString()
    const pk: number | undefined = await this.db.query(queryString)

    if (pk) {
      const result = await this.getById(pk)
      return result
    }
    return
  }
}
