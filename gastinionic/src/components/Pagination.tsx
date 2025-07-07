import { IonButton, IonButtons, IonLabel, IonRow } from "@ionic/vue";
import { defineComponent } from "vue";

export const Pagination = defineComponent({
  setup() {
    return () => (
      <>
        <IonRow 
          class="ion-justify-content-between ion-padding"
          style={{"padding-bottom": "4rem"}}
        >
          <IonButtons>
          <IonButton> Anterior </IonButton>
          </IonButtons>
          <IonLabel>Página 1 de 20</IonLabel>
          <IonButtons>
          <IonButton>Próximo</IonButton>
          </IonButtons>
        </IonRow>
      </>
    )
  }
})
