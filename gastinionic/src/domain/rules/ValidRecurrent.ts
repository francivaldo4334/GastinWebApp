import { RecordDomainModel } from "../models/RecordDomainModel";
import { IRule } from "./IRule";

export class ValidRecurrent extends IRule<RecordDomainModel> {
  isValidy(model: RecordDomainModel): boolean {
    if (!model.isRecurrent) {
      return true
    }
    if (model.isEveryDays){
      return true
    }
    if (model.initValidity && model.endValidity){
      return true
    }
    return false
  }
}
