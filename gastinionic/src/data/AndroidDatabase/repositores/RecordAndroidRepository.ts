import { Table } from "@/data/InterfaceDatabase";
import { AndroidDatabase } from "..";
import { isoStringToNumber, RecordModelToRegistro, RegistroToRecordModel } from "./converters";
import { Registro } from "../models";

export class RecordAndroidRepository implements Table {
  async add(data: any): Promise<any> {
    const registro = RecordModelToRegistro(data)

    const datenow = new Date()
    const datestring = datenow.toISOString()

    const result = await AndroidDatabase.db.run(
      `INSERT INTO TB_REGISTRO (VALUE, DESCRIPTION, CATEGORIA_FK, SALE_DATE, VALIDITY_ID, UNIQUE_ID, CREATE_AT, UPDATE_AT) values (?,?,?,?,?,?,?,?);`,
      [
        registro.VALUE,
        registro.DESCRIPTION,
        registro.CATEGORIA_FK,
        registro.SALE_DATE,
        registro.VALIDITY_ID,
        registro.UNIQUE_ID,
        isoStringToNumber(datestring),
        isoStringToNumber(datestring),
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
      `UPDATE TB_REGISTRO SET VALUE = ?, DESCRIPTION = ?, CATEGORIA_FK = ?, SALE_DATE = ?, VALIDITY_ID = ?, UNIQUE_ID = ?, UPDATE_AT = ? WHERE ID = ?;`,
      [
        registro.VALUE,
        registro.DESCRIPTION,
        registro.CATEGORIA_FK,
        registro.SALE_DATE,
        registro.VALIDITY_ID,
        registro.UNIQUE_ID,
        isoStringToNumber(datestring),
        id,
      ]
    )

    const resultUpdated = await this.get(id)

    return RegistroToRecordModel(resultUpdated)
  }
}
