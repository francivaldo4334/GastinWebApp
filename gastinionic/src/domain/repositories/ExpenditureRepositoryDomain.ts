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
import { CategoryRepositoryData } from "@/data/repositories/CategoryRepositoryData";

export class ExpenditureRepositoryDomain implements IRepositoryDomain<RecordDomainModel> {
  validityRepository: ValidityRepositoryData;
  recordRepository: RecordRepositoryData;
  categoryRepository: CategoryRepositoryData;
  constructor(data: {
    validityRepository: ValidityRepositoryData;
    recordRepository: RecordRepositoryData;
    categoryRepository: CategoryRepositoryData;
  }) {
    this.validityRepository = data.validityRepository;
    this.recordRepository = data.recordRepository;
    this.categoryRepository = data.categoryRepository;
  }
  async paginate(page: number, perPage: number): Promise<{ results: RecordDomainModel[]; total: number; }> {
    const result = await this.recordRepository.paginate(
      page,
      perPage,
      {
        value__lt: 0
      }
    )

    const list = await Promise.all(
      result.items.map(async it => {
        const v = it.validityId ? await this.validityRepository.get(it.validityId) : undefined
        const c = await this.categoryRepository.get(it.categoryId)
        return mapToDomain(it, v, c)
      })
    )
    return {
      results: list,
      total: result.count,
    }
  }

  async range(init: Date, end: Date): Promise<RecordDomainModel[]> {
    const list = await this.list()
    return list.filter(it => recordInValidity(it, init, end))
  }
  async list(): Promise<RecordDomainModel[]> {
    const records = await this.recordRepository.list()
    const result = await Promise.all(
      records
        .filter(it =>
          IRule.use()
            .and(new ValueLowerThanZero())
            .applyAllValidations(it)
        )
        .map(async r => {
          const v = r.validityId ? await this.validityRepository.get(r.validityId) : undefined
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
