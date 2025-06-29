import { ValidityDataModel } from "../models/ValidityDataModel";
import { IRepositoryData } from "./IRepositoryData";

export class ValidityRepositoryData implements IRepositoryData<ValidityDataModel> {
  list(): Promise<ValidityDataModel[]> {
    throw new Error("Method not implemented.");
  }
  get(id: number): Promise<ValidityDataModel> {
    throw new Error("Method not implemented.");
  }
  set(m: ValidityDataModel): Promise<ValidityDataModel> {
    throw new Error("Method not implemented.");
  }
  edit(id: number, m: ValidityDataModel): Promise<ValidityDataModel> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
