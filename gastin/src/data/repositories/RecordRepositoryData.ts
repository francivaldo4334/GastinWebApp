import { RecordModel } from "../dbmodels/RecordModel";
import { mapFromRecordDataModel, mapToRecordDataModel, RecordDataModel } from "../models/RecordDataModel";
import { IRepositoryData } from "./IRepositoryData";

export class RecordRepositoryData implements IRepositoryData<RecordDataModel> {
  async list(): Promise<RecordDataModel[]> {
    const list = await RecordModel.all();
    return list.map(mapToRecordDataModel);
  }

  async get(id: number): Promise<RecordDataModel> {
    const it = await RecordModel.get({ id });
    return mapToRecordDataModel(it);
  }

  async set(m: RecordDataModel): Promise<RecordDataModel> {
    const it = await RecordModel.create(mapFromRecordDataModel(m));
    return mapToRecordDataModel(it);
  }

  async edit(id: number, m: RecordDataModel): Promise<RecordDataModel> {
    const it = await RecordModel.get({ id });
    it.value = m.value;
    it.title = m.title;
    it.description = m.description;
    it.categoryId = m.categoryId;
    it.validityId = m.validityId;
    await it.save();
    return mapToRecordDataModel(it);
  }

  async delete(id: number): Promise<boolean> {
    const it = await RecordModel.get({ id });
    await it.delete();
    return true;
  }
}
