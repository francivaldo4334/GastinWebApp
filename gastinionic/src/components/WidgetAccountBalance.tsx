import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonItem, IonLabel, IonRow } from "@ionic/vue";
import { defineComponent, onMounted, ref } from "vue";
import { WidgetValidityRange } from "./WidgetValidityRange";
import { formatMoney } from "@/utils/formatMoney";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";

export const WidgetAccountBalance = defineComponent({
  setup() {
    const repo = FactoryRepositoryDomain.getRepository("metrics")
    const initValidity = ref()
    const endValidity = ref()
    const receivedValue = ref(0)
    const spendValue = ref(0)
    const currentBalace = ref(0)
    onMounted(async () => {
      const initDatestring = initValidity.value
      const endDatestring = endValidity.value
      const balance = await repo.accountBalance(
        new Date(initDatestring.value),
        new Date(endDatestring.value)
      )
      receivedValue.value = balance.received
      spendValue.value = balance.spend
      currentBalace.value = balance.currentBalance
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
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard
                style="height: 100%;"
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
            <IonCol>
              <IonCard
                style="height: 100%;"
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
