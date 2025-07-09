import { Table } from "@/data/InterfaceDatabase";
import { ValidityModelToValidity, ValidityToValidityModel } from "./converters";
import { AndroidDatabase } from "..";
import { Validity } from "../models";

export class ValidityAndroidRepository implements Table {
  paginate(page: number, perPage: number, filters?: Record<string, any>): Promise<{ items: any[]; count: number; }> {
    throw new Error("Method not implemented.");
  }
  filter(object: Record<string, any>): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  async add(data: any): Promise<any> {
    const validity = ValidityModelToValidity(data)

    const result = await AndroidDatabase.db.run(
      `INSERT INTO TB_VALIDITY (IS_EVER_DAYS, START_DATE, END_DATE, IS_EVER_MONTH) values (?,?,?,?);`,
      [validity.IS_EVER_DAYS, validity.START_DATE, validity.END_DATE, validity.IS_EVER_MONTH]
    )

    const lastId = result.changes?.lastId ?? null
    if (!lastId)
      return

    const categoryCreated = await this.get(lastId)

    return ValidityToValidityModel(categoryCreated)
  }
  async get(id: any): Promise<any> {
    const queryResult = await AndroidDatabase.db.query(
      `SELECT * FROM TB_VALIDITY WHERE ID = ?;`,
      [id]
    )
    const queryResultFirst = queryResult.values?.[0]
    if (!queryResultFirst)
      return
    return ValidityToValidityModel(queryResultFirst)
  }
  async delete(id: any): Promise<void> {
    await AndroidDatabase.db.run(
      `DELETE FROM TB_VALIDITY WHERE ID = ?`,
      [id]
    )
  }
  async toArray(): Promise<any[]> {
    const queryResult = await AndroidDatabase.db.query(`SELECT * FROM TB_VALIDITY;`)
    const categories: Validity[] | undefined = queryResult.values
    if (!categories)
      return []
    return categories.map(ValidityToValidityModel)
  }
  async update(id: any, model: any): Promise<any> {

    const validity = ValidityModelToValidity(model)

    await AndroidDatabase.db.run(
      `UPDATE TB_VALIDITY SET IS_EVER_DAYS = ?, START_DATE = ?, END_DATE = ?, IS_EVER_MONTH = ? WHERE ID = ?;`,
      [validity.IS_EVER_DAYS, validity.START_DATE, validity.END_DATE, validity.IS_EVER_MONTH, id]
    )

    const resultUpdated = await this.get(id)

    return ValidityToValidityModel(resultUpdated)
  }

}
