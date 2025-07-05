import { IonCard, IonCol, IonGrid, IonRow } from "@ionic/vue";
import { computed, defineComponent, onMounted, ref, watch } from "vue";

import {
  Chart as ChartJS,
  Title, Tooltip, BarElement, CategoryScale, LinearScale
} from "chart.js";
import { Bar } from "vue-chartjs";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { useModalStore } from "@/stores/useModalStore";
import { storeToRefs } from "pinia";
import { WidgetSelectPeriod } from "./WidgetSelectPeriod";
import { WidgetSelectPeriodFormat } from "./WidgetSelectPeriodFormat";

ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale);

export const WidgetBarChart = defineComponent({
  setup() {

    const repo = FactoryRepositoryDomain.getRepository("metrics")

    const selectedFormat = ref<"month" | "year">("month")
    const datenow = new Date().toISOString()
    const selectedDate = ref<string>(datenow)

    const metrics = ref<{ value: string; label: string; }[]>([])

    const modalStore = useModalStore()
    const {
      isOpenExpenditure,
    } = storeToRefs(modalStore)

    const mapPeriod = {
      "month": "Mês",
      "year": "Ano"
    }

    const loadData = async (params?: {
      date: string;
      mode: "month" | "year";
    }) => {
      const {
        date = selectedDate.value,
        mode = selectedFormat.value
      } = params || {}

      const periodValue = date

      if (!periodValue)
        return

      const data = await repo.barChartData({
        periodValue: new Date(periodValue),
        type: mode
      })

      metrics.value = data
    }

    onMounted(() => {
      loadData()
    })

    watch([selectedDate, selectedFormat, isOpenExpenditure], ([date, mode]) => {
      loadData({ date, mode })
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
        <WidgetSelectPeriodFormat
          title={`Evolução / ${mapPeriod[selectedFormat.value]}`}
          setFormat={(value: "month" | "year") => {
            selectedFormat.value = value;
            loadData()
          }}
        />
        <WidgetSelectPeriod
          format={selectedFormat.value}
          value={selectedDate.value}
          setValue={(value: string) => {
            selectedDate.value = value
            loadData()
          }}
        />
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
