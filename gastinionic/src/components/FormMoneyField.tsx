import { IonInput, IonItem } from "@ionic/vue";
import { defineComponent } from "vue";
import { FormFieldProps } from "./Form";
import { formatMoney } from "@/utils/formatMoney";

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
    },
    placeholder:{
      type: String,
      required: false
    } 
  },
  setup(props: { 
    label?: string;
    placeholder: string;
  } & FormFieldProps<string>) {
    return () => (
      <IonItem>
        <IonInput
          placeholder={props.placeholder}
          label={props.label}
          value={formatMoney(props.value)}
          onIonInput={event => {
            const value = event.detail?.value
            if (typeof value != "string")
              return
            props.setValue(formatMoney(value))
          }}
          class={props.errorMessage ? "ion-touched ion-invalid" : "ion-valid"}
          errorText={props.errorMessage}
          labelPlacement="fixed"
          inputmode="numeric"
        />
      </IonItem>
    )
  }
})
