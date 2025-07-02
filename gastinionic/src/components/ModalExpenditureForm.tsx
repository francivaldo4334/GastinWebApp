import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonToolbar } from "@ionic/vue";
import { defineComponent, PropType, render } from "vue";
import { Form, FormField, FormFieldProps, useForm } from "./Form";
import { z } from "zod";
import { FormTextField } from "./FormTextField";

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
      <>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={props.onClose}>Cancelar</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <Form
            control={formControl}
            onSubmit={() => {
            }}
          >
            <FormField
              control={formControl}
              name="text"
              render={(props: FormFieldProps<string>) => (
                  <FormTextField
                    {...props}
                    label="Nome"
                  />
              )}
            />
            <IonButton
              type="submit"
            >ok</IonButton>
          </Form>
        </IonContent>
      </>
    )
  }
})
