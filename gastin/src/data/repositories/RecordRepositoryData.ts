import { RecordDataModel } from "../models/RecordDataModel";
import { IRepositoryData } from "./IRepositoryData";

export class RecordRepositoryData implements IRepositoryData<RecordDataModel> {
  list(): Promise<RecordDataModel[]> {
    throw new Error("Method not implemented.");
  }
  get(id: number): Promise<RecordDataModel> {
    throw new Error("Method not implemented.");
  }
  set(m: RecordDataModel): Promise<RecordDataModel> {
    throw new Error("Method not implemented.");
  }
  edit(id: number, m: RecordDataModel): Promise<RecordDataModel> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
