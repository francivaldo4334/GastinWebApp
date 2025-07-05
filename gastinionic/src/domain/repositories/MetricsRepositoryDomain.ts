import { addDays, addMonths, addYears, endOfDay, endOfMonth, endOfYear, format, getDay, getMonth, startOfDay, startOfMonth, startOfYear } from "date-fns";
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
  }): Promise<{ value: string; label: string; }[]> {
    const { type, periodValue } = params

    const init = type === "month"
      ? startOfMonth(periodValue)
      : startOfYear(periodValue)

    const end = type === "month"
      ? endOfMonth(periodValue)
      : endOfYear(periodValue)

    const dataChart: { label: string; value: string; }[] = []

    let currentDate = init

    while (currentDate <= end) {
      let searchInit: Date
      let searchEnd: Date
      let label: string

      if (type === "month") {
        searchInit = startOfDay(currentDate)
        searchEnd = endOfDay(currentDate)
        label = currentDate.toLocaleDateString("pt-BR", { day: "2-digit" })
        currentDate = addDays(currentDate, 1)
      } else {
        searchInit = startOfMonth(currentDate)
        searchEnd = endOfMonth(currentDate)
        label = currentDate.toLocaleDateString("pt-BR", { month: "short" })
        currentDate = addMonths(currentDate, 1)
      }

      const spends = await this.expenditureRepository.range(searchInit, searchEnd)
      const total = spends.reduce((sum, { value }) => sum + value, 0)

      dataChart.push({ label, value: (total / 100).toFixed(2) })
    }

    return dataChart
  }
  async costOfLivingGrowth(params: {
    type: "month" | "year";
    periodValue: Date;
  }) {
    const { type, periodValue } = params

    let currentPeriodInit: Date;
    let currentPeriodEnd: Date;
    let oldPeriodInit: Date;
    let oldPeriodEnd: Date;

    if (type === "month") {
      const initMonth = startOfMonth(periodValue)
      const endMonth = endOfMonth(periodValue)

      currentPeriodInit = startOfDay(initMonth)
      currentPeriodEnd = endOfDay(endMonth)

      oldPeriodInit = addMonths(currentPeriodInit, -1)
      oldPeriodEnd = addMonths(currentPeriodEnd, -1)
    }
    else {
      const initYear = startOfYear(periodValue)
      const endYear = endOfYear(periodValue)

      currentPeriodInit = startOfDay(initYear)
      currentPeriodEnd = endOfDay(endYear)

      oldPeriodInit = addYears(currentPeriodInit, -1)
      oldPeriodEnd = addYears(currentPeriodEnd, -1)
    }


    const currentSpends = await this.expenditureRepository.range(currentPeriodInit, currentPeriodEnd)
    const oldSpends = await this.expenditureRepository.range(oldPeriodInit, oldPeriodEnd)

    const currentTotal = currentSpends.reduce((sum, { value }) => sum + value, 0);
    const oldTotal = oldSpends.reduce((sum, { value }) => sum + value, 0);

    if (oldTotal === 0) {
      return currentTotal === 0 ? 0 : null;
    }

    const result = ((currentTotal - oldTotal) / oldTotal) * 100

    return Math.floor(result)
  }
  async purchasingPower(params: {
    type: "month" | "year";
    periodValue: Date;
  }) {
    const { type, periodValue } = params

    let currentPeriodInit: Date;
    let currentPeriodEnd: Date;
    let oldPeriodInit: Date;
    let oldPeriodEnd: Date;

    if (type === "month") {
      const initMonth = startOfMonth(periodValue)
      const endMonth = endOfMonth(periodValue)

      currentPeriodInit = startOfDay(initMonth)
      currentPeriodEnd = endOfDay(endMonth)

      oldPeriodInit = addMonths(currentPeriodInit, -1)
      oldPeriodEnd = addMonths(currentPeriodEnd, -1)
    }
    else {
      const initYear = startOfYear(periodValue)
      const endYear = endOfYear(periodValue)

      currentPeriodInit = startOfDay(initYear)
      currentPeriodEnd = endOfDay(endYear)

      oldPeriodInit = addYears(currentPeriodInit, -1)
      oldPeriodEnd = addYears(currentPeriodEnd, -1)
    }


    const currentSpends = await this.expenditureRepository.range(currentPeriodInit, currentPeriodEnd)
    const currentReceipt = await this.receiptRepository.range(currentPeriodInit, currentPeriodEnd)
    const oldSpends = await this.expenditureRepository.range(oldPeriodInit, oldPeriodEnd)
    const oldReceipt = await this.receiptRepository.range(oldPeriodInit, oldPeriodEnd)

    const currentSpendTotal = currentSpends.reduce((sum, { value }) => sum + value, 0);
    const oldSpendTotal = oldSpends.reduce((sum, { value }) => sum + value, 0);
    const currentReceiptTotal = currentReceipt.reduce((sum, { value }) => sum + value, 0);
    const oldReceiptTotal = oldReceipt.reduce((sum, { value }) => sum + value, 0);

    const varReceipt = (currentReceiptTotal - oldReceiptTotal) / oldReceiptTotal
    const varSpend = (currentSpendTotal - oldSpendTotal) / oldSpendTotal

    const result = ((1 + varReceipt) / (1 + varSpend)) - 1

    return Math.floor(result * 100)
  }
}
