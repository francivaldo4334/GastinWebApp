import { endOfMonth, endOfYear, format, getDay, getMonth, startOfMonth, startOfYear } from "date-fns";
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
    const total = spends.reduce((sum, { value }) => sum + value, 0) || 1
    const dataChart = categories.map(it => {
      const value = spends
        .filter(i => i.categoryId === it.id)
        .reduce((sum, { value }) => sum + value, 0)
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

    const { type, periodValue } = params
    const init = type === "month"
      ? startOfMonth(periodValue)
      : startOfYear(periodValue)

    const end = type === "month"
      ? endOfMonth(periodValue)
      : endOfYear(periodValue)

    const spends = await this.expenditureRepository.range(init, end)

    if (type === "month") {
      const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
      const result = Array(7).fill(0)

      for (const spend of spends) {
        const dayIndex = getDay(new Date(spend.date!)) // 0=Domingo, ..., 6=Sábado
        result[dayIndex] += spend.value
      }

      return result.map((value, index) => ({
        label: days[index],
        value,
      }))
    }

    if (type === "year") {
      const months = Array.from({ length: 12 }, (_, i) =>
        format(new Date(2020, i), 'MMM', { locale: "pt-BR" }) // abreviação com pt-BR
      )
      const result = Array(12).fill(0)

      for (const spend of spends) {
        const monthIndex = getMonth(new Date(spend.date!)) // 0=Jan, ..., 11=Dez
        result[monthIndex] += spend.value
      }

      return result.map((value, index) => ({
        label: months[index],
        value,
      }))
    }

    return []
  }
}
