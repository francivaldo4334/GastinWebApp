import { IonButton, IonButtons, IonContent, IonHeader, IonList, IonToolbar } from "@ionic/vue";
import { defineComponent } from "vue";
import { Form, FormField, FormFieldProps, useForm } from "./Form";
import { z } from "zod";
import { FormTextField } from "./FormTextField";
import { FormMoneyField } from "./FormMoneyField";

export const ModalExpenditureForm = defineComponent({
  props: {
    onClose: {
      type: Function,
      required: true
    }
  },
  setup(props: any) {
    const formControl = useForm({
      schema: z.object({
        text: z.string()
      }),
    })
    return () => (
      <IonContent>
        <Form
          control={formControl}
          onSubmit={() => {
          }}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start" >
                <IonButton color="danger" onClick={props.onClose}>Cancelar</IonButton>
              </IonButtons>
              <IonButtons slot="end" >
                <IonButton color="success" type="submit">Adicionar</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <div class="ion-padding">
            <FormField
              control={formControl}
              name="text"
              render={(props: FormFieldProps<string>) => (
                <FormMoneyField
                  {...props}
                  label="Valor R$:"
                />
              )}
            />
            <FormField
              control={formControl}
              name="text"
              render={(props: FormFieldProps<string>) => (
                <FormTextField
                  {...props}
                  label="Nome:"
                />
              )}
            />
          </div>
        </Form>
      </IonContent>
    )
  }
})
