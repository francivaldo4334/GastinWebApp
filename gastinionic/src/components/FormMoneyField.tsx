import { IonInput } from "@ionic/vue";
import { defineComponent } from "vue";
import { FormFieldProps } from "./Form";

export const FormMoneyField = defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
    setValue: {
      type: Function,
      required: true,
    },
    errorMessage: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    }
  },
  setup(props: { label?: string } & FormFieldProps<string>) {
    return () => (
      <IonInput
        label={props.label}
        value={props.value}
        onIonInput={event => {
          const value = event.detail?.value
          if (typeof value != "string")
            return
          props.setValue(value)
        }}
        class={props.errorMessage ? "ion-touched ion-invalid" : "ion-valid"}
        errorText={props.errorMessage}
        labelPlacement="fixed"
      />
    )
  }
})
