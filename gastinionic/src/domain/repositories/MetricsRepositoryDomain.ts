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
    const [categories, spends] = await Promise.all([
      this.categoryRepository.list(),
      this.expenditureRepository.range(init, end)
    ])
    const total = spends.reduce((sum, {value}) =>sum + value, 0) || 1
    const dataChart = categories.map(it => {
      const value = spends
        .filter(i => i.categoryId === it.id)
        .reduce((sum, {value}) => sum + value, 0)
      return {
        label: it.title,
        value: value,
        color: it.color,
        percentage: Math.floor((value / total) * 100)
      }
    })
    return dataChart
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
