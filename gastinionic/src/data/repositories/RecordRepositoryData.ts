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
    if (!it) throw new Error(`item de id: "${id}" não encontrado`)
    return mapToRecordDataModel(it);
  }

  async set(m: RecordDataModel): Promise<RecordDataModel> {
    m.createdAt = new Date().toISOString()
    if (m.uniqueId) {
      const exists = (await this.list()).find(it => it.uniqueId === m.uniqueId)
      if (exists) {
        throw new Error("o id de uniqueId deve ser unico")
      }
    }
    const it = await Database.instance.records.add(mapFromRecordDataModel(m));
    return mapToRecordDataModel(it);
  }

  async edit(id: number, m: RecordDataModel): Promise<RecordDataModel> {
    const model = mapFromRecordDataModel(m)
    model.id = id
    await Database.instance.records.update(id, model);
    const it = await Database.instance.records.get(id);
    return mapToRecordDataModel(it);
  }

  async delete(id: number): Promise<boolean> {
    await Database.instance.records.delete(id);
    return true;
  }

  async filterByCategoryId(categoryId: number) {
    return await Database.instance.records.filter({ categoryId })
  }
}
