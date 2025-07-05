import { IonDatetime, IonDatetimeButton, IonItem, IonModal } from "@ionic/vue";
import { defineComponent } from "vue";

export const WidgetSelectPeriod = defineComponent({
  props: {
    format: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    setValue: {
      type: Function,
      required: true,
    },
  },
  setup(props: {
    format: "month" | "year",
    value: string,
    setValue: (value: string) => void
  }) {
    return () => (
      <IonItem>
        <IonDatetimeButton
          slot="end"
          datetime="widget-bar-chart-calendar-select-month"
          style={props.format === "month" ?
            "display: flex;"
            :
            "display: none;"
          }
        />
        <IonDatetimeButton
          slot="end"
          datetime="widget-bar-chart-calendar-select-year"
          style={props.format === "year" ?
            "display: flex;"
            :
            "display: none;"
          }
        />
        <IonModal keepContentsMounted>
          <IonDatetime
            id="widget-bar-chart-calendar-select-month"
            presentation="month"
            value={props.value}
            onIonChange={e => {
              const value = e.detail.value
              if (typeof value != "string")
                return
              props.setValue(value)
            }}
          />
        </IonModal>
        <IonModal keepContentsMounted>
          <IonDatetime
            id="widget-bar-chart-calendar-select-year"
            presentation="year"
            value={props.value}
            onIonChange={e => {
              const value = e.detail.value
              if (typeof value != "string")
                return
              props.setValue(value)
            }}
          />
        </IonModal>
      </IonItem>
    )
  }
})
