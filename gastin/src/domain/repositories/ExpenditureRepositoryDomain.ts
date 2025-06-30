import { ValidityRepositoryData } from "@/data/repositories/ValidityRepositoryData";
import { mapToDomain, mapToRecordData, mapToValidityData, RecordDomainModel } from "../models/RecordDomainModel";
import { IRepositoryDomain } from "./IRepositoryDomain";
import { RecordRepositoryData } from "@/data/repositories/RecordRepositoryData";
import { ValidRecurrent } from "../rules/ValidRecurrent";
import { IRule } from "../rules/IRule";
import { createValidity } from "../services/createValidity";
import { ValueLowerThanZero } from "../rules/ValueLowerThanZero";
import { createOrUpdateValidity } from "../services/createOrUpdateValidity";

export class ExpenditureRepositoryDomain implements IRepositoryDomain<RecordDomainModel> {
  validityRepository: ValidityRepositoryData;
  recordRepository: RecordRepositoryData;
  constructor(data: {
    validityRepository: ValidityRepositoryData;
    recordRepository: RecordRepositoryData;
  }) {
    this.validityRepository = data.validityRepository;
    this.recordRepository = data.recordRepository;
  }
  async list(): Promise<RecordDomainModel[]> {
    const records = await this.recordRepository.list();
    const validities = await this.validityRepository.list();
    return records
      .map(r => {
        const v = validities.find(v => v.id === r.validityId);
        return mapToDomain(r, v);
      });
  }

  async get(id: number): Promise<RecordDomainModel> {
    const record = await this.recordRepository.get(id);
    if (record.value >= 0) throw new Error("Not an expenditure");

    const validity = record.validityId
      ? await this.validityRepository.get(record.validityId)
      : undefined;

    return mapToDomain(record, validity);
  }

  async set(m: RecordDomainModel): Promise<RecordDomainModel> {
    const valid = IRule.use()
      .and(new ValueLowerThanZero())
      .and(new ValidRecurrent())
      .applyAllValidations(m)

    if (!valid)
      throw new Error("Lançamento invalido")

    const validity = await createValidity(m, this.validityRepository)
    const record = await this.recordRepository.set(mapToRecordData(m));

    return mapToDomain(record, validity);
  }

  async edit(id: number, newModel: RecordDomainModel): Promise<RecordDomainModel> {
    if (!id) {
      throw new Error("Id não definido")
    }
    const valid = IRule.use()
      .and(new ValueLowerThanZero())
      .and(new ValidRecurrent())
      .applyAllValidations(newModel)

    if (!valid)
      throw new Error("Lançamento invalido")
    const oldModel = await this.get(id)

    const validity = await createOrUpdateValidity(oldModel, newModel, this.validityRepository)
    const record = await this.recordRepository.edit(id, mapToRecordData(newModel));

    return mapToDomain(record, validity);
  }

  async delete(id: number): Promise<boolean> {
    return await this.recordRepository.delete(id);
  }
}
