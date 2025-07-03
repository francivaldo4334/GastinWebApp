import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { CategoryDomainModel } from "@/domain/models/CategoryDomainModel";
import { IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToolbar } from "@ionic/vue";
import { addOutline } from "ionicons/icons";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const repo = FactoryRepositoryDomain.getRepository("category")
    const categories = ref<CategoryDomainModel[]>([])
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
            <IonFabButton>
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
      </IonPage>
    )
  }
})
