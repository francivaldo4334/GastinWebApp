import { Database } from "../Database";
import { mapFromValidityDataModel, mapToValidityDataModel, ValidityDataModel } from "../models/ValidityDataModel";
import { IRepositoryData } from "./IRepositoryData";

export class ValidityRepositoryData implements IRepositoryData<ValidityDataModel> {
  async list(): Promise<ValidityDataModel[]> {
    const list = await Database.instance.validities.toArray();
    return list.map(mapToValidityDataModel);
  }

  async get(id: number): Promise<ValidityDataModel> {
    const it = await Database.instance.validities.get(id);
    return mapToValidityDataModel(it);
  }

  async set(m: ValidityDataModel): Promise<ValidityDataModel> {
    const id = await Database.instance.validities.add(mapFromValidityDataModel(m));
    const it = await Database.instance.validities.get(id);
    return mapToValidityDataModel(it);
  }

  async edit(id: number, m: ValidityDataModel): Promise<ValidityDataModel> {
    const model = mapFromValidityDataModel(m)
    model.id = id
    await Database.instance.validities.update(id, model);
    const it = await Database.instance.validities.get(id);
    return mapToValidityDataModel(it);
  }

  async delete(id: number): Promise<boolean> {
    await Database.instance.validities.delete(id);
    return true;
  }
}
