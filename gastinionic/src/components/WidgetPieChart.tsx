import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonPopover, IonRow, IonText, IonToolbar } from "@ionic/vue";
import { ellipsisVertical, } from "ionicons/icons";
import { defineComponent, onMounted, ref, watch } from "vue";
import { WidgetValidityRange } from "./WidgetValidityRange";

import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS, Title, Tooltip, ArcElement,
} from "chart.js";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { useModalStore } from "@/stores/useModalStore";
import { endOfMonth, startOfMonth } from "date-fns";

ChartJS.register(Title, Tooltip, ArcElement);
export const WidgetPieChart = defineComponent({
  setup() {
    const repo = FactoryRepositoryDomain.getRepository("metrics")
    const isOpenMoreOptions = ref(false)
    const datenow = new Date()
    const initValidity = ref(startOfMonth(datenow).toISOString())
    const endValidity = ref(endOfMonth(datenow).toISOString())

    const {
      onOpenCategory
    } = useModalStore()


    const pieItems = ref<{
      label: string;
      value: number;
      color: string;
      percentage: number;
    }[]>([])

    const loadData = async (params?: {
      init: string,
      end: string,
    }) => {
      const initDatestring = initValidity.value
      const endDatestring = endValidity.value

      if (!initDatestring || !endDatestring) return

      const initDate = new Date(initDatestring)
      initDate.setHours(0, 0, 0, 0)

      const endDate = new Date(endDatestring)
      endDate.setHours(23, 59, 59, 0)

      const pieData = await repo.pieChartData(
        initDate,
        endDate,
      )

      pieItems.value = pieData
    }

    onMounted(() => {
      loadData({
        init: initValidity.value,
        end: endValidity.value
      })
    })
    watch([initValidity, endValidity], ([init, end]) => {
      loadData({ init, end })
    })

    const chartData = () => ({
      labels: pieItems.value.map(it => it.label),
      datasets: [{
        data: pieItems.value.map(it => it.value),
        backgroundColor: pieItems.value.map(it => it.color),
      }]
    })

    return () => (<IonCard>
      <IonToolbar>
        <IonCardHeader>
          <IonCardTitle>
            Despesas por categoria
          </IonCardTitle>
        </IonCardHeader>
        <IonButtons slot="end">
          <IonButton
            id="widget-pie-chart-more-options"
            onClick={() => { isOpenMoreOptions.value = true }}
          >
            <IonIcon icon={ellipsisVertical} />
          </IonButton>
          <IonPopover
            isOpen={isOpenMoreOptions.value}
            trigger="widget-pie-chart-more-options"
          >
            <IonContent >
              <IonItem
                button
                routerLink="/categories"
                onClick={() => { isOpenMoreOptions.value = false }}
              >
                Ver Categorias
              </IonItem>
              <IonItem
                button
                onClick={() => {
                  isOpenMoreOptions.value = false
                  onOpenCategory()
                }}
              >
                Adicionar categoria
              </IonItem>
            </IonContent>
          </IonPopover>
        </IonButtons>
      </IonToolbar>
      <WidgetValidityRange
        initValidity={initValidity.value}
        setInitValidity={(it: string) => (initValidity.value = it)}
        endValidity={endValidity.value}
        setEndValidity={(it: string) => (endValidity.value = it)}
      />
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <Pie
                data={chartData()}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'bottom' } }
                }}
              />
            </IonCol>
            <IonCol>
              {pieItems.value.map(item => (
                <IonItem
                  key={item.label}
                >
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: item.color,
                      borderRadius: '50%',
                      marginRight: '8px'
                    }}
                  />
                  <IonText style="flex:1">{item.label}</IonText>
                  <IonText>{item.percentage} %</IonText>
                </IonItem>
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>)
  }
})
