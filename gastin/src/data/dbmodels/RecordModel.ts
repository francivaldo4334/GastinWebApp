import { models } from "beast-orm";
import { ValidityModel } from "./ValidityModel";
import { CategoryModel } from "./CategoryModel";

export class RecordModel extends models.Model {
  id = models.AutoField({ primaryKey: true })
  value = models.IntegerField({ default: 0 })
  title = models.CharField({ maxLength: 255 })
  description = models.TextField()
  categoryId = models.ForeignKey({ model: CategoryModel })
  validityId = models.OneToOneField({ model: ValidityModel })
}
