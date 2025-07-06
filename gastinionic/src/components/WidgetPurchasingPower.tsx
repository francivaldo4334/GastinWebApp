import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/vue";
import { defineComponent, ref, watch } from "vue";
import { WidgetSelectPeriodFormat } from "./WidgetSelectPeriodFormat";
import { WidgetSelectPeriod } from "./WidgetSelectPeriod";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { onMounted } from "vue";
import { useModalStore } from "@/stores/useModalStore";
import { storeToRefs } from "pinia";

export const WidgetPurchasingPower = defineComponent({
  setup() {

    const repo = FactoryRepositoryDomain.getRepository("metrics")

    const selectedFormat = ref<"month" | "year">("month")
    const datenow = new Date().toISOString()
    const selectedDate = ref<string>(datenow)

    const metricValue = ref(0)

    const modalStore = useModalStore()

    const {
      chartDataLoaded,
    } = storeToRefs(modalStore)

    const mapPeriod = {
      "month": "Mês",
      "year": "Ano"
    }

    const loadData = async (params?: {
      type: "month" | "year",
      periodValue: Date;
    }) => {
      const {
        type = selectedFormat.value,
        periodValue = new Date(selectedDate.value)
      } = params || {}
      const data = await repo.purchasingPower({
        type, periodValue
      })
      if (data)
        metricValue.value = data
    }
    onMounted(() => {
      loadData()
    })
    watch([selectedFormat, selectedDate], ([format, dateString]) => {
      loadData({
        type: format,
        periodValue: new Date(dateString)
      })
    })
    watch(chartDataLoaded, () => {
      loadData()
    })
    return () => (
      <IonCard>
        <WidgetSelectPeriodFormat
          title={`Poder de compra / ${mapPeriod[selectedFormat.value]}`}
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
        <IonCard
          style="margin: 0;"
        >
          <IonCardHeader>
            <IonCardSubtitle>
              Aumento em comparação com o período anterior
            </IonCardSubtitle>
            <IonCardTitle >
              {metricValue.value} %
            </IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </IonCard>
    )
  }
})
