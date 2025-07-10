import { ChartWidgets } from "@/components/ChartWidgets";
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
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/vue";
import {
  pricetagOutline,
  helpCircleOutline,
  listOutline,
  chevronUpCircle,
  addCircleOutline,
  removeCircleOutline,
  fileTrayOutline,
  moonOutline,
} from "ionicons/icons"
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { App as CapacitorApp } from "@capacitor/app"
import { ThemeController } from "@/utils/themecontroller";

export default defineComponent({
  setup() {
    const themectl = new ThemeController()
    themectl.initializeTheme()
    const router = useRouter()
    const modalStore = useModalStore()

    const {
      onOpenReceipt,
      onOpenExpenditure,
      onOpenCategory,
      onOpenImportOfx,
    } = modalStore

    onMounted(() => {
      CapacitorApp.addListener("backButton", ({ canGoBack }) => {
        const currentRoute = router.currentRoute.value
        if (currentRoute.path === "/") {
          CapacitorApp.exitApp()
        }
        else if (canGoBack) {
          window.history.back()
        }
      })
    })

    return () => (
      <IonPage>
        <IonMenu contentId="home-page" side="end">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Mais opções</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonItem>
              <IonIcon
                icon={moonOutline}
                slot="start"
                aria-hidden
              />
              <IonToggle
                checked={themectl.theme === "dark"}
                onIonChange={()=>{
                  themectl.toggleTheme()
                  themectl.applyTheme(themectl.theme)
                }}
              >
                Modo escuro
              </IonToggle>
            </IonItem>
            <IonMenuToggle>
              <IonItem
                button
                onClick={onOpenCategory}
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
                button
                onClick={onOpenImportOfx}
              >
                <IonIcon
                  icon={fileTrayOutline}
                  slot="start"
                  aria-hidden
                />
                <IonLabel>
                  Importar Ofx
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
                  onClick={onOpenCategory}
                >
                  <IonIcon icon={pricetagOutline} />
                </IonFabButton>
              </IonFabList>
            </IonFab>
            <ChartWidgets />
          </IonContent>
        </IonPage>
      </IonPage>
    )
  }
})
