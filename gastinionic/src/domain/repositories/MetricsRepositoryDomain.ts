import { ExpenditureRepositoryDomain } from "./ExpenditureRepositoryDomain";
import { IRepositoryDomain } from "./IRepositoryDomain";
import { ReceiptRepositoryDomain } from "./ReceiptRepositoryDomain";

export class MetricsRepositoryDomain implements IRepositoryDomain<any> {
  receiptRepository: ReceiptRepositoryDomain;
  expenditureRepository: ExpenditureRepositoryDomain;
  constructor(data: {
    receiptRepository: ReceiptRepositoryDomain;
    expenditureRepository: ExpenditureRepositoryDomain;
  }) {
    this.receiptRepository = data.receiptRepository;
    this.expenditureRepository = data.expenditureRepository;
  }
  list(): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  get(id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
  set(m: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  edit(id: number, m: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  accountBalance(init: Date, end: Date): Promise<{
    received: number;
    spend: number;
    currentBalance: number;
  }> {
    throw new Error("Method not implemented.");
  }
}
