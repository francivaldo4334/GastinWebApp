import { IonItem, IonToggle } from "@ionic/vue";
import { defineComponent } from "vue";
import { FormFieldProps } from "./Form";

export const FormCheckboxField = defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    setValue: {
      type: Function,
      required: true
    },
    errorMessage: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },
  setup(props: {
    label: string;
    disabled: boolean;
    placeholder: string;
  } & FormFieldProps<boolean>) {
    return () => (
      <IonItem>
        <IonToggle
          disabled={props.disabled}
          justify="space-between"
          labelPlacement="fixed"
          checked={props.value}
          onIonChange={event => {
            props.setValue(event.detail.checked)
          }}
          class={props.errorMessage ? "ion-touched ion-invalid" : "ion-valid"}
          errorText={props.errorMessage}
        >{props.label}</IonToggle>
      </IonItem>
    )
  }
})
