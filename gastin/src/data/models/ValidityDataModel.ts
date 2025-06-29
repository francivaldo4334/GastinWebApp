export class ValidityDataModel implements IDataModel {
  id: number;
  isEveryDays: boolean;
  initValidity?: string;
  endValidity?: string;

  constructor(data: {
    id?: number;
    isEveryDays: boolean;
    initValidity?: string;
    endValidity?: string;
  }) {
    this.id = data.id!;
    this.isEveryDays = data.isEveryDays;
    this.initValidity = data.initValidity;
    this.endValidity = data.endValidity;
  }
}

export const mapToValidityDataModel = (data: any): ValidityDataModel =>
  new ValidityDataModel({
    id: Number(data.id),
    isEveryDays: Boolean(data.isEveryDays),
    initValidity: data.initValidity ?? undefined,
    endValidity: data.endValidity ?? undefined,
  });

export const mapFromValidityDataModel = (m: ValidityDataModel): any => ({
  id: m.id,
  isEveryDays: m.isEveryDays,
  initValidity: m.initValidity,
  endValidity: m.endValidity,
});

