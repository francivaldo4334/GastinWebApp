import { IonItem, IonSelect, IonSelectOption } from "@ionic/vue";
import { defineComponent } from "vue";
import { FormFieldProps } from "./Form";

export const FormSelectField = defineComponent({
  props: {
    items: {
      type: Array,
      required: true,
    },
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
    placeholder:{
      type: String,
      required: false
    } 
  },
  setup(props: {
    items: { value: string; label: string; }[];
    label: string;
    placeholder: string;
  } & FormFieldProps<string>) {
    return () => (
      <IonItem>
        <IonSelect
          placeholder={props.placeholder}
          labelPlacement="fixed"
          label={props.label}
          interface="popover"
          class={props.errorMessage ? "ion-touched ion-invalid" : "ion-valid"}
          errorText={props.errorMessage}
        >
          {
            !props.items.length && (
              <IonSelectOption disabled >
                Não ha itens
              </IonSelectOption>
            )
          }
          {
            props.items.map(it => (
              <IonSelectOption
                value={it.value}
              >
                {it.label}
              </IonSelectOption>
            ))
          }
        </IonSelect>
      </IonItem>
    )
  }
})
