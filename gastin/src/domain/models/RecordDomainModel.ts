export class RecordDomainModel implements IDomainModel {
  id: number;
  value: number;
  title: string;
  description: string;
  categoryId: number;
  isRecurrent: boolean;
  isEveryDays: boolean;
  initValidity?: string;
  endValidity?: string;

  constructor(data: {
    id: number;
    value: number;
    title: string;
    description: string;
    categoryId: number;
    isRecurrent: boolean;
    isEveryDays: boolean;
    initValidity?: string;
    endValidity?: string;
  }) {

    this.id = data.id;
    this.value = data.value;
    this.title = data.title;
    this.description = data.description;
    this.categoryId = data.categoryId;
    this.isRecurrent = data.isRecurrent;
    this.isEveryDays = data.isEveryDays;
    this.initValidity = data.initValidity;
    this.endValidity = data.endValidity;
  }
}
