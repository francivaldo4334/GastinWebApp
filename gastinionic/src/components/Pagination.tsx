import { IonButton, IonButtons, IonLabel, IonRow } from "@ionic/vue";
import { computed, defineComponent } from "vue";

export const Pagination = defineComponent({
  props: {
    page: {
      type: Number,
      required: true,
    },
    setPage: {
      type: Function,
      required: true,
    },
    countItems: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    }
  },
  setup(props: {
    page: number;
    countItems: number;
    perPage: number;
    setPage: (value: number) => void;
  }) {
    const totalPage = computed(() => Math.ceil(props.countItems / props.perPage))
    return () => (
      <>
        <IonRow
          class="ion-justify-content-between ion-padding"
          style={{ "padding-bottom": "4rem" }}
        >
          <IonButtons>
            <IonButton
              disabled={props.page <= 1}
              onClick={() => {
                props.setPage(props.page - 1)
              }}
            >
              Anterior
            </IonButton>
          </IonButtons>
          <IonLabel>Página {props.page} de {totalPage.value}</IonLabel>
          <IonButtons>
            <IonButton
              disabled={props.page >= totalPage.value}
              onClick={() => {
                props.setPage(props.page + 1)
              }}
            >
              Próximo
            </IonButton>
          </IonButtons>
        </IonRow>
      </>
    )
  }
})
