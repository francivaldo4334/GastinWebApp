import { IonButtons, IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slots="start">
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          ok
        </IonContent>
      </IonPage>
    )
  }
})
