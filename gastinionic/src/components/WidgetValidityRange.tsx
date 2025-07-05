import { IonButtons, IonDatetime, IonDatetimeButton, IonItem, IonModal, IonText } from "@ionic/vue";
import { defineComponent } from "vue";

export const WidgetValidityRange = defineComponent({
  props: {
    initValidity: {
      type: String,
      required: true,
    },
    setInitValidity: {
      type: Function,
      required: true,
    },
    endValidity: {
      type: String,
      required: true,
    },
    setEndValidity: {
      type: Function,
      required: true,
    },
  },
  setup(props: {
    initValidity: string;
    setInitValidity: (value: string) => void;
    endValidity: string;
    setEndValidity: (value: string) => void;
  }) {
    const initValidityId = `${Math.random()}_modal_datetime`
    const endValidityId = `${Math.random()}_modal_datetime`

    return () => (
      <IonItem>
        <IonButtons
          slot="end"
          style={{ "gap": "0.5rem" }}
        >
          <IonText>Período de</IonText>
          <IonDatetimeButton
            datetime={initValidityId}
          />
          <IonText>até</IonText>
          <IonDatetimeButton
            datetime={endValidityId}
          />
        </IonButtons>
        <IonModal keepContentsMounted >
          <IonDatetime
            id={initValidityId}
            presentation="date"
            value={props.initValidity}
            onIonChange={e => {
              const value = e.detail.value
              if (typeof value != "string")
                return
              props.setInitValidity(value)
            }}
            formatOptions={{
              date: {
                month: "2-digit",
                year: "numeric",
                day: "2-digit",
              }
            }}
          />
        </IonModal>
        <IonModal keepContentsMounted >
          <IonDatetime
            id={endValidityId}
            min={props.initValidity}
            presentation="date"
            value={props.endValidity}
            onIonChange={e => {
              const value = e.detail.value
              if (typeof value != "string")
                return
              props.setEndValidity(value)
            }}
            formatOptions={{
              date: {
                month: "2-digit",
                year: "numeric",
                day: "2-digit",
              }
            }}
          />
        </IonModal>
      </IonItem>
    )
  }
})
