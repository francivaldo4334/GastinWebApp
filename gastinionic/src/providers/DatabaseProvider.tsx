import { Database } from "@/data/Database";
import { defineComponent, onMounted } from "vue";

export const DatabaseProvider = defineComponent({
  setup(_, { slots }) {
    onMounted(async () => {
      await Database.init()
    })
    return () => slots.default?.()
  }
})
