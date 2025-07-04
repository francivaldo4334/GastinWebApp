import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonDatetime, IonDatetimeButton, IonGrid, IonIcon, IonItem, IonModal, IonPopover, IonRow, IonToolbar } from "@ionic/vue";
import { ellipsisVertical } from "ionicons/icons";
import { computed, defineComponent, onMounted, ref, watch } from "vue";

import {
  Chart as ChartJS,
  Title, Tooltip, BarElement, CategoryScale, LinearScale
} from "chart.js";
import { Bar } from "vue-chartjs";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";

ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale);

export const WidgetBarChart = defineComponent({
  setup() {

    const repo = FactoryRepositoryDomain.getRepository("metrics")

    const isOpenMoreOptions = ref(false)

    const selectedFormat = ref<"month" | "year">("month")

    const datenow = new Date().toISOString()

    const selectedMonth = ref<string>(datenow)
    const selectedYear = ref<string>(datenow)
    const metrics = ref<{ value: number; label: string; }[]>([])

    const mapPeriod = {
      "month": "Mês",
      "year": "Ano"
    }

    const loadData = async () => {
      const periodValue = (() => {
        if (selectedMonth.value === "month")
          return selectedMonth.value
        else return selectedYear.value
      })()
      if (!periodValue)
        return
      const data = await repo.barChartData({
        periodValue: new Date(periodValue),
        type: selectedFormat.value
      })
      metrics.value = data
    }

    onMounted(() => {
      loadData()
    })

    watch([selectedYear, selectedMonth, selectedFormat], () => {
      loadData()
    })


    const chartData = computed(() => ({
      labels: metrics.value.map(it => it.label),
      datasets: [
        {
          data: metrics.value.map(it => it.value),
          backgroundColor: "#60a5fa",
        },
      ],
    }));
    return () => (
      <IonCard>
        <IonToolbar>
          <IonCardHeader>
            <IonCardTitle>Evolução / {mapPeriod[selectedFormat.value]}</IonCardTitle>
          </IonCardHeader>
          <IonButtons slot="end">
            <IonButton
              id="widget-bar-chart-more-options"
              onClick={() => {
                isOpenMoreOptions.value = true
              }}
            >
              <IonIcon
                icon={ellipsisVertical}
              />
            </IonButton>
            <IonPopover
              trigger="widget-bar-chart-more-options"
              isOpen={isOpenMoreOptions.value}
            >
              <IonContent
                onClick={() => {
                  isOpenMoreOptions.value = false
                }}
              >
                <IonItem
                  button
                  onClick={() => {
                    selectedFormat.value = "month"
                    loadData()
                  }}
                >Mostar por mês</IonItem>
                <IonItem
                  button
                  onClick={() => {
                    selectedFormat.value = "year"
                    loadData()
                  }}
                >Mostar por ano</IonItem>
              </IonContent>
            </IonPopover>
          </IonButtons>
        </IonToolbar>
        <IonItem>
          <IonDatetimeButton
            slot="end"
            datetime="widget-bar-chart-calendar-select-month"
            style={selectedFormat.value === "month" ?
              "display: flex;"
              :
              "display: none;"
            }
          />
          <IonDatetimeButton
            slot="end"
            datetime="widget-bar-chart-calendar-select-year"
            style={selectedFormat.value === "year" ?
              "display: flex;"
              :
              "display: none;"
            }
          />
          <IonModal keepContentsMounted>
            <IonDatetime
              id="widget-bar-chart-calendar-select-month"
              presentation="month"
              value={selectedMonth.value}
              onIonChange={e => {
                const value = e.detail.value
                if (typeof value != "string")
                  return
                selectedMonth.value = value
                loadData()
              }}
            />
          </IonModal>
          <IonModal keepContentsMounted>
            <IonDatetime
              id="widget-bar-chart-calendar-select-year"
              presentation="year"
              value={selectedYear.value}
              onIonChange={e => {
                const value = e.detail.value
                if (typeof value != "string")
                  return
                selectedYear.value = value
                loadData()
              }}
            />
          </IonModal>
        </IonItem>

        <IonGrid>
          <IonRow>
            <IonCol>
              <Bar
                data={chartData.value}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    y: { beginAtZero: true },
                  },
                }}
                height={150}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCard>
    )
  }
})
