import { Database } from "../Database";
import { CategoryDataModel, mapFromCategoryDataModel, mapToCategoryDataModel } from "../models/CategoryDataModel";
import { IRepositoryData } from "./IRepositoryData";

export class CategoryRepositoryData implements IRepositoryData<CategoryDataModel> {
  async list(): Promise<CategoryDataModel[]> {
    const list = await Database.instance.categories.toArray()
    return list.map(mapToCategoryDataModel)
  }
  async get(id: number): Promise<CategoryDataModel> {
    const it = await Database.instance.categories.get(id)
    return mapToCategoryDataModel(it)
  }
  async set(m: CategoryDataModel): Promise<CategoryDataModel> {
    const it = await Database.instance.categories.add(mapFromCategoryDataModel(m))
    return mapToCategoryDataModel(it)
  }
  async edit(id: number, m: CategoryDataModel): Promise<CategoryDataModel> {
    const model = mapFromCategoryDataModel(m)
    model.id = id
    await Database.instance.categories.update(id, model)
    const it = await Database.instance.categories.get(id)
    return mapToCategoryDataModel(it)
  }
  async delete(id: number): Promise<boolean> {
    Database.instance.categories.delete(id)
    return true;
  }
}
