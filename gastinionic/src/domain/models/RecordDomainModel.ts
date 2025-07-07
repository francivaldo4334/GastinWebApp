import { CategoryDataModel } from "@/data/models/CategoryDataModel";
import { RecordDataModel } from "@/data/models/RecordDataModel";
import { ValidityDataModel } from "@/data/models/ValidityDataModel";

export class RecordDomainModel implements IDomainModel {
  id: number;
  value: number;
  description: string;
  categoryId: number;
  isRecurrent: boolean;
  isEveryDays: boolean;
  isEveryMonths: boolean;
  validityId?: number;
  initValidity?: string;
  endValidity?: string;
  createdAt?: string;
  date?: string;
  uniqueId?: number
  categoryTitle?: string

  constructor(data: {
    id?: number;
    value: number;
    description: string;
    categoryId: number;
    isRecurrent: boolean;
    isEveryDays: boolean;
    isEveryMonths: boolean;
    createdAt?: string;
    initValidity?: string;
    endValidity?: string;
    date?: string;
    uniqueId?: number
    validityId?: number;
    categoryTitle?: string
  }) {
    this.id = data.id!;
    this.value = data.value;
    this.description = data.description;
    this.categoryId = data.categoryId;
    this.isRecurrent = data.isRecurrent;
    this.isEveryDays = data.isEveryDays;
    this.initValidity = data.initValidity;
    this.endValidity = data.endValidity;
    this.createdAt = data.createdAt;
    this.date = data.date
    this.uniqueId = data.uniqueId
    this.isEveryMonths = data.isEveryMonths
    this.validityId = data.validityId
    this.categoryTitle = data.categoryTitle
  }
}

export const mapToDomain = (
  record: RecordDataModel,
  validity?: ValidityDataModel,
  category?: CategoryDataModel,
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
    createdAt: record.createdAt,
    date: record.date,
    uniqueId: record.uniqueId,
    isEveryMonths: validity?.isEveryMonths ?? false,
    validityId: validity?.id!,
    categoryTitle: category?.title,
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
    createdAt: domain.createdAt,
    date: domain.date,
    uniqueId: domain.uniqueId,
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
    isEveryMonths: domain.isEveryMonths,
  });
};
