import squel from "squel";
import { DatabaseSQLInterface } from "../DatabaseSQLInterface";
import { TB_REGISTRO } from "../tables/TB_REGISTRO";
import { RepositoryInterface } from "./RepositoryInterface";
export class TB_CATEGORIA_Repository implements RepositoryInterface<TB_REGISTRO> {

  db: DatabaseSQLInterface
  tableName = "TB_REGISTRO"
  constructor(db: DatabaseSQLInterface) {
    this.db = db
  }
  selectPaginated(perPage: number, page: number): Promise<TB_REGISTRO[]> {
    const offset = (page - 1) * perPage
    const queryString = squel.select()
      .from(this.tableName)
      .limit(perPage)
      .offset(offset)
      .toString()
    return this.db.query(queryString)
  }
  async insert(data: TB_REGISTRO): Promise<TB_REGISTRO | undefined> {
    const datenow = new Date().getTime()
    const queryString = squel.insert()
      .into(this.tableName)
      .set("CREATE_AT", datenow)
      .set("VALUE", data.VALUE)
      .set("DESCRIPTION", data.DESCRIPTION)
      .set("IS_DEPESA", data.IS_DEPESA)
      .set("IS_RECURRENT", data.IS_RECURRENT)
      .set("IS_EVER_DAYS", data.IS_EVER_DAYS)
      .set("SALE_DATE", data.SALE_DATE)
      .set("CATEGORIA_FK", data.CATEGORIA_FK)
      .set("VALIDITY_ID", data.VALIDITY_ID)
      .set("UNIQUE_ID", data.UNIQUE_ID)
      .set("START_DATE", data.START_DATE)
      .set("END_DATE", data.END_DATE)
      .set("UPDATE_AT", datenow)
      .toString()
    const pk = await this.db.query(queryString)
    if (pk) {
      const result = await this.getById(pk)
      return result
    }
    return
  }

  async getById(ID: number): Promise<TB_REGISTRO | undefined> {
    const queryString = squel.select().from(this.tableName).where("ID = ?", ID).toString()
    const results: TB_REGISTRO[] = await this.db.query(queryString)
    return results?.[0]
  }
  selectAll(): Promise<TB_REGISTRO[]> {
    const queryString = squel.select().from(this.tableName).toString()
    return this.db.query(queryString)
  }
  async deleteById(ID: number): Promise<boolean> {
    const queryString = squel.delete().from(this.tableName).where("ID = ?", ID).toString()
    const result = await this.db.query(queryString)
    return Boolean(result)
  }
  async updateItem(ID: number, data: TB_REGISTRO): Promise<TB_REGISTRO | undefined> {
    const datenow = new Date().getTime()
    const queryString = squel
      .update()
      .table(this.tableName)
      .set("VALUE", data.VALUE)
      .set("DESCRIPTION", data.DESCRIPTION)
      .set("IS_DEPESA", data.IS_DEPESA)
      .set("IS_RECURRENT", data.IS_RECURRENT)
      .set("IS_EVER_DAYS", data.IS_EVER_DAYS)
      .set("SALE_DATE", data.SALE_DATE)
      .set("CATEGORIA_FK", data.CATEGORIA_FK)
      .set("VALIDITY_ID", data.VALIDITY_ID)
      .set("UNIQUE_ID", data.UNIQUE_ID)
      .set("START_DATE", data.START_DATE)
      .set("END_DATE", data.END_DATE)
      .set("UPDATE_AT", datenow)
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
