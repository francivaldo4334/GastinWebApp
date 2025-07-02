import { ModalExpenditureForm } from "@/components/ModalExpenditureForm";
import { ModalReceiptForm } from "@/components/ModalReceiptForm";
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
  IonMenuToggle,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { pricetagOutline, addOutline, removeOutline, helpCircleOutline } from "ionicons/icons"
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const modalExpenditure = ref()
    const modalReceipt = ref()
    const onCloseModalExpenditure = () => {
      modalExpenditure.value.$el.dismiss(null, "cancel")
    }
    const onCloseModalReceipt = () => {
      modalReceipt.value.$el.dismiss(null, "cancel")
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
            <IonMenuToggle>
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
              <IonItem 
                button 
                id="btn-open-modal-expenditure" 
                expand="block"
              >
                <IonIcon
                  icon={removeOutline}
                  slot="start"
                  aria-hidden
                />
                <IonLabel>
                  Adicionar Despesa
                </IonLabel>
              </IonItem>
              <IonItem
                button 
                id="btn-open-modal-receipt" 
                expand="block"
              >
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
            </IonMenuToggle>
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
        <IonModal 
          ref={modalExpenditure} 
          trigger="btn-open-modal-expenditure"
        >
          <IonContent>
            <ModalExpenditureForm
              onClose={onCloseModalExpenditure}
            />
          </IonContent>
        </IonModal>
        <IonModal
          ref={modalReceipt} 
          trigger="btn-open-modal-receipt"
        >
          <IonContent>
            <ModalReceiptForm
              onClose={onCloseModalReceipt}
            />
          </IonContent>
        </IonModal>
      </>
    )
  }
})
