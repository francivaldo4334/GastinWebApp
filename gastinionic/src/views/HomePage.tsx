import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => (
      <IonPage id="home-page">
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              Tela Pricipal
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        </IonContent>
      </IonPage>
    )
  }
})
