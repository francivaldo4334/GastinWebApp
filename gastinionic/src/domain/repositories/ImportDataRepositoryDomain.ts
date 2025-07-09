import { ExpenditureRepositoryDomain } from "./ExpenditureRepositoryDomain";
import { IRepositoryDomain } from "./IRepositoryDomain";
import { Ofx } from 'ofx-data-extractor'
import { ReceiptRepositoryDomain } from "./ReceiptRepositoryDomain";
import { CategoryRepositoryDomain } from "./CategoryRepositoryDomain";
import { RecordDomainModel } from "../models/RecordDomainModel";
import { CategoryDomainModel } from "../models/CategoryDomainModel";

export class ImportDataRepositoryDomain implements IRepositoryDomain<any> {
  expendituresRepository: ExpenditureRepositoryDomain
  receiptRepository: ReceiptRepositoryDomain
  categoryRepository: CategoryRepositoryDomain
  constructor(params: {
    expendituresRepository: ExpenditureRepositoryDomain
    receiptRepository: ReceiptRepositoryDomain
    categoryRepository: CategoryRepositoryDomain
  }) {
    this.receiptRepository = params.receiptRepository
    this.expendituresRepository = params.expendituresRepository
    this.categoryRepository = params.categoryRepository
  }
  paginate(page: number, perPage: number): Promise<{ results: any[]; total: number; }> {
    throw new Error("Method not implemented.");
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
  async getOfxToBeCreated(file: File) {
    const text = await file.text();
    const ofx = new Ofx(text)

    const bankTransferList = ofx.getBankTransferList()

    const categories = await this.categoryRepository.list()

    const categoriesOfxItems = Array.from(
      new Set(
        bankTransferList
          .map(it => it.TRNTYPE)
          .map(String)
      )
    ).filter(it => {
      return !categories.map(it => it.title).includes(it)
    })

    const receipts = await this.receiptRepository.list()
    const spends = await this.expendituresRepository.list()
    const amounts = receipts.concat(spends)

    const categoriesToBeCreated = categoriesOfxItems.map(it =>
      new CategoryDomainModel({
        title: String(it),
        description: "",
        color: "#000000",
      })
    )


    const categoriesSearch = categories.concat(categoriesToBeCreated)

    const createToBeRecords = bankTransferList.map(it => {
      const exists = amounts.find(i => {
        return i.uniqueId === Number(it.FITID)
      })
      if (!exists) {
        const category = categoriesSearch.find(i => {
          return i.title === String(it.TRNTYPE)
        })
        return new RecordDomainModel({
          value: Math.floor(it.TRNAMT * 100),
          description: it.MEMO || "",
          categoryId: category!.id,
          isRecurrent: false,
          isEveryDays: false,
          uniqueId: Number(it.FITID),
          date: `${it.DTPOSTED}T00:00:00`,
        })
      }
    })
    return { categoriesToBeCreated, createToBeRecords }
  }
  async importOfx(params: { createToBeRecords: RecordDomainModel[], categoriesToBeCreated: CategoryDomainModel[] }) {
    const { categoriesToBeCreated, createToBeRecords } = params
    await Promise.all(categoriesToBeCreated.map(this.categoryRepository.set))
    await Promise.all(createToBeRecords.map(async record => {
      if (!record)
        return
      if (record.value < 0)
        return await this.expendituresRepository.set(record)
      return await this.receiptRepository.set(record)
    }))
  }
}
