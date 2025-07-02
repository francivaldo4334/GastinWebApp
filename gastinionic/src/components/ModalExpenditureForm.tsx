import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonToolbar } from "@ionic/vue";
import { defineComponent, PropType, render } from "vue";
import { Form, FormField, FormFieldProps, useForm } from "./Form";
import { z } from "zod";

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
                <>
                  <IonInput />
                  {props.errorMessage}
                </>
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
