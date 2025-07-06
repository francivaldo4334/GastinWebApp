export class ValidityDataModel implements IDataModel {
  id: number;
  isEveryDays: boolean;
  isEveryMonths: boolean;
  initValidity?: string;
  endValidity?: string;

  constructor(data: {
    id?: number;
    isEveryDays: boolean;
    isEveryMonths: boolean;
    initValidity?: string;
    endValidity?: string;
  }) {
    this.id = data.id!;
    this.isEveryDays = data.isEveryDays;
    this.isEveryMonths = data.isEveryMonths;
    this.initValidity = data.initValidity;
    this.endValidity = data.endValidity;
  }
}

export const mapToValidityDataModel = (data: any): ValidityDataModel => {
  if (!data.isEveryMonths && !data.isEveryDays) {
    data.isEveryMonths = true
  }
  return new ValidityDataModel({
    id: data.id,
    isEveryDays: data.isEveryDays,
    initValidity: data.initValidity,
    endValidity: data.endValidity,
    isEveryMonths: data.isEveryMonths,
  })
};

export const mapFromValidityDataModel = (m: ValidityDataModel): any => ({
  id: m.id,
  isEveryDays: m.isEveryDays,
  initValidity: m.initValidity,
  endValidity: m.endValidity,
  isEveryMonths: m.isEveryMonths,
});

