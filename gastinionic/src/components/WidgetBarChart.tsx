import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonContent, IonDatetime, IonDatetimeButton, IonIcon, IonItem, IonModal, IonPopover, IonToolbar } from "@ionic/vue";
import { ellipsisVertical } from "ionicons/icons";
import { defineComponent, ref } from "vue";

export const WidgetBarChart = defineComponent({
  setup() {

    const isOpenMoreOptions = ref(false)

    const selectedFormat = ref<"month" | "year">("month")

    const mapPeriod = {
      "month": "Mês",
      "year": "Ano"
    }
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
                  onClick={() => (selectedFormat.value = "month")}
                >Mostar por mês</IonItem>
                <IonItem
                  button
                  onClick={() => (selectedFormat.value = "year")}
                >Mostar por ano</IonItem>
              </IonContent>
            </IonPopover>
          </IonButtons>
        </IonToolbar>
        <IonDatetimeButton
          datetime="widget-bar-chart-calendar-select"
        />
        <IonModal keepContentsMounted>
          <IonDatetime
            id="widget-bar-chart-calendar-select"
            presentation={selectedFormat.value}
          />
        </IonModal>
      </IonCard>
    )
  }
})


//   return <Card>
//     <Flex
//       direction="column"
//       gap="$2"
//       alignItems="end"
//       paddingTop="$2"
//     >
//       <Divider />
//       <Flex
//         width="$sm"
//       >
//         <Switch>
//           <Match when={typeRangeSelected("week")}>
//             <FormWeekField
//               value={week}
//               setValue={setWeek}
//             />
//           </Match>
//           <Match when={typeRangeSelected("month")}>
//             <FormMonthField
//               value={month}
//               setValue={setMonth}
//             />
//           </Match>
//           <Match when={typeRangeSelected("year")}>
//             <FormSelectField
//               items={years}
//               value={year}
//               setValue={setYear}
//             />
//           </Match>
//         </Switch>
//       </Flex>
//       <Divider />
//     </Flex>
//     <DefaultChart type="bar" data={data()} options={options} height={300} />
//   </Card>
// import { Card } from "@/presenter/ui/Card";
// import { Component, createMemo, createSelector, createSignal, Match, Switch } from "solid-js";
// import { DefaultChart } from 'solid-chartjs'
// import {
//   type ChartOptions,
// } from "chart.js";
// import { FormWeekField } from "@/presenter/ui/FormWeekField";
// import { Divider, Flex, IconButton, Menu, MenuContent, MenuItem, MenuTrigger, Spacer, Text } from "@hope-ui/solid";
// import { MoreVertical } from "lucide-solid";
// import { FormMonthField } from "@/presenter/ui/FormMonthField";
// import { FormSelectField } from "@/presenter/ui/FormSelectField";
//
// export const BarChart: Component = () => {
//
//   const [week, setWeek] = createSignal<string>()
//   const [month, setMonth] = createSignal<string>()
//   const [year, setYear] = createSignal<number>(0)
//
//   const [typeRange, setTypeRange] = createSignal<"week" | "month" | "year">("week")
//   const typeRangeSelected = createSelector(typeRange)
//
//   const years = [
//     { label: "2025", value: 2025 },
//     { label: "2024", value: 2024 },
//   ]//TODO: obter lista de anos no banco de dados
//
//   const metrics = [
//     { label: "Segunda", value: 150 },
//     { label: "Terça", value: 200 },
//     { label: "Quarta", value: 180 },
//     { label: "Quinta", value: 220 },
//     { label: "Sexta", value: 304 },
//     { label: "Sabado", value: 30 },
//     { label: "Domingo", value: 60 },
//   ]//TODO: implementar lista de metricas de periodo
//
//
//   const data = createMemo(() => {
//     return {
//       labels: metrics.map(it => it.label),
//       datasets: [
//         {
//           data: metrics.map(it => it.value),
//           backgroundColor: "#60a5fa",
//         }
//       ]
//     }
//   })
//   const options: ChartOptions<"bar"> = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//     },
//   };
//
// }
