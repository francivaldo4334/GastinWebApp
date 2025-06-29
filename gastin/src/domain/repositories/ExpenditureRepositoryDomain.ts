import { ValidityRepositoryData } from "@/data/repositories/ValidityRepositoryData";
import { RecordDomainModel } from "../models/RecordDomainModel";
import { IRepositoryDomain } from "./IRepositoryDomain";
import { RecordRepositoryData } from "@/data/repositories/RecordRepositoryData";

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
  list(): Promise<RecordDomainModel[]> {
    throw new Error("Method not implemented.");
  }
  get(id: number): Promise<RecordDomainModel> {
    throw new Error("Method not implemented.");
  }
  set(m: RecordDomainModel): Promise<RecordDomainModel> {
    throw new Error("Method not implemented.");
  }
  edit(id: number, m: RecordDomainModel): Promise<RecordDomainModel> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}
