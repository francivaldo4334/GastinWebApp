import { ValidityRepositoryData } from "@/data/repositories/ValidityRepositoryData";
import { mapToValidityData, RecordDomainModel } from "../models/RecordDomainModel";

export const createOrUpdateValidity = async (
  oldModel: RecordDomainModel,
  newModel: RecordDomainModel,
  validityRepository: ValidityRepositoryData,
) => {
  if (!oldModel.isRecurrent && !newModel.isRecurrent) {
    return
  }

  if (!newModel.isRecurrent) {
    validityRepository.delete(oldModel.validityId!)
  }

  if (!oldModel.isRecurrent) {
    const validity = mapToValidityData(newModel);
    const created = await validityRepository.set(validity);
    newModel.validityId = created.id
    return created;
  }
  const validity = mapToValidityData(newModel);
  const created = await validityRepository.edit(oldModel.validityId!, validity);
  newModel.validityId = created.id
  return created;
}
