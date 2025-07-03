import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { Providers } from "./providers";

export default defineComponent({
  setup() {
    return () => (
      <Providers>
        <IonApp>
          <IonRouterOutlet />
        </IonApp>
      </Providers>
    )
  }
})
