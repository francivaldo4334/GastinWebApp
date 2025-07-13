import squel from "squel";
import { DatabaseSQLInterface } from "../DatabaseSQLInterface";
import { TB_CATEGORIA } from "../tables/TB_CATEGORIA";
import { RepositoryInterface } from "./RepositoryInterface";

export class TB_CATEGORIA_Repository implements RepositoryInterface<TB_CATEGORIA> {
  db: DatabaseSQLInterface
  tableName = "TB_CATEGORIA"
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
  selectPaginated(perPage: number, page: number): Promise<TB_CATEGORIA[]> {
    const offset = (page - 1) * perPage
    const queryString = squel.select()
      .from(this.tableName)
      .limit(perPage)
      .offset(offset)
      .toString()
    return this.db.query(queryString)
  }
  async insert(data: TB_CATEGORIA): Promise<TB_CATEGORIA | undefined> {
    const datenow = new Date().getTime()
    const queryString = squel.insert()
      .into(this.tableName)
      .set("TOTAL", data.TOTAL)
      .set("COLOR", data.COLOR)
      .set("NAME", data.NAME)
      .set("DESCRIPTION", data.DESCRIPTION)
      .set("CREATE_AT", datenow)
      .toString()
    const pk = await this.db.query(queryString)
    if (pk) {
      const result = await this.getById(pk)
      return result
    }
    return
  }

  async getById(ID: number): Promise<TB_CATEGORIA | undefined> {

    console.log("#6", ID)
    const queryString = squel.select().from(this.tableName).where("ID = ?", ID).toString()

    console.log("#7", queryString)
    const results: TB_CATEGORIA[] = await this.db.query(queryString)

    console.log("#8", results)
    return results?.[0]
  }
  selectAll(): Promise<TB_CATEGORIA[]> {
    const queryString = squel.select().from(this.tableName).toString()
    return this.db.query(queryString)
  }
  async deleteById(ID: number): Promise<boolean> {
    const queryString = squel.delete().from(this.tableName).where("ID = ?", ID).toString()
    const result = await this.db.query(queryString)
    return Boolean(result)
  }
  async updateItem(ID: number, data: TB_CATEGORIA): Promise<TB_CATEGORIA | undefined> {
    const queryString = squel
      .update()
      .table(this.tableName)
      .set("TOTAL", data.TOTAL)
      .set("COLOR", data.COLOR)
      .set("NAME", data.NAME)
      .set("DESCRIPTION", data.DESCRIPTION)
      .where("ID = ?", ID)
      .toString()
    const pk: number | undefined = await this.db.query(queryString)

    if (pk) {
      const result = this.getById(pk)
      return result
    }
    return
  }
}
