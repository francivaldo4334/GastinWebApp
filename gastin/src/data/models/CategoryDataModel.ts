export class CategoryDataModel implements IDataModel {
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

export const mapToCategoryDataModel = (data: any): CategoryDataModel => {
  return new CategoryDataModel({
    id: Number(data.id),
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    color: String(data.color ?? "#000000"),
  });
};

export const mapFromCategoryDataModel = (model: CategoryDataModel): any => {
  return {
    title: model.title,
    description: model.description,
    color: model.color,
  };
};
