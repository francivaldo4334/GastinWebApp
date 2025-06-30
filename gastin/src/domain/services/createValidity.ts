import { ValidityRepositoryData } from "@/data/repositories/ValidityRepositoryData";
import { mapToValidityData, RecordDomainModel } from "../models/RecordDomainModel";

export const createValidity = async (m:RecordDomainModel, validityRepository: ValidityRepositoryData) => {
      if (!m.isRecurrent) return
      const validity = mapToValidityData(m);
      const created = await validityRepository.set(validity);
      m.validityId = created.id
      return created;
}
