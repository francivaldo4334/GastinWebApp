import { IonContent } from "@ionic/vue";
import { defineComponent } from "vue";
import { WidgetAccountBalance } from "./WidgetAccountBalance";
import { WidgetPieChart } from "./WidgetPieChart";
import { WidgetBarChart } from "./WidgetBarChart";

export const ChartWidgets = defineComponent({
  setup() {
    return () => (<IonContent>
      <WidgetAccountBalance />
      <WidgetPieChart />
      <WidgetBarChart />
    </IonContent>)
  }
})
