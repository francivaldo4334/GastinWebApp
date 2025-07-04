import { defineStore } from "pinia";

export const useModalStore = defineStore("modals", {
  state() {
    return {
      isOpenReceipt: false,
      isOpenExpenditure: false,
    }
  },
  actions: {
    onOpenReceipt() {
      this.isOpenReceipt = true
    },
    onCloseReceipt() {
      this.isOpenReceipt = false
    },
    onOpenExpenditure() {
      this.isOpenExpenditure = true
    },
    onCloseExpenditure() {
      this.isOpenExpenditure = false
    }
  }
})
