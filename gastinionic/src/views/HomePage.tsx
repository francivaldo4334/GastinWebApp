import { ChartWidgets } from "@/components/ChartWidgets";
import { ModalCategoryForm } from "@/components/ModalCategoryForm";
import { ModalExpenditureForm } from "@/components/ModalExpenditureForm";
import { ModalReceiptForm } from "@/components/ModalReceiptForm";
import { useModalStore } from "@/stores/useModalStore";
import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
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
  helpCircleOutline,
  listOutline,
  chevronUpCircle,
  addCircleOutline,
  removeCircleOutline,
} from "ionicons/icons"
import { storeToRefs } from "pinia";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const isOpenModalCategory = ref(false)
    const modalStore = useModalStore()
    const {
      isOpenReceipt,
      isOpenExpenditure,
    } = storeToRefs(modalStore)

    const {
      onCloseReceipt,
      onOpenReceipt,
      onCloseExpenditure,
      onOpenExpenditure,
    } = modalStore

    const onOpenModalCategory = () => {
      isOpenModalCategory.value = true
    }
    const onCloseModalCategory = () => {
      isOpenModalCategory.value = false
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
                onClick={onOpenModalCategory}
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
                onClick={onOpenExpenditure}
              >
                <IonIcon
                  icon={removeCircleOutline}
                  slot="start"
                  aria-hidden
                />
                <IonLabel>
                  Adicionar Despesa
                </IonLabel>
              </IonItem>
              <IonItem
                button
                onClick={onOpenReceipt}
              >
                <IonIcon
                  icon={addCircleOutline}
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
            <IonFab slot="fixed" horizontal="end" vertical="bottom">
              <IonFabButton>
                <IonIcon
                  icon={chevronUpCircle}
                />
              </IonFabButton>
              <IonFabList side="top">
                <IonFabButton
                  onClick={onOpenExpenditure}
                >
                  <IonIcon icon={removeCircleOutline} />
                </IonFabButton>
                <IonFabButton
                  onClick={onOpenReceipt}
                >
                  <IonIcon icon={addCircleOutline} />
                </IonFabButton>
                <IonFabButton
                  onClick={onOpenModalCategory}
                >
                  <IonIcon icon={pricetagOutline} />
                </IonFabButton>
              </IonFabList>
            </IonFab>
            <ChartWidgets />
          </IonContent>
        </IonPage>
        <IonModal
          isOpen={isOpenExpenditure.value}
          backdropDismiss={false}
        >
          <IonContent>
            <ModalExpenditureForm
              onClose={onCloseExpenditure}
            />
          </IonContent>
        </IonModal>
        <IonModal
          isOpen={isOpenReceipt.value}
          backdropDismiss={false}
        >
          <IonContent>
            <ModalReceiptForm
              onClose={onCloseReceipt}
            />
          </IonContent>
        </IonModal>
        <IonModal
          isOpen={isOpenModalCategory.value}
          backdropDismiss={false}
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
