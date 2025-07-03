import { ModalCategoryForm } from "@/components/ModalCategoryForm";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { CategoryDomainModel } from "@/domain/models/CategoryDomainModel";
import { IonBackButton, IonBadge, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonNote, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/vue";
import { addOutline, chevronBackOutline, trashOutline } from "ionicons/icons";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  setup() {
    const isOpenModalCategory = ref(false)
    const categoryDetails = ref()

    const repo = FactoryRepositoryDomain.getRepository("category")
    const categories = ref<CategoryDomainModel[]>([])

    const onCloseModalCategory = () => {
      isOpenModalCategory.value = false
    }
    const onCloseModalCategoryDetails = () => {
      categoryDetails.value = undefined
    }
    const onOpenModalCategory = () => {
      isOpenModalCategory.value = true
    }
    const onOpenModalCategoryDetails = (data: any) => {
      categoryDetails.value = data
    }

    const loadList = async () => {
      const list = await repo.list()
      categories.value = list
    }

    const onRemoveCategory = async (id:number) => {
      await repo.delete(id)
      await loadList()
    }

    watch(isOpenModalCategory, (isOpen) => {
      if (!isOpen) {
        loadList()
      }
    })
    watch(categoryDetails, (it) => {
      if (!it) {
        loadList()
      }
    })

    onMounted(async () => {
      loadList()
    })

    return () => (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
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
                      onClick={()=>onRemoveCategory(it.id)}
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
        <IonModal
          isOpen={!!categoryDetails.value}
        >
          <IonContent>
            <ModalCategoryForm
              onClose={onCloseModalCategoryDetails}
              details={categoryDetails.value}
            />
          </IonContent>
        </IonModal>
      </IonPage>
    )
  }
})
