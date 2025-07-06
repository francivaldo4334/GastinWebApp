export interface ValidityModel {
  id: number;
  isEveryDays: boolean;
  isEveryMonths?: boolean;
  initValidity?: string | null;
  endValidity?: string | null;
}
