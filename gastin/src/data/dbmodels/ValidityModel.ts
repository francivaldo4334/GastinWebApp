import { models } from "beast-orm";

export class ValidityModel extends models.Model {
  id = models.AutoField({ primaryKey: true })
  isEveryDays = models.BooleanField({ default: false })
  initValidity = models.DateField({ blank: true })
  endValidity = models.DateField({ blank: true })
}
