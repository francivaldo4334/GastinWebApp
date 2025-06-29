export class ValidityDataModel implements IDataModel {
  id: number;
  isEveryDays: boolean;
  initValidity?: string;
  endValidity?: string;

  constructor(data: {
    id: number;
    isEveryDays: boolean;
    initValidity?: string;
    endValidity?: string;
  }) {
    this.id = data.id;
    this.isEveryDays = data.isEveryDays;
    this.initValidity = data.initValidity;
    this.endValidity = data.endValidity;
  }
}
