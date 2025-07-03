import { IonDatetime, IonDatetimeButton, IonItem, IonModal } from "@ionic/vue";
import { defineComponent } from "vue";

export const WidgetValidityRange = defineComponent({
  setup() {
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
          />
        </IonModal>
        <IonModal keepContentsMounted >
          <IonDatetime
            id={endValidityId}
            presentation="date"
          />
        </IonModal>
      </IonItem>
    )
  }
})
