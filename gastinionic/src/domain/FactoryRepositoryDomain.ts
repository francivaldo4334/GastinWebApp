import { ValidityRepositoryData } from "@/data/repositories/ValidityRepositoryData"
import { ReceiptRepositoryDomain } from "./repositories/ReceiptRepositoryDomain"
import { RecordRepositoryData } from "@/data/repositories/RecordRepositoryData"
import { CategoryRepositoryData } from "@/data/repositories/CategoryRepositoryData"
import { ExpenditureRepositoryDomain } from "./repositories/ExpenditureRepositoryDomain"
import { CategoryRepositoryDomain } from "./repositories/CategoryRepositoryDomain"
import { MetricsRepositoryDomain } from "./repositories/MetricsRepositoryDomain"
import { ImportDataRepositoryDomain } from "./repositories/ImportDataRepositoryDomain"

type TypeRepository = "receipt" | "expenditure" | "category" | "metrics" | "importdata";

type RepositoryMap = {
  receipt: ReceiptRepositoryDomain;
  expenditure: ExpenditureRepositoryDomain;
  category: CategoryRepositoryDomain;
  metrics: MetricsRepositoryDomain;
  importdata: ImportDataRepositoryDomain;
};

export class FactoryRepositoryDomain {
  static getRepository<T extends TypeRepository>(type: T): RepositoryMap[T] {
    const factories: Record<TypeRepository, () => any> = {
      receipt: () =>
        new ReceiptRepositoryDomain({
          validityRepository: new ValidityRepositoryData(),
          recordRepository: new RecordRepositoryData(),
        }),
      expenditure: () =>
        new ExpenditureRepositoryDomain({
          validityRepository: new ValidityRepositoryData(),
          recordRepository: new RecordRepositoryData(),
        }),
      category: () => new CategoryRepositoryDomain(new CategoryRepositoryData()),
      metrics: () => new MetricsRepositoryDomain({
        receiptRepository: this.getRepository("receipt"),
        expenditureRepository: this.getRepository("expenditure"),
        categoryRepository: this.getRepository("category"),
      }),
      importdata: () => new ImportDataRepositoryDomain({
        receiptRepository: this.getRepository("receipt"),
        expendituresRepository: this.getRepository("expenditure"),
        categoryRepository: this.getRepository("category"),

      }),
    };

    const factory = factories[type];
    if (!factory) throw new Error("Repositório não encontrado");
    return factory();
  }
}
