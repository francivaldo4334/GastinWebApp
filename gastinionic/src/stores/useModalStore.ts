import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modals", () => {
  const isOpenReceipt = ref(false)
  const isOpenReceiptDetails = ref(false)
  const isOpenExpenditure = ref(false)
  const isOpenExpenditureDetails = ref(false)
  const isOpenCategory = ref(false)
  const isOpenCategoryDetails = ref(false)
  const isOpenImportOfx = ref(false)
  const now = new Date().toISOString()
  const chartDataLoaded = ref(now)

  const onOpenReceipt = () => isOpenReceipt.value = true
  const onOpenReceiptDetails = (data: any) => isOpenReceiptDetails.value = data
  const onOpenImportOfx = () => isOpenImportOfx.value = true
  const onOpenExpenditure = () => isOpenExpenditure.value = true
  const onOpenExpenditureDetails = (data: any) => isOpenExpenditureDetails.value = data
  const onOpenCategory = () => isOpenCategory.value = true
  const onOpenCategoryDetails = (data: any) => isOpenCategoryDetails.value = data

  const onLoadCharData = () => {
    const now = new Date().toISOString()
    chartDataLoaded.value = now
  }

  const onCloseReceipt = () => {
    isOpenReceipt.value = false
    onLoadCharData()
  }
  const onCloseReceiptDetails = () => {
    isOpenReceiptDetails.value = false
    onLoadCharData()
  }
  const onCloseImportOfx = () => {
    isOpenImportOfx.value = false
    onLoadCharData()
  }

  const onCloseExpenditure = () => {
    isOpenExpenditure.value = false
    onLoadCharData()
  }
  const onCloseExpenditureDetails = () => {
    isOpenExpenditureDetails.value = false
    onLoadCharData()
  }

  const onCloseCategory = () => {
    isOpenCategory.value = false
    onLoadCharData()
  }
  const onCloseCategoryDetails = () => {
    isOpenCategoryDetails.value = false
    onLoadCharData()
  }

  return {
    isOpenReceipt,
    isOpenExpenditure,
    isOpenCategory,
    isOpenImportOfx,
    onOpenReceipt,
    onCloseReceipt,
    onOpenExpenditure,
    onCloseExpenditure,
    onOpenCategory,
    onCloseCategory,
    onOpenImportOfx,
    onCloseImportOfx,

    isOpenReceiptDetails,
    isOpenExpenditureDetails,
    isOpenCategoryDetails,
    onOpenReceiptDetails,
    onCloseReceiptDetails,
    onOpenExpenditureDetails,
    onCloseExpenditureDetails,
    onOpenCategoryDetails,
    onCloseCategoryDetails,

    chartDataLoaded,
    onLoadCharData,
  }
})
