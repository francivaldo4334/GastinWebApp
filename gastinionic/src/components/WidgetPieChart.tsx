import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonModal, IonPopover, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/vue";
import { ellipsisVerticalOutline } from "ionicons/icons";
import { defineComponent, onMounted, ref } from "vue";
import { ModalCategoryForm } from "./ModalCategoryForm";
import { WidgetValidityRange } from "./WidgetValidityRange";

import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS, Title, Tooltip, ArcElement,
} from "chart.js";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";

ChartJS.register(Title, Tooltip, ArcElement);
export const WidgetPieChart = defineComponent({
  setup() {
    const repo = FactoryRepositoryDomain.getRepository("metrics")
    const isOpenMoreOptions = ref(false)
    const isOpenModalCategory = ref(false)
    const initValidity = ref()
    const endValidity = ref()


    const pieItems = ref<{
      label: string;
      value: number;
      color: string;
      percentage: number;
    }[]>([])

    onMounted(async () => {
      const pieData = await repo.pieChartData(
        new Date(initValidity.value),
        new Date(endValidity.value),
      )
      pieItems.value = pieData
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
            <IonIcon icon={ellipsisVerticalOutline} />
          </IonButton>
          <IonPopover
            isOpen={isOpenMoreOptions.value}
            trigger="widget-pie-chart-more-options"
          >
            <IonContent
              onClick={() => { isOpenMoreOptions.value = false }}
            >
              <IonItem
                button
                routerLink="/categories"
              >
                Ver Categorias
              </IonItem>
              <IonItem
                button
                onClick={() => {
                  isOpenModalCategory.value = true
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
      <IonModal
        isOpen={isOpenModalCategory.value}
      >
        <IonContent>
          <ModalCategoryForm
            onClose={() => {
              isOpenModalCategory.value = false
            }}
          />
        </IonContent>
      </IonModal>
    </IonCard>)
  }
})
