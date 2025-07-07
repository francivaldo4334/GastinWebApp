import { Table } from "@/data/InterfaceDatabase";
import { AndroidDatabase } from "..";
import { isoStringToNumber, RecordModelToRegistro, RegistroToRecordModel } from "./converters";
import { Registro } from "../models";
import squel, { Select } from "squel"
const handleFilters = (qb: squel.Select, filters?: Record<string, any>): squel.Select => {
  let query: Select = qb
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      const [_field, lookup] = key.split("__")
      const field = _field.toUpperCase()
      switch (lookup) {
        case "gt":
          query = qb.where(`${field} > ${value}`)
          break;
        case "lt":
          query = qb.where(`${field} < ${value}`)
          break;
        default:
          query = qb.where(`${field} = ${value}`)
          break;
      }
    })
  }
  return query
}


export class RecordAndroidRepository implements Table {
  async paginate(page: number, perPage: number, filters?: Record<string, any>): Promise<{ items: any[]; count: number; }> {

    const offset = page * perPage

    const mainQuery = handleFilters(
      squel.select().from("TB_REGISTRO").where("1"),
      filters
    ) .order("ID")
      .limit(perPage)
      .offset(offset)
      .toString()
      
    const countQuery = handleFilters(
      squel.select()
        .field("COUNT(*)", "TOTAL")
        .from("TB_REGISTRO").where("1"),
      filters
    ).toString()
    //
    const queryResult = await AndroidDatabase.db.query(mainQuery)
    const queryTotalResult = await AndroidDatabase.db.query(countQuery)

    const categories: Registro[] | undefined = queryResult.values
    const count = queryTotalResult.values?.[0].TOTAL ?? 0

    return {
      items: categories?.map(RegistroToRecordModel) ?? [],
      count,
    }

    // const queryResult = await AndroidDatabase.db.query(
    //   `SELECT * FROM TB_REGISTRO ORDER BY ID LIMIT ? OFFSET ?;`,
    //   [perPage, page * perPage]
    // )
    // const queryTotalResult = await AndroidDatabase.db.query(
    //   `SELECT COUNT(*) as TOTAL FROM TB_REGISTRO`
    // )
    // const categories: Registro[] | undefined = queryResult.values
    // const count = queryTotalResult.values?.[0].TOTAL
    // if (!categories)
    //   return {
    //     items: [],
    //     count: 0,
    //   }
    // return {
    //   items: categories.map(RegistroToRecordModel),
    //   count
    // }
  }
  filter(object: Record<string, any>): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  async add(data: any): Promise<any> {
    const registro = RecordModelToRegistro(data)

    const datenow = new Date()
    const datestring = datenow.toISOString()

    const result = await AndroidDatabase.db.run(
      `INSERT INTO TB_REGISTRO (VALUE, DESCRIPTION, CATEGORIA_FK, SALE_DATE, VALIDITY_ID, UNIQUE_ID, CREATE_AT, UPDATE_AT, IS_DEPESA, IS_RECURRENT, IS_EVER_DAYS) values (?,?,?,?,?,?,?,?,?,?,?);`,
      [
        registro.VALUE,
        registro.DESCRIPTION,
        registro.CATEGORIA_FK,
        registro.SALE_DATE,
        registro.VALIDITY_ID,
        registro.UNIQUE_ID,
        isoStringToNumber(datestring),
        isoStringToNumber(datestring),
        0, 0, 0
      ]
    )

    const lastId = result.changes?.lastId ?? null
    if (!lastId)
      return

    const recordCreated = await this.get(lastId)

    return RegistroToRecordModel(recordCreated)
  }
  async get(id: any): Promise<any> {
    const queryResult = await AndroidDatabase.db.query(
      `SELECT * FROM TB_REGISTRO WHERE ID = ?;`,
      [id]
    )
    const queryResultFirst = queryResult.values?.[0]
    if (!queryResultFirst)
      return
    return RegistroToRecordModel(queryResultFirst)
  }
  async delete(id: any): Promise<void> {
    await AndroidDatabase.db.run(
      `DELETE FROM TB_REGISTRO WHERE ID = ?`,
      [id]
    )
  }
  async toArray(): Promise<any[]> {
    const queryResult = await AndroidDatabase.db.query(`SELECT * FROM TB_REGISTRO;`)
    const categories: Registro[] | undefined = queryResult.values
    if (!categories)
      return []
    return categories.map(RegistroToRecordModel)
  }
  async update(id: any, model: any): Promise<any> {

    const registro = RecordModelToRegistro(model)

    const datenow = new Date()
    const datestring = datenow.toISOString()
    await AndroidDatabase.db.run(
      ` UPDATE TB_REGISTRO SET VALUE = ?, DESCRIPTION = ?, CATEGORIA_FK = ?, SALE_DATE = ?, VALIDITY_ID = ?, UNIQUE_ID = ?, UPDATE_AT = ?, IS_DEPESA = ?, IS_RECURRENT = ?, IS_EVER_DAYS = ? WHERE ID = ?; `,
      [
        registro.VALUE,
        registro.DESCRIPTION,
        registro.CATEGORIA_FK,
        registro.SALE_DATE,
        registro.VALIDITY_ID,
        registro.UNIQUE_ID,
        isoStringToNumber(datestring),
        0, 0, 0,
        id,
      ]
    )

    const resultUpdated = await this.get(id)

    return RegistroToRecordModel(resultUpdated)
  }
}
