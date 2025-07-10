import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, loadingController, toastController } from "@ionic/vue";
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
    },
    details: {
      type: Object,
      required: false,
    }
  },
  setup(props: {
    onClose: () => void;
    details?: CategoryDomainModel
  }) {
    const repo = FactoryRepositoryDomain.getRepository("category")
    const schema = z.object({
      title: z.string(),
      description: z.string(),
      color: z.string(),
    })
    const formControl = useForm({
      schema, default: {
        title: props.details?.title,
        description: props.details?.description,
        color: props.details?.color,
      }
    })

    const onAddCategory = async (
      data: z.output<typeof schema>
    ) => {
      const model = new CategoryDomainModel({
        title: data.title,
        description: data.description,
        color: data.color,
      })
      const toastError = await toastController.create({
        message: "Ocorreu um erro ao criar categoria",
        duration: 2000
      })
      const loading = await loadingController.create({
        message: "Criando..."
      })
      loading.present()
      const handler = async () => {
        if (props.details)
          await repo.edit(props.details.id, model)
        else
          await repo.set(model)
      }

      await handler().then(() => {
        props.onClose()
      }).catch(() => {
        toastError.present()
      }).finally(() => {
        loading.dismiss()
      })
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
              <IonTitle style={{ "text-align": "center" }}>
                Categoria
              </IonTitle>
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
