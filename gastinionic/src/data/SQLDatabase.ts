import { InterfaceDatabase, Table } from "./InterfaceDatabase";
import { CategoryDataModel } from "./models/CategoryDataModel";
import { RecordDataModel } from "./models/RecordDataModel";
import { ValidityDataModel } from "./models/ValidityDataModel";

class CategoryDataModelTable implements Table<CategoryDataModel> {
  add(data: CategoryDataModel): Promise<CategoryDataModel> {
    throw new Error("Method not implemented.");
  }
  get(id: CategoryDataModel): Promise<CategoryDataModel> {
    throw new Error("Method not implemented.");
  }
  delete(id: CategoryDataModel): Promise<void> {
    throw new Error("Method not implemented.");
  }
  toArray(): Promise<CategoryDataModel[]> {
    throw new Error("Method not implemented.");
  }
  update(id: number, model: CategoryDataModel): Promise<CategoryDataModel> {
    throw new Error("Method not implemented.");
  }
  filter(object: Record<string, any>): Promise<CategoryDataModel[]> {
    throw new Error("Method not implemented.");
  }
  paginate(page: number, perPage: number, filters?: Record<string, any>): Promise<{ items: any[]; count: number; }> {
    throw new Error("Method not implemented.");
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
