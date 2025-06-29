import { models } from "beast-orm";

export class CategoryModel extends models.Model {
  id = models.AutoField({ primaryKey: true })
  title = models.CharField({ maxLength: 255 })
  description = models.TextField()
  color = models.CharField({ maxLength: 9 })
}
