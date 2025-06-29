import { ValidityRepositoryData } from "@/data/repositories/ValidityRepositoryData";
import { mapToDomain, mapToRecordData, mapToValidityData, RecordDomainModel } from "../models/RecordDomainModel";
import { IRepositoryDomain } from "./IRepositoryDomain";
import { RecordRepositoryData } from "@/data/repositories/RecordRepositoryData";

export class ReceiptRepositoryDomain implements IRepositoryDomain<RecordDomainModel> {
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
      .filter(r => r.value > 0)
      .map(r => {
        const v = validities.find(v => v.id === r.validityId);
        return mapToDomain(r, v);
      });
  }

  async get(id: number): Promise<RecordDomainModel> {
    const record = await this.recordRepository.get(id);

    const validity = record.validityId
      ? await this.validityRepository.get(record.validityId)
      : undefined;

    return mapToDomain(record, validity);
  }

  async set(m: RecordDomainModel): Promise<RecordDomainModel> {
    if (m.isRecurrent) {
      const validity = mapToValidityData(m);
      const created = await this.validityRepository.set(validity);
      m.validityId = created.id;
    }

    const record = await this.recordRepository.set(mapToRecordData(m));
    const validity = record.validityId ? await this.validityRepository.get(record.validityId) : undefined;

    return mapToDomain(record, validity);
  }

  async edit(id: number, m: RecordDomainModel): Promise<RecordDomainModel> {
    let validityId: number | undefined;

    const localModel = await this.get(id)

    if (m.isRecurrent) {
      const validity = mapToValidityData(m);

      if (!localModel.isRecurrent && m.isRecurrent) {
        validityId = (await this.validityRepository.set(validity)).id
      }

      if (localModel.isRecurrent && !m.isRecurrent) {
        await this.validityRepository.delete(localModel.validityId!)
      }

      if (localModel.isRecurrent && m.isRecurrent) {
        const updated = await this.validityRepository.edit(m.id, validity);
        validityId = updated.id;
      }
    }

    const record = await this.recordRepository.edit(id, mapToRecordData(m));
    const validity = validityId ? await this.validityRepository.get(validityId) : undefined;

    return mapToDomain(record, validity);
  }

  async delete(id: number): Promise<boolean> {
    return await this.recordRepository.delete(id);
  }
}
