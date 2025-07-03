import { ModalCategoryForm } from "@/components/ModalCategoryForm";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { CategoryDomainModel } from "@/domain/models/CategoryDomainModel";
import { IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonNote, IonPage, IonTitle, IonToolbar } from "@ionic/vue";
import { addOutline } from "ionicons/icons";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const isOpenModalCategory = ref(false)
    const repo = FactoryRepositoryDomain.getRepository("category")
    const categories = ref<CategoryDomainModel[]>([])

    const onCloseModalCategory = () => {
      isOpenModalCategory.value = false
    }
    const onOpenModalCategory = () => {
      isOpenModalCategory.value = true
    }

    onMounted(async () => {
      const list = await repo.list()
      categories.value = list
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
                <IonItem>
                  <IonLabel>
                    {it.title}
                  </IonLabel>
                  <IonNote>
                    {it.description}
                  </IonNote>
                </IonItem>
              ))
            }
          </IonList>
        </IonContent>
        <IonModal
          isOpen={isOpenModalCategory.value}
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
