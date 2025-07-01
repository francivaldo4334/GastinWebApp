import { RecordDataModel } from "@/data/models/RecordDataModel";
import { ValidityDataModel } from "@/data/models/ValidityDataModel";

export class RecordDomainModel implements IDomainModel {
  id: number;
  value: number;
  description: string;
  categoryId: number;
  isRecurrent: boolean;
  isEveryDays: boolean;
  validityId?: number;
  initValidity?: string;
  endValidity?: string;

  constructor(data: {
    id?: number;
    value: number;
    description: string;
    categoryId: number;
    isRecurrent: boolean;
    isEveryDays: boolean;
    initValidity?: string;
    endValidity?: string;
  }) {

    this.id = data.id!;
    this.value = data.value;
    this.description = data.description;
    this.categoryId = data.categoryId;
    this.isRecurrent = data.isRecurrent;
    this.isEveryDays = data.isEveryDays;
    this.initValidity = data.initValidity;
    this.endValidity = data.endValidity;
  }
}

export const mapToDomain = (
  record: RecordDataModel,
  validity?: ValidityDataModel
): RecordDomainModel => {
  return new RecordDomainModel({
    id: record.id,
    value: Math.abs(record.value),
    description: record.description,
    categoryId: record.categoryId,
    isRecurrent: !!record.validityId,
    isEveryDays: validity?.isEveryDays ?? false,
    initValidity: validity?.initValidity,
    endValidity: validity?.endValidity,
  });
};


export const mapToRecordData = (
  domain: RecordDomainModel,
): RecordDataModel => {
  return new RecordDataModel({
    id: domain.id,
    value: domain.value,
    description: domain.description,
    categoryId: domain.categoryId,
    validityId: domain.validityId,
  });
};


export const mapToValidityData = (
  domain: RecordDomainModel,
): ValidityDataModel => {
  return new ValidityDataModel({
    id: domain.validityId,
    isEveryDays: domain.isEveryDays,
    initValidity: domain.initValidity,
    endValidity: domain.endValidity,
  });
};
