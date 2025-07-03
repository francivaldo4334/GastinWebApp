import { IonButton, IonButtons, IonContent, IonHeader, IonToolbar } from "@ionic/vue";
import { defineComponent } from "vue";
import { Form, FormField, FormFieldProps, useForm } from "./Form";
import { z } from "zod";
import { FormTextField } from "./FormTextField";
import { FormColorField } from "./FormColorField";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { CategoryDomainModel } from "@/domain/models/CategoryDomainModel";

export const ModalCategoryForm = defineComponent({
  props: {
    onClose: {
      type: Function,
      required: true
    }
  },
  setup(props: {
    onClose: () => void;
  }) {
    const repo = FactoryRepositoryDomain.getRepository("category")
    const schema = z.object({
      title: z.string(),
      description: z.string(),
      color: z.string(),
    })
    const formControl = useForm({ schema })

    const onAddCategory = async (
      data: z.output<typeof schema>
    ) => {
      await repo.set(new CategoryDomainModel({
        title: data.title,
        description: data.description,
        color: data.color,
      }))
      props.onClose()
    }
    return () => (
      <IonContent>
        <Form
          control={formControl}
          onSubmit={onAddCategory}
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
              name="title"
              render={(props: FormFieldProps<string>) => (
                <FormTextField
                  {...props}
                  label="Título"
                  placeholder="Título da categoria"
                />
              )}
            />
            <FormField
              control={formControl}
              name="description"
              render={(props: FormFieldProps<string>) => (
                <FormTextField
                  {...props}
                  label="Descrição:"
                  placeholder="Descrição"
                />
              )}
            />
            <FormField
              control={formControl}
              name="color"
              render={(props: FormFieldProps<string>) => (
                <FormColorField
                  {...props}
                  label="Color:"
                />
              )}
            />
          </div>
        </Form>
      </IonContent>
    )
  }
})
