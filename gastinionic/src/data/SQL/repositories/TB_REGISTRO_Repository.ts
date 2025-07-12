import squel from "squel";
import { DatabaseSQLInterface } from "../DatabaseSQLInterface";
import { TB_REGISTRO } from "../tables/TB_REGISTRO";
import { RepositoryInterface } from "./RepositoryInterface";
import { TB_VALIDITY } from "../tables/TB_VALIDITY";
export class TB_REGISTRO_Repository implements RepositoryInterface<TB_REGISTRO> {

  db: DatabaseSQLInterface
  tableName = "TB_REGISTRO"
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

  async selectPaginated(perPage: number, page: number, filter?: "value_lt" | "value_gt"): Promise<TB_REGISTRO[]> {
    const offset = (page - 1) * perPage
    const applyQuery = (q: squel.Select): squel.Select => {
      if (!filter)
        return q
      if (filter === "value_gt")
        return q.where("VALUE > 0")
      return q.where("VALUE < 0")
    }
    const queryString = applyQuery(
      squel.select()
        .from(this.tableName)
    )
      .limit(perPage)
      .offset(offset)
      .toString()
    return await this.db.query(queryString)
  }
  async insert(data: TB_REGISTRO): Promise<TB_REGISTRO | undefined> {
    const datenow = new Date().getTime()
    const insert = squel.insert().into(this.tableName)
    insert.set("CREATE_AT", datenow)
    insert.set("VALUE", data.VALUE)
    insert.set("DESCRIPTION", data.DESCRIPTION)
    insert.set("IS_DEPESA", data.IS_DEPESA)
    insert.set("IS_RECURRENT", data.IS_RECURRENT)
    insert.set("IS_EVER_DAYS", data.IS_EVER_DAYS)
    insert.set("SALE_DATE", data.SALE_DATE)
    insert.set("CATEGORIA_FK", data.CATEGORIA_FK)
    insert.set("UNIQUE_ID", data.UNIQUE_ID)
    insert.set("START_DATE", data.START_DATE)
    insert.set("END_DATE", data.END_DATE)
    insert.set("UPDATE_AT", datenow)
    if (data.VALIDITY_ID)
      insert.set("VALIDITY_ID", data.VALIDITY_ID)

    const queryString = insert.toString()
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
  async selectAll(): Promise<TB_REGISTRO[]> {
    const queryString = squel.select().from(this.tableName).toString()
    return await this.db.query(queryString)
  }
  async deleteById(ID: number): Promise<boolean> {
    const queryString = squel.delete().from(this.tableName).where("ID = ?", ID).toString()
    const result = await this.db.query(queryString)
    return Boolean(result)
  }
  async updateItem(ID: number, data: TB_REGISTRO): Promise<TB_REGISTRO | undefined> {
    const datenow = new Date().getTime()
    const insert = squel.update().table(this.tableName)
    insert.set("VALUE", data.VALUE)
    insert.set("DESCRIPTION", data.DESCRIPTION)
    insert.set("IS_DEPESA", data.IS_DEPESA)
    insert.set("IS_RECURRENT", data.IS_RECURRENT)
    insert.set("IS_EVER_DAYS", data.IS_EVER_DAYS)
    insert.set("SALE_DATE", data.SALE_DATE)
    insert.set("CATEGORIA_FK", data.CATEGORIA_FK)
    insert.set("UNIQUE_ID", data.UNIQUE_ID)
    insert.set("START_DATE", data.START_DATE)
    insert.set("END_DATE", data.END_DATE)
    insert.set("UPDATE_AT", datenow)

    if (data.VALIDITY_ID)
      insert.set("VALIDITY_ID", data.VALIDITY_ID)

    insert.where("ID = ?", ID)

    const queryString = insert.toString()
    const pk: number | undefined = await this.db.query(queryString)

    if (pk) {
      const result = await this.getById(pk)
      return result
    }
    return
  }
  async selectRange(init: number, end: number): Promise<TB_REGISTRO[]> {
    const recordsWithoutRecurrent: TB_REGISTRO[] = await this.db.query(
      squel.select()
        .from(this.tableName)
        .where(squel.expr().and("VALIDITY_ID IS NULL").and(`SALE_DATE BETWEEN ${init} AND ${end}`))
        .toString()
    )

    const recordsWithRecurrent: TB_REGISTRO[] = await this.db.query(
      squel.select()
        .from(this.tableName)
        .where(squel.expr().and("VALIDITY_ID IS NOT NULL"))
        .toString()
    )

    const validityPks = recordsWithRecurrent.map(it => it.VALIDITY_ID!)

    const validities: TB_VALIDITY[] = validityPks.length ? await this.db.query(
      squel.select()
        .from("TB_VALIDITY")
        .where("ID IN ?", validityPks)
        .toString()
    ) : []

    const recordsWithRecurrentFiltered = recordsWithRecurrent.filter(r => {
      const v = validities.find(v => v.ID === r.VALIDITY_ID!)!
      return v.END_DATE >= init && v.START_DATE <= end
    })

    return recordsWithoutRecurrent.concat(recordsWithRecurrentFiltered)
  }
}
