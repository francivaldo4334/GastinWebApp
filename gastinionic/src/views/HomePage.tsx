import { ModalCategoryForm } from "@/components/ModalCategoryForm";
import { ModalExpenditureForm } from "@/components/ModalExpenditureForm";
import { ModalReceiptForm } from "@/components/ModalReceiptForm";
import {
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
import {
  pricetagOutline,
  addOutline,
  removeOutline,
  helpCircleOutline,
  listOutline,
} from "ionicons/icons"
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const modalExpenditure = ref()
    const modalReceipt = ref()
    const modalCategory = ref()
    const onCloseModalExpenditure = () => {
      modalExpenditure.value.$el.dismiss(null, "cancel")
    }
    const onCloseModalReceipt = () => {
      modalReceipt.value.$el.dismiss(null, "cancel")
    }
    const onCloseModalCategory = () => {
      modalCategory.value.$el.dismiss(null, "cancel")
    }
    return () => (
      <IonPage>
        <IonMenu contentId="home-page" side="end">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Mais opções</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonMenuToggle>
              <IonItem
                button
                id="btn-open-modal-category"
                expand="block"
              >
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

              <IonItem
                routerLink="/expenditures"
              >
                <IonIcon
                  icon={listOutline}
                  slot="start"
                  ariaHidden
                />
                <IonLabel>
                  Lista de Despesas
                </IonLabel>
              </IonItem>
              <IonItem
                routerLink="/receipts"
              >
                <IonIcon
                  icon={listOutline}
                  slot="start"
                  aria-hidden
                />
                <IonLabel>
                  Lista de Receitas
                </IonLabel>
              </IonItem>
              <IonItem
                routerLink="/categories"
              >
                <IonIcon
                  icon={listOutline}
                  slot="start"
                  ariaHidden
                />
                <IonLabel>
                  Lista de Categorias
                </IonLabel>
              </IonItem>
              <IonItem
                routerLink="/help"
              >
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
        <IonModal
          ref={modalCategory}
          trigger="btn-open-modal-category"
        >
          <IonContent>
            <ModalCategoryForm
              onClose={onCloseModalCategory}
            />
          </IonContent>
        </IonModal>
      </IonPage>
    )
  }
})
