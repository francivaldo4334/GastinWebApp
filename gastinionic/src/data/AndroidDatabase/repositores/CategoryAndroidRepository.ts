import { Table } from "@/data/InterfaceDatabase";
import { AndroidDatabase } from "..";
import { Categoria } from "../models";
import { CategoriaToCategoryModel, CategoryModelToCategoria, isoStringToNumber } from "./converters";

export class CategoryAndroidRepository implements Table {
  async add(data: any): Promise<any> {
    const category = CategoryModelToCategoria(data)
    const datenow = new Date()
    const datestring = datenow.toISOString()

    const result = await AndroidDatabase.db.run(
      `INSERT INTO TB_CATEGORIA (NAME, DESCRIPTION, COLOR, CREATE_AT, TOTAL) values (?,?,?,?,?);`,
      [
        category.NAME,
        category.DESCRIPTION,
        category.COLOR,
        isoStringToNumber(datestring),
        0,
      ]
    )

    const lastId = result.changes?.lastId ?? null
    if (!lastId)
      return

    const categoryCreated = await this.get(lastId)

    return categoryCreated
  }
  async get(id: any): Promise<any> {
    const queryResult = await AndroidDatabase.db.query(
      `SELECT * FROM TB_CATEGORIA WHERE ID = ?;`,
      [id]
    )
    const queryResultFirst = queryResult.values?.[0]
    if (!queryResultFirst)
      return
    return CategoriaToCategoryModel(queryResultFirst)
  }
  async delete(id: any): Promise<void> {
    await AndroidDatabase.db.run(
      `DELETE FROM TB_CATEGORIA WHERE ID = ?`,
      [id]
    )
  }
  async toArray(): Promise<any[]> {
    const queryResult = await AndroidDatabase.db.query(`SELECT * FROM TB_CATEGORIA;`)
    const categories: Categoria[] | undefined = queryResult.values
    if (!categories)
      return []
    return categories.map(CategoriaToCategoryModel)
  }
  async update(id: any, model: any): Promise<any> {

    const category = CategoryModelToCategoria(model)

    await AndroidDatabase.db.run(
      `UPDATE TB_CATEGORIA SET NAME = ?, DESCRIPTION = ?, COLOR = ? WHERE ID = ?;`,
      [
        category.NAME,
        category.DESCRIPTION,
        category.COLOR,
        id,
      ]
    )

    const resultUpdated = await this.get(id)

    return CategoriaToCategoryModel(resultUpdated)
  }

}
