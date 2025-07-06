import { differenceInDays, differenceInMonths } from "date-fns";
import { RecordDomainModel } from "../models/RecordDomainModel";

export const calcRecordtotal = (
  start: Date, end: Date,
  record_range: RecordDomainModel[],
): number => {
  const calcValue = (it: RecordDomainModel) => {
    if (!it.isRecurrent) {
      return it.value
    }
    if (it.isEveryDays) {
      const countDays = Math.abs(differenceInDays(end, start)) + 1
      return countDays * it.value
    }
    if (it.isEveryMonths) {
      const startMonth = new Date(it.initValidity!)
      const endMonth = new Date(it.endValidity!)
      const countMonths = Math.abs(differenceInMonths(startMonth, endMonth)) + 1
      return countMonths * it.value
    }
    return 0
  }
  const result = record_range.reduce((sum, it) => calcValue(it) + sum, 0)
  return result
}
