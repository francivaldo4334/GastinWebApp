import { ValidityRepositoryData } from "@/data/repositories/ValidityRepositoryData";
import { mapToDomain, mapToRecordData, RecordDomainModel } from "../models/RecordDomainModel";
import { IRepositoryDomain } from "./IRepositoryDomain";
import { RecordRepositoryData } from "@/data/repositories/RecordRepositoryData";
import { ValidRecurrent } from "../rules/ValidRecurrent";
import { IRule } from "../rules/IRule";
import { createValidity } from "../services/createValidity";
import { ValueGreaterThenZero } from "../rules/ValueGreaterThenZero";
import { createOrUpdateValidity } from "../services/createOrUpdateValidity";
import { ValueLowerThanZero } from "../rules/ValueLowerThanZero";
import { recordInValidity } from "../services/recordInValidity";

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

  async range(init: Date, end: Date): Promise<RecordDomainModel[]> {
    const list = await this.list()
    return list.filter(it => recordInValidity(it, init, end))
  }
  async list(params?: {
    page: number;
    perPage: number;
  }): Promise<RecordDomainModel[]> {
    const records = !params
      ?
      await this.recordRepository.list()
      :
      await this.recordRepository.paginate(params.page, params.perPage)
    console.log(records)
    const result = await Promise.all(
      records
        .filter(it =>
          IRule.use()
            .and(new ValueLowerThanZero())
            .applyAllValidations(it)
        )
        .map(async r => {
          const v = await this.validityRepository.get(r.validityId!)
          return mapToDomain(r, v);
        })
    )

    return result
  }

  async get(id: number): Promise<RecordDomainModel> {
    const record = await this.recordRepository.get(id);
    const validity = record.validityId
      ? await this.validityRepository.get(record.validityId)
      : undefined;

    return mapToDomain(record, validity);
  }

  async set(m: RecordDomainModel): Promise<RecordDomainModel> {
    const valid = IRule.use()
      .and(new ValueGreaterThenZero())
      .and(new ValidRecurrent())
      .applyAllValidations(m)

    if (!valid)
      throw new Error("Lançamento invalido")

    const validity = await createValidity(m, this.validityRepository)
    const model = mapToRecordData(m)
    model.value = -Math.abs(model.value)
    const record = await this.recordRepository.set(model);

    return mapToDomain(record, validity);
  }

  async edit(id: number, newModel: RecordDomainModel): Promise<RecordDomainModel> {
    if (!id) {
      throw new Error("Id não definido")
    }
    const valid = IRule.use()
      .and(new ValueGreaterThenZero())
      .and(new ValidRecurrent())
      .applyAllValidations(newModel)

    if (!valid)
      throw new Error("Lançamento invalido")
    const oldModel = await this.get(id)

    const validity = await createOrUpdateValidity(oldModel, newModel, this.validityRepository)
    const model = mapToRecordData(newModel)
    model.value = -Math.abs(model.value)
    const record = await this.recordRepository.edit(id, model);

    return mapToDomain(record, validity);
  }

  async delete(id: number): Promise<boolean> {
    return await this.recordRepository.delete(id);
  }
  filterByCategory(categoryId: number): Promise<RecordDomainModel[]> {
    return this.recordRepository.filterByCategoryId(categoryId)
  }
}
