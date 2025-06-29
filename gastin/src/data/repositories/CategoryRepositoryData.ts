import { CategoryDataModel } from "../models/CategoryDataModel";
import { IRepositoryData } from "./IRepositoryData";

export class CategoryRepositoryData implements IRepositoryData<CategoryDataModel> {
  list(): Promise<CategoryDataModel[]> {
    throw new Error("Method not implemented.");
  }
  get(id: number): Promise<CategoryDataModel> {
    throw new Error("Method not implemented.");
  }
  set(m: CategoryDataModel): Promise<CategoryDataModel> {
    throw new Error("Method not implemented.");
  }
  edit(id: number, m: CategoryDataModel): Promise<CategoryDataModel> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
