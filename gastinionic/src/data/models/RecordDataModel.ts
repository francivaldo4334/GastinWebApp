export class RecordDataModel implements IDataModel {
  id: number;
  value: number;
  description: string;
  categoryId: number;
  validityId?: number;
  createdAt: string;
  date?: string;
  uniqueId?: number

  constructor(data: {
    id: number;
    value: number;
    description: string;
    categoryId: number;
    validityId?: number;
    createdAt?: string;
    date?: string;
    uniqueId?: number
  }) {

    this.id = data.id;
    this.value = data.value;
    this.description = data.description;
    this.categoryId = data.categoryId;
    this.validityId = data.validityId;
    this.createdAt = data.createdAt || new Date().toISOString()
    this.date = data.date
    this.uniqueId = data.uniqueId
  }
}


export const mapToRecordDataModel = (data: any): RecordDataModel => {
  return new RecordDataModel({
    id: data.id,
    value: data.value,
    description: data.description,
    categoryId: data.categoryId,
    validityId: data.validityId,
    date: data.date,
    createdAt: data.createdAt,
    uniqueId: data.uniqueId,
  });
}
export const mapFromRecordDataModel = (m: RecordDataModel): any => ({
  id: m.id,
  value: m.value,
  description: m.description,
  categoryId: m.categoryId,
  validityId: m.validityId,
  date: m.date,
  createdAt: m.createdAt,
  uniqueId: m.uniqueId,
});
