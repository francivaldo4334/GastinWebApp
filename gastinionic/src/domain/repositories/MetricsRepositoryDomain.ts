import { CategoryRepositoryDomain } from "./CategoryRepositoryDomain";
import { ExpenditureRepositoryDomain } from "./ExpenditureRepositoryDomain";
import { IRepositoryDomain } from "./IRepositoryDomain";
import { ReceiptRepositoryDomain } from "./ReceiptRepositoryDomain";

export class MetricsRepositoryDomain implements IRepositoryDomain<any> {
  receiptRepository: ReceiptRepositoryDomain;
  expenditureRepository: ExpenditureRepositoryDomain;
  categoryRepository: CategoryRepositoryDomain;

  constructor(data: {
    receiptRepository: ReceiptRepositoryDomain;
    expenditureRepository: ExpenditureRepositoryDomain;
    categoryRepository: CategoryRepositoryDomain;
  }) {
    this.receiptRepository = data.receiptRepository;
    this.expenditureRepository = data.expenditureRepository;
    this.categoryRepository = data.categoryRepository;
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

  async accountBalance(init: Date, end: Date): Promise<{
    received: number;
    spend: number;
    currentBalance: number;
  }> {
    const receipts = await this.receiptRepository.range(init, end)
    const expenditures = await this.expenditureRepository.range(init, end)
    const totalReceipt = receipts.map(it => it.value).reduce((a, b) => a + b, 0)
    const totalSpend = expenditures.map(it => it.value).reduce((a, b) => a + b, 0)
    const totalBalance = totalReceipt - totalSpend
    return {
      received: totalReceipt,
      spend: totalSpend,
      currentBalance: totalBalance,
    }
  }

  async pieChartData(init: Date, end: Date): Promise<{
    label: string;
    value: number;
    color: string;
    percentage: number;
  }[]> {
    return [
      { label: "Gastos", value: 45, color: "#f87171", percentage: 45 },
      { label: "Ganhos", value: 30, color: "#34d399", percentage: 30 },
      { label: "Poupança", value: 25, color: "#60a5fa", percentage: 25 },
    ]//TODO: implementar dados de grafico de pizza
  }
  async barChartData(params: {
    type: "month" | "year";
    periodValue: Date;
  }): Promise<{ value: number; label: string; }[]> {

    const metrics = [
      { label: "Segunda", value: 150 },
      { label: "Terça", value: 200 },
      { label: "Quarta", value: 180 },
      { label: "Quinta", value: 220 },
      { label: "Sexta", value: 304 },
      { label: "Sábado", value: 30 },
      { label: "Domingo", value: 60 },
    ];
    return metrics
  }
}
