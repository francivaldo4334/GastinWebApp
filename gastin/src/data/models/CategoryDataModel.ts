export class CategoryDataModel implements IDataModel {
  id: number;
  title: string;
  description: string;
  color: string;

  constructor(data: {
    id: number;
    title: string;
    description: string;
    color: string;
  }) {

    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.color = data.color;
  }
}
