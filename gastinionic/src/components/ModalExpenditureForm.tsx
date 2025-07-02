import { IonButton, IonButtons, IonContent, IonHeader, IonList, IonToolbar } from "@ionic/vue";
import { defineComponent, onMounted, ref } from "vue";
import { Form, FormField, FormFieldProps, useForm } from "./Form";
import { z } from "zod";
import { FormTextField } from "./FormTextField";
import { FormMoneyField } from "./FormMoneyField";
import { CategoryDomainModel } from "@/domain/models/CategoryDomainModel";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { FormSelectField } from "./FormSelectField";
import { FormCheckboxField } from "./FormCheckboxField";
import { FieldValidRangeField } from "./FieldValidRangeField";

export const ModalExpenditureForm = defineComponent({
  props: {
    onClose: {
      type: Function,
      required: true
    }
  },
  setup(props: any) {

    const schema = z.object({
      value: z.coerce.number(),
      description: z.string(),
      category: z.coerce.number(),
      isRecurrent: z.boolean(),
      isEveryday: z.boolean(),
      initValidity: z.string().date(),
      endValidity: z.string().date(),
    })

    const formControl = useForm({ schema })

    const repo = FactoryRepositoryDomain.getRepository("category")

    const categories = ref<CategoryDomainModel[]>([])

    onMounted(async () => {
      const list = await repo.list()
      categories.value = list
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
              name="value"
              render={(props: FormFieldProps<string>) => (
                <FormMoneyField
                  {...props}
                  label="Valor R$:"
                  placeholder="Valor em centavos"
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
              name="category"
              render={(props: FormFieldProps<string>) => (
                <FormSelectField
                  {...props}
                  label="Categoria:"
                  items={categories.value}
                  placeholder="Selecione uma categoria"
                />
              )}
            />
            <FormField
              control={formControl}
              name="isRecurrent"
              render={(props: FormFieldProps<boolean>) => (
                <FormCheckboxField
                  {...props}
                  label="Recorrência:"
                />
              )}
            />
            <FormField
              control={formControl}
              name="isEveryday"
              render={(props: FormFieldProps<boolean>) => (
                <FormCheckboxField
                  {...props}
                  label="Diariamente:"
                  disabled={!formControl.fields.isRecurrent}
                />
              )}
            />
            <FormField
              control={formControl}
              name="initValidity"
              render={(props: FormFieldProps<string>) => (
                <FieldValidRangeField
                  {...props}
                  label="Início da Vigência:"
                  disabled={!(
                    formControl.fields.isRecurrent &&
                    formControl.fields.isEveryday
                  )}
                />
              )}
            />
            <FormField
              control={formControl}
              name="endValidity"
              render={(props: FormFieldProps<string>) => (
                <FieldValidRangeField
                  {...props}
                  label="Fim da Vigência:"
                  disabled={!(
                    formControl.fields.isRecurrent &&
                    formControl.fields.isEveryday
                  )}
                />
              )}
            />
          </div>
        </Form>
      </IonContent>
    )
  }
})
