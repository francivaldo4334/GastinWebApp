import { createSignal } from "solid-js"

const [isOpenNewCategory, setIsOpenNewCategory] = createSignal(false)
export const useStore = () => {
  return {
    isOpenNewCategory: isOpenNewCategory,
    openNewCategory() { setIsOpenNewCategory(true) },
    closeNewCategory() { setIsOpenNewCategory(false) },
  }
}
