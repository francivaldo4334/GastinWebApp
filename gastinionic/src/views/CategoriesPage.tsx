import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { CategoryDomainModel } from "@/domain/models/CategoryDomainModel";
import { useModalStore } from "@/stores/useModalStore";
import { IonBackButton, IonBadge, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/vue";
import { addOutline, chevronBackOutline, trashOutline } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute()
    const repo = FactoryRepositoryDomain.getRepository("category")
    const categories = ref<CategoryDomainModel[]>([])

    const modalStore = useModalStore()
    const {
      chartDataLoaded,
    } = storeToRefs(modalStore)

    const {
      onOpenCategoryDetails: onOpenModalCategoryDetails,
      onOpenCategory: onOpenModalCategory,
      onLoadCharData,
    } = modalStore

    const loadList = async () => {
      const list = await repo.list()
      categories.value = list
    }

    const onRemoveCategory = async (id: number) => {
      await repo.delete(id)
      await loadList()
      onLoadCharData()
    }

    watch(chartDataLoaded, (it) => {
      loadList()
    })

    onMounted(async () => {
      loadList()
    })

    return () => (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              {
                route.path !== "/" &&
                <IonBackButton defaultHref="/" />
              }
            </IonButtons>
            <IonTitle>
              Categorias
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonFab slot="fixed" horizontal="end" vertical="bottom">
            <IonFabButton
              onClick={onOpenModalCategory}
            >
              <IonIcon
                icon={addOutline}
              />
            </IonFabButton>
          </IonFab>
          <IonList>
            {
              categories.value.map(it => (
                <IonItemSliding>
                  <IonItem
                    button
                    onClick={() => {
                      onOpenModalCategoryDetails(it)
                    }}
                  >
                    <IonBadge
                      slot="start"
                      style={`background-color: ${it.color}; height: 2rem; width: 2rem`}
                    > </IonBadge>
                    <IonLabel>
                      <IonText>
                        {it.title}
                      </IonText>
                      <p>
                        {it.description}
                      </p>
                    </IonLabel>
                    <IonIcon
                      icon={chevronBackOutline}
                    />
                  </IonItem>
                  <IonItemOptions slot="end">
                    <IonItemOption
                      color="danger"
                      onClick={() => onRemoveCategory(it.id)}
                    >
                      <IonIcon
                        icon={trashOutline}
                      />
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              ))
            }
          </IonList>
        </IonContent>
      </IonPage>
    )
  }
})
