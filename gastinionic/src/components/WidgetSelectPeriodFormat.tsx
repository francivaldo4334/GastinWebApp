import { IonButton, IonButtons, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonItem, IonPopover, IonToolbar } from "@ionic/vue";
import { ellipsisVertical } from "ionicons/icons";
import { ref } from "vue";
import { defineComponent } from "vue";

export const WidgetSelectPeriodFormat = defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    setFormat: {
      type: Function,
      required: true,
    }
  },
  setup(props: {
    title: string;
    setFormat: (value: "month" | "year") => void
  }) {
    const isOpenMoreOptions = ref(false)
    const datebuttonId = `widgetselectperiodformat-more-options_${Math.random()}`
    return () => (
      <IonToolbar>
        <IonCardHeader>
          <IonCardTitle>{props.title}</IonCardTitle>
        </IonCardHeader>
        <IonButtons slot="end">
          <IonButton
            id={datebuttonId}
            onClick={() => {
              isOpenMoreOptions.value = true
            }}
          >
            <IonIcon
              icon={ellipsisVertical}
            />
          </IonButton>
          <IonPopover
            trigger={datebuttonId}
            isOpen={isOpenMoreOptions.value}
          >
            <IonContent
              onClick={() => {
                isOpenMoreOptions.value = false
              }}
            >
              <IonItem
                button
                onClick={() => {
                  props.setFormat("month")
                }}
              >Mostar por mês</IonItem>
              <IonItem
                button
                onClick={() => {
                  props.setFormat("year")
                }}
              >Mostar por ano</IonItem>
            </IonContent>
          </IonPopover>
        </IonButtons>
      </IonToolbar>
    )
  }
})
