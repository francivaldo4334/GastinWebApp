export class RecordDataModel implements IDataModel {
  id: number;
  value: number;
  title: string;
  description: string;
  categoryId: number;
  validityId?: number;

  constructor(data: {
    id: number;
    value: number;
    title: string;
    description: string;
    categoryId: number;
    validityId?: number;
  }) {

    this.id = data.id;
    this.value = data.value;
    this.title = data.title;
    this.description = data.description;
    this.categoryId = data.categoryId;
    this.validityId = data.validityId;
  }
}


export const mapToRecordDataModel = (data: any): RecordDataModel =>
  new RecordDataModel({
    id: Number(data.id),
    value: Number(data.value),
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    categoryId: Number(data.categoryId),
    validityId: data.validityId ? Number(data.validityId) : undefined,
  });

export const mapFromRecordDataModel = (m: RecordDataModel): any => ({
  id: m.id,
  value: m.value,
  title: m.title,
  description: m.description,
  categoryId: m.categoryId,
  validityId: m.validityId,
});
