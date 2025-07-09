import { IonButton, IonButtons, IonContent, IonHeader, IonToolbar } from "@ionic/vue";
import { defineComponent } from "vue";
import { Form, FormField, FormFieldProps, useForm } from "./Form";
import { z } from "zod";
import { FormFileOfxField } from "./FormFileOfxField";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";

export const ModalImportOfxForm = defineComponent({
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
    const repo = FactoryRepositoryDomain.getRepository("importdata")
    const schema = z.object({
      file: z.custom<File>()
    })
    const formControl = useForm({ schema })
    const onImportOfx = (data: z.output<typeof schema>) => {
      repo.getOfxToBeCreated(data.file).then(console.log)
    }
    return () => (
      <IonContent>
        <Form
          control={formControl}
          onSubmit={onImportOfx}
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
