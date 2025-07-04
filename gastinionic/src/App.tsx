import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { Providers } from "./providers";
import AppLayout from '@/layouts/AppLayout';

export default defineComponent({
  setup() {
    return () => (
      <Providers>
        <IonApp>
          <AppLayout>
            <IonRouterOutlet />
          </AppLayout>
        </IonApp>
      </Providers>
    )
  }
})
