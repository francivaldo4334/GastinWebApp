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
    const barchartidmonth = `widget-bar-chart-calendar-select-month_${Math.random()}`
    const barchartidyear = `widget-bar-chart-calendar-select-year_${Math.random()}`
    return () => (
      <IonItem>
        <IonDatetimeButton
          slot="end"
          datetime={barchartidmonth}
          style={props.format === "month" ?
            "display: flex;"
            :
            "display: none;"
          }
        />
        <IonDatetimeButton
          slot="end"
          datetime={barchartidyear}
          style={props.format === "year" ?
            "display: flex;"
            :
            "display: none;"
          }
        />
        <IonModal keepContentsMounted>
          <IonDatetime
            id={barchartidmonth}
            presentation="month-year"
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
            id={barchartidyear}
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
