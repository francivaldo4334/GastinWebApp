import { defineComponent } from "vue";
import { DatabaseProvider } from "./DatabaseProvider";

export const Providers = defineComponent({
  setup(_, { slots }) {
    return () => <>
      <DatabaseProvider>
        {slots.default?.()}
      </DatabaseProvider>
    </>
  }
})
