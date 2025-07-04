import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modals", () => {
  const isOpenReceipt = ref(false)
  const isOpenExpenditure = ref(false)

  const onOpenReceipt = () => isOpenReceipt.value = true
  const onCloseReceipt = () => isOpenReceipt.value = false

  const onOpenExpenditure = () => isOpenExpenditure.value = true
  const onCloseExpenditure = () => isOpenExpenditure.value = false

  return {
    isOpenReceipt,
    isOpenExpenditure,
    onOpenReceipt,
    onCloseReceipt,
    onOpenExpenditure,
    onCloseExpenditure,
  }
})
