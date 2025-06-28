import { createSignal } from "solid-js"

const [isOpenNewCategory, setIsOpenNewCategory] = createSignal(false)
const [isOpenNewExpenditure, setIsOpenNewExpenditure] = createSignal(false)
const [isOpenNewReceipt, setIsOpenNewReceipt] = createSignal(false)

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
  }
}
