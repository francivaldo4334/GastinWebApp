import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonItem, IonLabel, IonRow } from "@ionic/vue";
import { defineComponent, onMounted, ref, watch } from "vue";
import { WidgetValidityRange } from "./WidgetValidityRange";
import { formatMoney } from "@/utils/formatMoney";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { useModalStore } from "@/stores/useModalStore";
import { storeToRefs } from "pinia";
import { endOfMonth, startOfMonth } from "date-fns";

export const WidgetAccountBalance = defineComponent({
  setup() {
    const repo = FactoryRepositoryDomain.getRepository("metrics")
    const dateNow = new Date()
    const initValidity = ref(startOfMonth(dateNow).toISOString())
    const endValidity = ref(endOfMonth(dateNow).toISOString())
    const receivedValue = ref(0)
    const spendValue = ref(0)
    const currentBalace = ref(0)

    const modalStore = useModalStore()

    const {
      isOpenReceipt,
      isOpenExpenditure,
    } = storeToRefs(modalStore)

    const loadData = async () => {
      const initDatestring = initValidity.value
      const endDatestring = endValidity.value

      if (!initValidity || !endDatestring)
        return

      const initDate = new Date(initDatestring)
      initDate.setHours(0, 0, 0, 0)

      const endDate = new Date(endDatestring)
      endDate.setHours(23, 59, 59, 0)

      const balance = await repo.accountBalance(
        initDate,
        endDate
      )
      receivedValue.value = balance.received
      spendValue.value = balance.spend
      currentBalace.value = balance.currentBalance
    }

    onMounted(() => {
      loadData()
    })

    watch([isOpenReceipt, isOpenExpenditure], ([receipt, expenditure]) => {
      if (!receipt || !expenditure)
        loadData()
    })
    watch([initValidity, endValidity], () => {
      loadData()
    })
    return () => (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>
            Saldo em conta
          </IonCardTitle>
        </IonCardHeader>
        <WidgetValidityRange
          initValidity={initValidity.value}
          setInitValidity={(it: string) => (initValidity.value = it)}
          endValidity={endValidity.value}
          setEndValidity={(it: string) => (endValidity.value = it)}
        />
        <IonGrid
          style="padding-bottom: 1.5rem;"
        >
          <IonRow>
            <IonCol
              style="padding: 0;"
            >
              <IonCard
                style="height: 100%;margin: 0;"
              >
                <IonItem
                  button
                  routerLink="/receipts"
                >
                  <IonLabel>
                    <IonCardSubtitle> Recebido </IonCardSubtitle>
                    <IonCardSubtitle color="dark"> R$ {formatMoney(String(receivedValue.value))} </IonCardSubtitle>
                  </IonLabel>
                </IonItem>
                <IonItem
                  button
                  routerLink="/expenditures"
                >
                  <IonLabel>
                    <IonCardSubtitle> Gasto </IonCardSubtitle>
                    <IonCardSubtitle color="dark"> R$ {formatMoney(String(spendValue.value))} </IonCardSubtitle>
                  </IonLabel>
                </IonItem>
              </IonCard>
            </IonCol>
            <IonCol
              style="padding: 0;"
            >
              <IonCard
                style="height: 100%;margin: 0;"
              >
                <IonCardHeader>
                  <IonCardSubtitle>
                    Saldo
                  </IonCardSubtitle>
                  <IonCardTitle
                    color={currentBalace.value === 0 ? "dark" : currentBalace.value > 0 ? "success" : "danger"}
                  >
                    R$ {
                      currentBalace.value >= 0 ?
                        formatMoney(String(currentBalace.value))
                        : `- ${formatMoney(String(currentBalace.value))}`
                    }
                  </IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCard>
    )
  }
})
