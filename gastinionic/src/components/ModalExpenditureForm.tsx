import { IonButton, IonContent, IonHeader, IonToolbar } from "@ionic/vue";
import { defineComponent, PropType, render } from "vue";

export const ModalExpenditureForm = defineComponent({
  props: {
    onClose: {
      type: (() => { }) as PropType<() => void>,
      required: true,
    },
  },
  setup(props: any) {
    return () => (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButton onClick={props.onClose}>Close</IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>ok</IonContent>
      </>
    )
  }
})
