import { InterfaceDatabase, Table } from "./InterfaceDatabase";
import { CategoryDataModel } from "./models/CategoryDataModel";
import { RecordDataModel } from "./models/RecordDataModel";
import { ValidityDataModel } from "./models/ValidityDataModel";
import { RepositoryInterface } from "./SQL/repositories/RepositoryInterface";
import { TB_CATEGORIA } from "./SQL/tables/TB_CATEGORIA";

class CategoryDataModelTable implements Table<CategoryDataModel, TB_CATEGORIA> {
  sqlRepo!: RepositoryInterface<TB_CATEGORIA>;
  toData(model: CategoryDataModel): TB_CATEGORIA {
    throw new Error("Method not implemented.");
  }
  toModel(data: TB_CATEGORIA): CategoryDataModel {
    throw new Error("Method not implemented.");
  }

  async add(model: CategoryDataModel): Promise<CategoryDataModel> {
    const data = await this.sqlRepo.insert(this.toData(model))
    if (!data)
      throw new Error("Erro ao inserir dados.");
    return this.toModel(data)
  }
  async get(id: number): Promise<CategoryDataModel> {
    const data = await this.sqlRepo.getById(id)
    if (!data)
      throw new Error("Erro ao obter dados.");
    return this.toModel(data)
  }
  async delete(id: number): Promise<void> {
    const result = await this.sqlRepo.deleteById(id)
    if (!result)
      throw new Error("Erro ao deletar dados.");
  }
  async toArray(): Promise<CategoryDataModel[]> {
    const results = await this.sqlRepo.selectAll()
    return results.map(this.toModel)
  }
  async update(id: number, model: CategoryDataModel): Promise<CategoryDataModel> {
    const dataUpdate = this.toData(model)
    const result = await this.sqlRepo.updateItem(id, dataUpdate)
    if (!result)
      throw new Error("Erro ao atualizar dados.");
    return this.toModel(result)
  }
  filter(object: Record<string, any>): Promise<CategoryDataModel[]> {
    throw new Error("Method not implemented.");
  }
  async paginate(page: number, perPage: number, filters?: Record<string, any>): Promise<{ items: any[]; count: number; }> {
    const results = await this.sqlRepo.selectPaginated(perPage, page)
    return results.map(this.toModel)
  }
  range?: ((init: string, end: string) => Promise<any>) | undefined;
}

class RecordDataModelTable implements Table<RecordDataModel> {
  add(data: RecordDataModel): Promise<RecordDataModel> {
    throw new Error("Method not implemented.");
  }
  get(id: RecordDataModel): Promise<RecordDataModel> {
    throw new Error("Method not implemented.");
  }
  delete(id: RecordDataModel): Promise<void> {
    throw new Error("Method not implemented.");
  }
  toArray(): Promise<RecordDataModel[]> {
    throw new Error("Method not implemented.");
  }
  update(id: number, model: RecordDataModel): Promise<RecordDataModel> {
    throw new Error("Method not implemented.");
  }
  filter(object: Record<string, any>): Promise<RecordDataModel[]> {
    throw new Error("Method not implemented.");
  }
  paginate(page: number, perPage: number, filters?: Record<string, any>): Promise<{ items: any[]; count: number; }> {
    throw new Error("Method not implemented.");
  }
  range?: ((init: string, end: string) => Promise<any>) | undefined;
}

class ValidityDataModelTable implements Table<ValidityDataModel> {
  add(data: ValidityDataModel): Promise<ValidityDataModel> {
    throw new Error("Method not implemented.");
  }
  get(id: ValidityDataModel): Promise<ValidityDataModel> {
    throw new Error("Method not implemented.");
  }
  delete(id: ValidityDataModel): Promise<void> {
    throw new Error("Method not implemented.");
  }
  toArray(): Promise<ValidityDataModel[]> {
    throw new Error("Method not implemented.");
  }
  update(id: number, model: ValidityDataModel): Promise<ValidityDataModel> {
    throw new Error("Method not implemented.");
  }
  filter(object: Record<string, any>): Promise<ValidityDataModel[]> {
    throw new Error("Method not implemented.");
  }
  paginate(page: number, perPage: number, filters?: Record<string, any>): Promise<{ items: any[]; count: number; }> {
    throw new Error("Method not implemented.");
  }
  range?: ((init: string, end: string) => Promise<any>) | undefined;
}

export class SQLDatabase implements InterfaceDatabase {
  categories: Table = new CategoryDataModelTable()
  records: Table = new RecordDataModelTable()
  validities: Table = new ValidityDataModelTable()
}
