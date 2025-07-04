import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { RecordDomainModel } from "@/domain/models/RecordDomainModel";
import { useModalStore } from "@/stores/useModalStore";
import { formatMoney } from "@/utils/formatMoney";
import { IonBackButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/vue";
import { addOutline, chevronBackOutline, trashOutline } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute()
    const expenditureDetails = ref()

    const repo = FactoryRepositoryDomain.getRepository("expenditure")
    const expenditures = ref<RecordDomainModel[]>([])
    const modalStore = useModalStore()
    const {
      isOpenExpenditure: isOpenModalExpenditure,
    } = storeToRefs(modalStore)

    const {
      onOpenExpenditure:onOpenModalExpenditure,
      onOpenExpenditureDetails,
    } = modalStore

    const loadList = async () => {
      const list = await repo.list()
      expenditures.value = list
    }

    const onRemoveExpenditure = async (id: number) => {
      await repo.delete(id)
      await loadList()
    }

    watch(isOpenModalExpenditure, (isOpen) => {
      if (!isOpen) {
        loadList()
      }
    })
    watch(expenditureDetails, (it) => {
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
              {
                route.path !== "/" &&
                <IonBackButton defaultHref="/" />
              }
            </IonButtons>
            <IonTitle>
              Despesas
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonFab slot="fixed" horizontal="end" vertical="bottom">
            <IonFabButton
              onClick={onOpenModalExpenditure}
            >
              <IonIcon
                icon={addOutline}
              />
            </IonFabButton>
          </IonFab>
          <IonList>
            {
              expenditures.value.map(it => (
                <IonItemSliding>
                  <IonItem
                    button
                    onClick={() => {
                      onOpenExpenditureDetails(it)
                    }}
                  >
                    <IonLabel>
                      <IonText>
                        {it.description}
                      </IonText>
                    </IonLabel>
                    <IonLabel slot="end">
                      R$ {formatMoney(String(it.value))}
                      <IonIcon
                        icon={chevronBackOutline}
                      />
                    </IonLabel>
                  </IonItem>
                  <IonItemOptions slot="end">
                    <IonItemOption
                      color="danger"
                      onClick={() => onRemoveExpenditure(it.id)}
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
