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
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const isOpenModalCategory = ref(false)
    const {
      isOpenReceipt:isOpenModalReceipt,
      isOpenExpenditure: isOpenModalExpenditure,
      onCloseReceipt:onCloseModalReceipt,
      onOpenReceipt:onOpenModalReceipt,
      onCloseExpenditure:onCloseModalExpenditure,
      onOpenExpenditure:onOpenModalExpenditure,
    } = useModalStore()

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
                onClick={onOpenModalExpenditure}
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
                onClick={onOpenModalReceipt}
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
                  onClick={onOpenModalExpenditure}
                >
                  <IonIcon icon={removeCircleOutline} />
                </IonFabButton>
                <IonFabButton
                  onClick={onOpenModalReceipt}
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
            <ChartWidgets/>
          </IonContent>
        </IonPage>
        <IonModal
          isOpen={isOpenModalExpenditure}
          backdropDismiss={false}
        >
          <IonContent>
            <ModalExpenditureForm
              onClose={onCloseModalExpenditure}
            />
          </IonContent>
        </IonModal>
        <IonModal
          isOpen={isOpenModalReceipt}
          backdropDismiss={false}
        >
          <IonContent>
            <ModalReceiptForm
              onClose={onCloseModalReceipt}
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
