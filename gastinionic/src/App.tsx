import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => (
      <IonApp>
        <IonRouterOutlet />
      </IonApp>
    )
  }
})
