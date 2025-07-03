import { IonContent } from "@ionic/vue";
import { defineComponent } from "vue";
import { WidgetAccountBalance } from "./WidgetAccountBalance";

export const ChartWidgets = defineComponent({
  setup(){
    return()=>(<IonContent class="ion-padding">
      <WidgetAccountBalance/>
    </IonContent>)
  }
})
