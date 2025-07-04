import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modals", () => {
  const isOpenReceipt = ref(false)
  const isOpenReceiptDetails = ref(false)
  const isOpenExpenditure = ref(false)
  const isOpenExpenditureDetails = ref(false)
  const isOpenCategory = ref(false)
  const isOpenCategoryDetails = ref(false)

  const onOpenReceipt = () => isOpenReceipt.value = true
  const onCloseReceipt = () => isOpenReceipt.value = false
  const onOpenReceiptDetails = (data: any) => isOpenReceiptDetails.value = data
  const onCloseReceiptDetails = () => isOpenReceiptDetails.value = false

  const onOpenExpenditure = () => isOpenExpenditure.value = true
  const onCloseExpenditure = () => isOpenExpenditure.value = false
  const onOpenExpenditureDetails = (data: any) => isOpenExpenditureDetails.value = data
  const onCloseExpenditureDetails = () => isOpenExpenditureDetails.value = false

  const onOpenCategory = () => isOpenCategory.value = true
  const onCloseCategory = () => isOpenCategory.value = false
  const onOpenCategoryDetails = (data: any) => isOpenCategoryDetails.value = true
  const onCloseCategoryDetails = () => isOpenCategoryDetails.value = false

  return {
    isOpenReceipt,
    isOpenExpenditure,
    isOpenCategory,
    onOpenReceipt,
    onCloseReceipt,
    onOpenExpenditure,
    onCloseExpenditure,
    onOpenCategory,
    onCloseCategory,

    isOpenReceiptDetails,
    isOpenExpenditureDetails,
    isOpenCategoryDetails,
    onOpenReceiptDetails,
    onCloseReceiptDetails,
    onOpenExpenditureDetails,
    onCloseExpenditureDetails,
    onOpenCategoryDetails,
    onCloseCategoryDetails,
  }
})
