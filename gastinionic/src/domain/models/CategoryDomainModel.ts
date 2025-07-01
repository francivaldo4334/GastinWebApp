import { CategoryDataModel } from "@/data/models/CategoryDataModel";

export class CategoryDomainModel implements IDomainModel {
  id: number;
  title: string;
  description: string;
  color: string;

  constructor(data: {
    id?: number;
    title: string;
    description: string;
    color: string;
  }) {

    this.id = data.id!;
    this.title = data.title;
    this.description = data.description;
    this.color = data.color;
  }
}

export const mapToData = (m: CategoryDomainModel): CategoryDataModel => {
  return new CategoryDataModel({
    id: m.id,
    title: m.title,
    description: m.description,
    color: m.color,
  });
};

export const mapToDomain = (m: CategoryDataModel): CategoryDomainModel => {
  return new CategoryDomainModel({
    id: m.id,
    title: m.title,
    description: m.description,
    color: m.color,
  });
};
