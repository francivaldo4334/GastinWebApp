import { CategoryRepositoryData } from "@/data/repositories/CategoryRepositoryData";
import { CategoryDomainModel, mapToData, mapToDomain } from "../models/CategoryDomainModel";
import { IRepositoryDomain } from "./IRepositoryDomain";

export class CategoryRepositoryDomain implements IRepositoryDomain<CategoryDomainModel> {
  constructor(private categoryRepository: CategoryRepositoryData) { }

  async list(): Promise<CategoryDomainModel[]> {
    const dataModels = await this.categoryRepository.list();
    return dataModels.map(mapToDomain);
  }

  async get(id: number): Promise<CategoryDomainModel> {
    const data = await this.categoryRepository.get(id);
    return mapToDomain(data);
  }

  async set(m: CategoryDomainModel): Promise<CategoryDomainModel> {
    const saved = await this.categoryRepository.set(mapToData(m));
    return mapToDomain(saved);
  }

  async edit(id: number, m: CategoryDomainModel): Promise<CategoryDomainModel> {
    const updated = await this.categoryRepository.edit(id, mapToData(m));
    return mapToDomain(updated);
  }

  async delete(id: number): Promise<boolean> {
    return await this.categoryRepository.delete(id);
  }
}
