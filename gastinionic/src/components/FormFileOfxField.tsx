import { IonItem, IonLabel, IonNote, IonText } from "@ionic/vue";
import { defineComponent } from "vue";
import { FormFieldProps } from "./Form";

export const FormFileOfxField = defineComponent({
  props: {
    value: {
      type: Object,
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
  } & FormFieldProps<File>) {
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
          type="file"
          accept=".ofx"
          onChange={(event) => {
            const input = event.target as HTMLInputElement
            const file = input.files?.[0]
            if (file) {
              props.setValue(file)
            }
          }}
        />
      </IonItem>
    )
  }
})
