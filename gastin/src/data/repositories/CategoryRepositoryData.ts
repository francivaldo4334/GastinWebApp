import { CategoryModel } from "../dbmodels/CategoryModel";
import { CategoryDataModel, mapFromCategoryDataModel, mapToCategoryDataModel } from "../models/CategoryDataModel";
import { IRepositoryData } from "./IRepositoryData";

export class CategoryRepositoryData implements IRepositoryData<CategoryDataModel> {
  async list(): Promise<CategoryDataModel[]> {
    const list = await CategoryModel.all()
    return list.map(mapToCategoryDataModel)
  }
  async get(id: number): Promise<CategoryDataModel> {
    const it = await CategoryModel.get({ id })
    return it
  }
  async set(m: CategoryDataModel): Promise<CategoryDataModel> {
    const it = await CategoryModel.create(mapFromCategoryDataModel(m))
    return mapToCategoryDataModel(it)
  }
  async edit(id: number, m: CategoryDataModel): Promise<CategoryDataModel> {
    const it = await CategoryModel.get({ id })
    it.title = m.title;
    it.description = m.description;
    it.color = m.color;
    it.save()
    return mapToCategoryDataModel(it)
  }
  async delete(id: number): Promise<boolean> {
    const it = await CategoryModel.get({ id })
    it.delete()
    return true;
  }
}
