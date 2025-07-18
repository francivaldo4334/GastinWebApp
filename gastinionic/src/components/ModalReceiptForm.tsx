import { defineComponent, onMounted, ref, watch } from "vue";
import { z } from "zod";
import { Form, FormField, FormFieldProps, useForm } from "./Form";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, loadingController, toastController } from "@ionic/vue";
import { FormMoneyField } from "./FormMoneyField";
import { FormTextField } from "./FormTextField";
import { FormSelectField } from "./FormSelectField";
import { FormCheckboxField } from "./FormCheckboxField";
import { FieldValidRangeField } from "./FieldValidRangeField";
import { schemaRecord } from "./commons";
import { RecordDomainModel } from "@/domain/models/RecordDomainModel";

export const ModalReceiptForm = defineComponent({
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
    details?: RecordDomainModel
  }) {

    const details = props.details || {
      date: new Date().toISOString()
    }

    const formControl = useForm({ schema: schemaRecord, default: details })

    const repoCategory = FactoryRepositoryDomain.getRepository("category")
    const repo = FactoryRepositoryDomain.getRepository("receipt")

    const categories = ref<{ value: number; label: string; }[]>([])

    const onAddReceipt = async (data: z.output<typeof schemaRecord>) => {
      const model = new RecordDomainModel({
        value: data.value,
        description: data.description,
        categoryId: data.category,
        isRecurrent: data.isRecurrent,
        isEveryDays: data.isEveryday,
        initValidity: data.initValidity,
        endValidity: data.endValidity,
        date: data.date,
      })
      const handler = async () => {
        if (props.details)
          await repo.edit(props.details.id, model)
        else
          await repo.set(model)
      }
      const toastError = await toastController.create({
        message: "Ocorreu um erro ao carregar os dados",
        duration: 2000
      })

      const loading = await loadingController.create({
        message: "Criando..."
      })

      loading.present()

      handler().then(() => {
        props.onClose()
      }).catch(() => {
        toastError.present()
      }).finally(() => {
        loading.dismiss()
      })
    }

    onMounted(async () => {
      const list = await repoCategory.list()
      categories.value = list.map(it => ({
        value: it.id,
        label: it.title
      }))

      if (details instanceof RecordDomainModel) {
        formControl.fields.category = details.categoryId
      }
    })

    return () => (
      <IonContent>
        <Form
          control={formControl}
          onSubmit={onAddReceipt}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start" >
                <IonButton color="danger" onClick={props.onClose}>Cancelar</IonButton>
              </IonButtons>
              <IonTitle style={{ "text-align": "center" }}>
                Receita
              </IonTitle>
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
              name="date"
              render={(props: FormFieldProps<string>) => (
                <FieldValidRangeField
                  {...props}
                  label="Data do lançamento:"
                  disabled={formControl.fields.isRecurrent}
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
                  label="Todo dia:"
                  disabled={!formControl.fields.isRecurrent}
                />
              )}
            />
            <FormField
              control={formControl}
              name="isEveryday"
              render={(props: FormFieldProps<boolean>) => (
                <FormCheckboxField
                  {...props}
                  value={!props.value}
                  setValue={(b: boolean) => props.setValue(!b)}
                  label="Todo mês:"
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
                    formControl.fields.isRecurrent
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
                    formControl.fields.isRecurrent
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
