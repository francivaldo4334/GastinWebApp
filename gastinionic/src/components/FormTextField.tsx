import { defineComponent } from "vue";
import { FormFieldProps } from "./Form";
import { IonInput, IonItem } from "@ionic/vue";

export const FormTextField = defineComponent({
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
          value={props.value}
          onIonInput={(e) => {
            const value = e.detail?.value
            if (typeof value != "string")
              return
            props.setValue(value)
          }}
          class={props.errorMessage ? "ion-touched ion-invalid" : "ion-valid"}
          errorText={props.errorMessage}
          labelPlacement="fixed"
        />
      </IonItem>
    )
  }
})
