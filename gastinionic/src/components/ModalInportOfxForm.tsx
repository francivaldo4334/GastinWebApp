import { IonButton, IonButtons, IonContent, IonHeader, IonToolbar } from "@ionic/vue";
import { defineComponent } from "vue";
import { Form, FormField, FormFieldProps, useForm } from "./Form";
import { z } from "zod";
import { FormFileOfxField } from "./FormFileOfxField";

export const ModalInportOfxForm = defineComponent({
  props: {
    onClose: {
      type: Function,
      required: true
    },
    details: {
      type: Object,
      required: false,
    }
  },
  setup(props: {
    onClose: () => void;
    details?: any
  }) {
    const formControl = useForm({
      schema: z.object({
        file: z.custom<File>()
      })
    })
    return () => (
      <IonContent>
        <Form>
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
              name="file"
              render={(props: FormFieldProps<File>) => (
                <FormFileOfxField
                  {...props}
                  label="Arquivo Ofx"
                />
              )}
            />
          </div>
        </Form>
      </IonContent>
    )
  }
})
