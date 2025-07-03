import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonModal, IonPopover, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/vue";
import { ellipsisVerticalOutline } from "ionicons/icons";
import { defineComponent, ref } from "vue";
import { ModalCategoryForm } from "./ModalCategoryForm";
import { WidgetValidityRange } from "./WidgetValidityRange";

import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS, Title, Tooltip, ArcElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, ArcElement);
export const WidgetPieChart = defineComponent({
  setup() {
    const isOpenMoreOptions = ref(false)
    const isOpenModalCategory = ref(false)
    const initValidity = ref()
    const endValidity = ref()


    const pieItems = [
      { label: "Gastos", value: 45, color: "#f87171", percentage: 45 },
      { label: "Ganhos", value: 30, color: "#34d399", percentage: 30 },
      { label: "Poupança", value: 25, color: "#60a5fa", percentage: 25 },
    ]

    const chartData = () => ({
      labels: pieItems.map(it => it.label),
      datasets: [{
        data: pieItems.map(it => it.value),
        backgroundColor: pieItems.map(it => it.color),
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
              {pieItems.map(item => (
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

//   return <Card>
//     <Grid
//       templateColumns="repeat(2,1fr)"
//       gap="$4"
//       width="$full"
//       marginTop="$4"
//     >
//       <GridItem>
//         <DefaultChart
//           type="pie"
//           data={chartData()}
//           options={{
//             responsive: true,
//             maintainAspectRatio: false,
//           }}
//         />
//       </GridItem>
//       <GridItem>
//         <List>
//           <For
//             each={pieItems}
//           >
//             {item => (
//               <ListItem
//                 class="flex w-full justify-between h-10"
//               >
//                 <Badge bgColor={item.color} boxSize="$6" />
//                 <Text>{item.label}</Text>
//                 <Text>{item.percentage} %</Text>
//               </ListItem>
//             )}
//           </For>
//         </List>
//       </GridItem>
//     </Grid>
//   </Card>
// }


// import { Component, createMemo, createSignal, For } from "solid-js"
// import { DefaultChart } from 'solid-chartjs'
// import { Card } from "@/presenter/ui/Card"
// import { Badge, Grid, GridItem, IconButton, List, ListItem, Menu, MenuContent, MenuItem, MenuTrigger, Spacer, Text } from "@hope-ui/solid"
// import { MoreVertical, List as ListIcon, Tag } from "lucide-solid"
// import { ValidityRange } from "@/presenter/ui/ValidityRange"
// import { useStore } from "@/presenter/stores/Store"
// import { useNavigate } from "@solidjs/router"
//
// export const PieChart: Component = () => {
//
//   const [initValidity, setInitValidity] = createSignal<string>()
//   const [endValidity, setEndValidity] = createSignal<string>()
//
//   const navigate = useNavigate()
//
//   const { openNewCategory } = useStore()
//
//   const pieItems = [
//     {
//       label: "Gastos",
//       value: 45,
//       color: "#f87171",
//       percentage: 45,
//     },
//     {
//       label: "Ganhos",
//       value: 30,
//       color: "#34d399",
//       percentage: 30,
//     },
//     {
//       label: "Poupança",
//       value: 25,
//       color: "#60a5fa",
//       percentage: 25,
//     },
//   ]
//
//   const chartData = createMemo(() => {
//     return {
//       labels: pieItems.map(it => it.label),
//       datasets: [
//         {
//           data: pieItems.map(it => it.value),
//           backgroundColor: pieItems.map(it => it.color),
//         }
//       ]
//     }
//   })
//
