import { ModalExpenditureForm } from "@/components/ModalExpenditureForm";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { RecordDomainModel } from "@/domain/models/RecordDomainModel";
import { formatMoney } from "@/utils/formatMoney";
import { IonBackButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/vue";
import { addOutline, chevronBackOutline, trashOutline } from "ionicons/icons";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  setup() {
    const isOpenModalExpenditure = ref(false)
    const expenditureDetails = ref()

    const repo = FactoryRepositoryDomain.getRepository("expenditure")
    const expenditures = ref<RecordDomainModel[]>([])

    const onCloseModalExpenditures = () => {
      isOpenModalExpenditure.value = false
    }
    const onCloseModalExpenditureDetails = () => {
      expenditureDetails.value = undefined
    }
    const onOpenModalExpenditure = () => {
      isOpenModalExpenditure.value = true
    }
    const onOpenModalExpenditureDetails = (data: any) => {
      expenditureDetails.value = data
    }

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
              <IonBackButton />
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
                      onOpenModalExpenditureDetails(it)
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
        <IonModal
          isOpen={isOpenModalExpenditure.value}
          backdropDismiss={false}
        >
          <IonContent>
            <ModalExpenditureForm
              onClose={onCloseModalExpenditures}
            />
          </IonContent>
        </IonModal>
        <IonModal
          isOpen={!!expenditureDetails.value}
        >
          <IonContent>
            <ModalExpenditureForm
              onClose={onCloseModalExpenditureDetails}
              details={expenditureDetails.value}
            />
          </IonContent>
        </IonModal>
      </IonPage>
    )
  }
})
