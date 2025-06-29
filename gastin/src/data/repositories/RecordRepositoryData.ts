import { Database } from "../Database";
import { mapFromRecordDataModel, mapToRecordDataModel, RecordDataModel } from "../models/RecordDataModel";
import { IRepositoryData } from "./IRepositoryData";

export class RecordRepositoryData implements IRepositoryData<RecordDataModel> {
  async list(): Promise<RecordDataModel[]> {
    const list = await Database.instance.records.toArray();
    return list.map(mapToRecordDataModel);
  }

  async get(id: number): Promise<RecordDataModel> {
    const it = await Database.instance.records.get(id);
    return mapToRecordDataModel(it);
  }

  async set(m: RecordDataModel): Promise<RecordDataModel> {
    const id = await Database.instance.records.add(mapFromRecordDataModel(m));
    const it = await Database.instance.records.get(id);
    return mapToRecordDataModel(it);
  }

  async edit(id: number, m: RecordDataModel): Promise<RecordDataModel> {
    await Database.instance.records.update(id, mapFromRecordDataModel(m));
    const it = await Database.instance.records.get(id);
    return mapToRecordDataModel(it);
  }

  async delete(id: number): Promise<boolean> {
    await Database.instance.records.delete(id);
    return true;
  }
}
