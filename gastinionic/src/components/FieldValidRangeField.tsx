import { IonDatetime, IonDatetimeButton, IonItem, IonLabel, IonModal, IonNote, IonText } from "@ionic/vue";
import { defineComponent } from "vue";
import { FormFieldProps } from "./Form";

export const FieldValidRangeField = defineComponent({
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
  } & FormFieldProps<string>) {
    const datemodalid = `${Math.random()}_datetime_modal`
    return () => (
      <IonItem disabled={props.disabled}>
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
        <IonDatetimeButton
          datetime={datemodalid}
        />
        <IonLabel>
          <br />
        </IonLabel>
        <IonModal keepContentsMounted>
          <IonDatetime
            id={datemodalid}
            showDefaultTitle
            presentation="date"
            value={props.value}
            onIonChange={event => {
              const value = event.detail.value
              if (typeof value != "string")
                return
              props.setValue(value)
            }}
          ></IonDatetime>
        </IonModal>
      </IonItem>
    )
  }
})
