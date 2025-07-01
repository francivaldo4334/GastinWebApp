import { CategoryModel } from "./CategoryModel";
import { ValidityModel } from "./ValidityModel";

export interface RecordModel {
  id?: number;
  value: number;
  title: string;
  description: string;
  categoryId: number | CategoryModel;
  validityId: number | ValidityModel;
}
