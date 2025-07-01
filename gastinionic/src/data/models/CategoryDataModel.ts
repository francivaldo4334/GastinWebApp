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
    id: data.id,
    title: data.title,
    description: data.description,
    color: data.color,
  });
};

export const mapFromCategoryDataModel = (model: CategoryDataModel): any => {
  return {
    id: model.id,
    title: model.title,
    description: model.description,
    color: model.color,
  };
};
