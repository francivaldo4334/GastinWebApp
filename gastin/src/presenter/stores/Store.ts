import { createSignal } from "solid-js"

const [isOpenNewCategory, setIsOpenNewCategory] = createSignal(false)
const [isOpenNewExpenditure, setIsOpenNewExpenditure] = createSignal(false)
const [isOpenNewReceipt, setIsOpenNewReceipt] = createSignal(false)

const [isOpenEditCategory, setIsOpenEditCategory] = createSignal(false)
const [isOpenEditExpenditure, setIsOpenEditExpenditure] = createSignal(false)
const [isOpenEditReceipt, setIsOpenEditReceipt] = createSignal(false)

const [categoryDetailId, setCategoryDetailId] = createSignal(0)
const [expenditureDetailId, setExpenditureDetailId] = createSignal(0)
const [receiptDetailId, setReceiptDetailId] = createSignal(0)

export const useStore = () => {
  return {
    isOpenNewCategory: isOpenNewCategory,
    openNewCategory() { setIsOpenNewCategory(true) },
    closeNewCategory() { setIsOpenNewCategory(false) },

    isOpenNewExpenditure: isOpenNewExpenditure,
    openNewExpenditure() { setIsOpenNewExpenditure(true) },
    closeNewExpenditure() { setIsOpenNewExpenditure(false) },

    isOpenNewReceipt: isOpenNewReceipt,
    openNewReceipt() { setIsOpenNewReceipt(true) },
    closeNewReceipt() { setIsOpenNewReceipt(false) },

    isOpenEditCategory: isOpenEditCategory,
    openEditCategory(id: number) {
      setIsOpenEditCategory(true)
      setCategoryDetailId(id)
    },
    closeEditCategory() {
      setIsOpenEditCategory(false)
      setCategoryDetailId(0)
    },

    isOpenEditExpenditure: isOpenEditExpenditure,
    openEditExpenditure(id: number) {
      setIsOpenEditExpenditure(true)
      setExpenditureDetailId(id)
    },
    closeEditExpenditure() {
      setIsOpenEditExpenditure(false)
      setExpenditureDetailId(0)
    },


    isOpenEditReceipt: isOpenEditReceipt,
    openEditReceipt(id: number) {
      setIsOpenEditReceipt(true)
      setReceiptDetailId(id)
    },
    closeEditReceipt() {
      setIsOpenEditReceipt(false)
      setReceiptDetailId(0)
    },

    categoryDetailId,
    expenditureDetailId,
    receiptDetailId,
  }
}
