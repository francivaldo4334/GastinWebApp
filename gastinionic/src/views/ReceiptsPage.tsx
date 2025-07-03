import { ModalReceiptForm } from "@/components/ModalReceiptForm";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { RecordDomainModel } from "@/domain/models/RecordDomainModel";
import { formatMoney } from "@/utils/formatMoney";
import { IonBackButton, IonBadge, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonNote, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/vue";
import { addOutline, chevronBackOutline, trashOutline } from "ionicons/icons";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  setup() {
    const isOpenModalReceipt = ref(false)
    const receiptDetails = ref()

    const repo = FactoryRepositoryDomain.getRepository("receipt")
    const receipts = ref<RecordDomainModel[]>([])

    const onCloseModalReceipt = () => {
      isOpenModalReceipt.value = false
    }
    const onCloseModalReceiptDetails = () => {
      receiptDetails.value = undefined
    }
    const onOpenModalReceipt = () => {
      isOpenModalReceipt.value = true
    }
    const onOpenModalReceiptDetails = (data: any) => {
      receiptDetails.value = data
    }

    const loadList = async () => {
      const list = await repo.list()
      receipts.value = list
    }

    const onRemoveReceipt = async (id: number) => {
      await repo.delete(id)
      await loadList()
    }

    watch(isOpenModalReceipt, (isOpen) => {
      if (!isOpen) {
        loadList()
      }
    })
    watch(receiptDetails, (it) => {
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
              Receitas
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonFab slot="fixed" horizontal="end" vertical="bottom">
            <IonFabButton
              onClick={onOpenModalReceipt}
            >
              <IonIcon
                icon={addOutline}
              />
            </IonFabButton>
          </IonFab>
          <IonList>
            {
              receipts.value.map(it => (
                <IonItemSliding>
                  <IonItem
                    button
                    onClick={() => {
                      onOpenModalReceiptDetails(it)
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
                      onClick={() => onRemoveReceipt(it.id)}
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
          isOpen={isOpenModalReceipt.value}
          backdropDismiss={false}
        >
          <IonContent>
            <ModalReceiptForm
              onClose={onCloseModalReceipt}
            />
          </IonContent>
        </IonModal>
        <IonModal
          isOpen={!!receiptDetails.value}
        >
          <IonContent>
            <ModalReceiptForm
              onClose={onCloseModalReceiptDetails}
              details={receiptDetails.value}
            />
          </IonContent>
        </IonModal>
      </IonPage>
    )
  }
})
