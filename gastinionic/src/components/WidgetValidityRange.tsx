import { IonDatetime, IonDatetimeButton, IonItem, IonModal } from "@ionic/vue";
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
        <IonDatetimeButton
          datetime={initValidityId}
        />
        <IonDatetimeButton
          datetime={endValidityId}
        />
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
          />
        </IonModal>
      </IonItem>
    )
  }
})
