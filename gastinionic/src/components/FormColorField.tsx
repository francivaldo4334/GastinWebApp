import { IonInput, IonItem, IonLabel, IonNote, IonText } from "@ionic/vue";
import { defineComponent } from "vue";
import { FormFieldProps } from "./Form";

export const FormColorField = defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
    setValue: {
      type: Function,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    errorMessage: {
      type: String,
      required: false,
    }
  },
  setup(props: {
    label: string,
  } & FormFieldProps<string>) {
    return () => (
      <IonItem>
        <IonLabel>
          <IonText>{props.label}</IonText>
          <p >
            <IonNote
              slot="end"
              color="danger"
              class="select-bottom"
            >
              {props.errorMessage}
            </IonNote>
          </p>
        </IonLabel>
        <input
          style="height: 40px; border: none; background: transparent;"
          type="color"
          value={props.value}
          onChange={(event) => {
            //@ts-ignore
            props.setValue(event.target?.value)
          }}
        />
      </IonItem>
    )
  }
})
