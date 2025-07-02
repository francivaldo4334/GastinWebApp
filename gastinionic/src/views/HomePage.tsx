import { ModalExpenditureForm } from "@/components/ModalExpenditureForm";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { pricetagOutline, addOutline, removeOutline, helpCircleOutline } from "ionicons/icons"
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const modal = ref()
    const onCloseModal = () => {
      modal.value.$el.dismiss(null, "cancel")
    }
    return () => (
      <>
        <IonMenu contentId="home-page" side="end">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Mais opções</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonItem>
              <IonIcon
                icon={pricetagOutline}
                slot="start"
                aria-hidden
              />
              <IonLabel>
                Adicionar Categoria
              </IonLabel>
            </IonItem>
            <IonItem button id="btn-open-modal-expenditure" expand="block">
              <IonIcon
                icon={removeOutline}
                slot="start"
                aria-hidden
              />
              <IonLabel>
                Adicionar Despesa
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon
                icon={addOutline}
                slot="start"
                aria-hidden
              />
              <IonLabel>
                Adicionar Receita
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon
                icon={helpCircleOutline}
                slot="start"
                aria-hidden
              />
              <IonLabel>
                Como funciona?
              </IonLabel>
            </IonItem>
          </IonContent>
        </IonMenu>
        <IonPage id="home-page">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="end"> <IonMenuButton /> </IonButtons>
              <IonTitle> Tela Pricipal </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
          </IonContent>
        </IonPage>
        <IonModal ref={modal} trigger="btn-open-modal-expenditure">
          <ModalExpenditureForm
            onClose={onCloseModal}
          />
        </IonModal>
      </>
    )
  }
})
