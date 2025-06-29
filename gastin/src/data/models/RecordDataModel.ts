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
