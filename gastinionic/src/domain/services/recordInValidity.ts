import { RecordDomainModel } from "../models/RecordDomainModel";

export const recordInValidity = (m: RecordDomainModel, init: Date, end: Date): boolean => {
  if (!m.isRecurrent) {
    const date = new Date(m.date!)
    return date >= init && date <= end;
  }
  if (m.isEveryDays) {
    return true
  }
  const mInit = new Date(m.initValidity!)
  const mEnd = new Date(m.endValidity!)

  if (mEnd < init || mInit > end)
    return false
  return true
}
