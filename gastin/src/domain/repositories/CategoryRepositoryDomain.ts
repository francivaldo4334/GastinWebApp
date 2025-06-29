import { CategoryRepositoryData } from "@/data/repositories/CategoryRepositoryData";
import { CategoryDomainModel } from "../models/CategoryDomainModel";
import { IRepositoryDomain } from "./IRepositoryDomain";

export class CategoryRepositoryDomain implements IRepositoryDomain<CategoryDomainModel> {
  categoryRepository: CategoryRepositoryData
  constructor(
    categoryRepository: CategoryRepositoryData
  ) {
    this.categoryRepository = categoryRepository;
  }
  list(): Promise<CategoryDomainModel[]> {
    throw new Error("Method not implemented.");
  }
  get(id: number): Promise<CategoryDomainModel> {
    throw new Error("Method not implemented.");
  }
  set(m: CategoryDomainModel): Promise<CategoryDomainModel> {
    throw new Error("Method not implemented.");
  }
  edit(id: number, m: CategoryDomainModel): Promise<CategoryDomainModel> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
