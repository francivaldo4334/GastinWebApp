import { ValidityModel } from "../dbmodels/ValidityModel";
import { mapFromValidityDataModel, mapToValidityDataModel, ValidityDataModel } from "../models/ValidityDataModel";
import { IRepositoryData } from "./IRepositoryData";

export class ValidityRepositoryData implements IRepositoryData<ValidityDataModel> {
  async list(): Promise<ValidityDataModel[]> {
    const list = await ValidityModel.all();
    return list.map(mapToValidityDataModel);
  }

  async get(id: number): Promise<ValidityDataModel> {
    const it = await ValidityModel.get({ id });
    return mapToValidityDataModel(it);
  }

  async set(m: ValidityDataModel): Promise<ValidityDataModel> {
    const it = await ValidityModel.create(mapFromValidityDataModel(m));
    return mapToValidityDataModel(it);
  }

  async edit(id: number, m: ValidityDataModel): Promise<ValidityDataModel> {
    const it = await ValidityModel.get({ id });
    it.isEveryDays = m.isEveryDays;
    it.initValidity = m.initValidity;
    it.endValidity = m.endValidity;
    await it.save();
    return mapToValidityDataModel(it);
  }

  async delete(id: number): Promise<boolean> {
    const it = await ValidityModel.get({ id });
    await it.delete();
    return true;
  }
}
