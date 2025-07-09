import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonText, IonToolbar } from "@ionic/vue";
import { defineComponent, reactive, ref } from "vue";
import { Form, FormField, FormFieldProps, useForm } from "./Form";
import { record, z } from "zod";
import { FormFileOfxField } from "./FormFileOfxField";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { RecordDomainModel } from "@/domain/models/RecordDomainModel";
import { CategoryDomainModel } from "@/domain/models/CategoryDomainModel";
import { formatMoney } from "@/utils/formatMoney";
import { FormColorField } from "./FormColorField";

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
    const categoriesToBeCreated = ref<CategoryDomainModel[]>([])
    const recordsToBeCreated = reactive({
      count: 0,
      items: [] as RecordDomainModel[]
    })
    const repo = FactoryRepositoryDomain.getRepository("importdata")
    const schema = z.object({
      uploadfile: z.custom<File>()
    })
    const formControl = useForm({ schema })
    const onImportOfx = async (data: z.output<typeof schema>) => {
      await repo.importOfx({
        categoriesToBeCreated: categoriesToBeCreated.value,
        file: data.uploadfile
      })
      props.onClose()
    }

    const onLoadOfxData = async (ofxfile: File) => {
      const result = await repo.getOfxToBeCreated(ofxfile)
      categoriesToBeCreated.value = result.categoriesToBeCreated
      recordsToBeCreated.count = result.createToBeRecords.filter(it => !it).length
      recordsToBeCreated.items = result.createToBeRecords.filter(it => !!it)
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
              name="uploadfile"
              render={(props: FormFieldProps<File>) => (
                <FormFileOfxField
                  {...props}
                  setValue={(file: File) => {
                    props.setValue(file)
                    onLoadOfxData(file)
                  }}
                  label="Arquivo Ofx"
                />
              )}
            />
            <IonList>
              {
                !!recordsToBeCreated.count &&
                <IonListHeader>{recordsToBeCreated.count}
                  Registros já foram inseridos anteriormente
                </IonListHeader>
              }
              <IonListHeader>
                Categorias que vão ser criadas
              </IonListHeader>
              {
                categoriesToBeCreated.value.map(it => (
                  <IonItem>
                    {it.title}
                    <FormColorField
                      value={it.color}
                      setValue={(value: string) => {
                        const othercategories = categoriesToBeCreated.value.filter(i => i.title !== it.title)
                        const newItem = it
                        newItem.color = value
                        categoriesToBeCreated.value = [
                          ...othercategories,
                          newItem
                        ]
                      }}
                    />
                  </IonItem>
                ))
              }
              <IonListHeader>
                Registros que vão ser criados
              </IonListHeader>
              {
                recordsToBeCreated.items.map(it => (
                  <IonItem>
                    <IonLabel>
                      <IonText color={it.value > 0 ? "success" : "danger"}>
                        {it.value < 0 && "-"}
                        {formatMoney(String(it.value))}
                      </IonText>
                      <p>
                        {it.description}
                      </p>
                    </IonLabel>
                  </IonItem>
                ))
              }
            </IonList>
          </div>
        </Form>
      </IonContent>
    )
  }
})
