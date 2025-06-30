import { useStore } from "@/presenter/stores/Store"
import { Form } from "@/presenter/ui/Form"
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  Spacer,
  VStack
} from "@hope-ui/solid"
import { Component, createEffect } from "solid-js"
import { SchemaEditReceipt } from "./schema"
import { FormMonetaryValueField } from "@/presenter/ui/FormMonetaryValueField"
import { FormOptionalTextField } from "@/presenter/ui/FormOptionalTextField"
import { FormSwitchField } from "@/presenter/ui/FormSwithField"
import { FormDateField } from "@/presenter/ui/FormDateField"
import { createMemo } from "solid-js"
import { FormSelectField } from "@/presenter/ui/FormSelectField"
import { createStore } from "solid-js/store"
import { RecordDomainModel } from "@/domain/models/RecordDomainModel"
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain"
import { formatMoney } from "@/presenter/utils/formatMoney"
import { Show } from "solid-js"

export const DrawerEditReceipt: Component = () => {

  const categoryRepo = FactoryRepositoryDomain.getRepository("category")
  const repo = FactoryRepositoryDomain.getRepository("receipt")

  const {
    isOpenEditReceipt,
    closeEditReceipt,
    receiptDetailId,
  } = useStore()

  const [details, setDetails] = createStore<{
    success: boolean;
    model?: RecordDomainModel
  }>({
    success: false,
  })

  const [categories, setCategories] = createStore<{ value: number; label: string; }[]>([])

  createEffect(async () => {
    if (!isOpenEditReceipt()) {
      return
    }
    const it = await repo.get(receiptDetailId())
    setDetails({
      success: true,
      model: it
    })
  })

  createEffect(async () => {
    if (!isOpenEditReceipt()) return
    const list = await categoryRepo.list()
    setCategories(list.map(it => ({
      value: it.id,
      label: it.title,
    })))
  })

  const isOpenDrawer = createMemo(() => {
    return isOpenEditReceipt() && !!details.success
  })

  const handlerClose = () => {
    closeEditReceipt()
    setDetails("success", false)
  }

  return <Drawer
    opened={isOpenDrawer()}
    onClose={handlerClose}
    placement="bottom"
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader>Editar Receita</DrawerHeader>
      <Show
        when={details.success}
      >
        <Form
          default={{
            value: formatMoney(String(details.model!.value)),
            description: details.model!.description,
            category: details.model!.categoryId,
            isRecurrent: details.model!.isRecurrent,
            isEveryDays: details.model!.isEveryDays,
            initValidity: details.model!.initValidity,
            endValidity: details.model!.endValidity,
          }}
          schema={SchemaEditReceipt}
          onSubmit={(data) => {
            repo.edit(receiptDetailId(), new RecordDomainModel({
              value: data.value,
              description: data.description,
              categoryId: data.category,
              isRecurrent: data.isRecurrent,
              isEveryDays: data.isEveryDays,
              initValidity: data.initValidity,
              endValidity: data.endValidity,
            })).then(it => {
              handlerClose()
            })
          }}
          render={({ control, onSubmit }) => {
            const [fields,] = control.store

            const disableValidity = createMemo(() => {
              return !(fields.isRecurrent && !fields.isEveryDays)
            })

            const disableIsEveryDaysField = createMemo(() => {
              return !fields.isRecurrent
            })

            return (
              <>
                <DrawerBody>
                  <VStack spacing="$4">
                    <Form.Field
                      control={control}
                      name="value"
                      render={FormMonetaryValueField}
                      label="Valor em centavos"
                    />
                    <Form.Field
                      control={control}
                      name="description"
                      render={FormOptionalTextField}
                      label="Descrição"
                    />
                    <Form.Field
                      control={control}
                      name="category"
                      render={props => (
                        <FormSelectField
                          {...props}
                          items={categories}
                          placeholder="Selecione uma categoria"
                        />
                      )}
                      label="Categoria"
                    />
                    <Form.Field
                      control={control}
                      name="isRecurrent"
                      render={props => (
                        <FormSwitchField {...props}>
                          Recorrência:
                        </FormSwitchField>
                      )}
                    />

                    <Form.Field
                      control={control}
                      name="isEveryDays"
                      render={props => (
                        <FormSwitchField {...props}>
                          Todos os dias:
                        </FormSwitchField>
                      )}
                      isDisabled={disableIsEveryDaysField()}
                    />
                    <Grid
                      templateColumns="repeat(2, 1fr)"
                      width="$full"
                      gap="$4"
                    >
                      <GridItem>
                        <Form.Field
                          control={control}
                          name="initValidity"
                          label="Início da vigência"
                          render={FormDateField}
                          isDisabled={disableValidity()}
                        />
                      </GridItem>
                      <GridItem>
                        <Form.Field
                          control={control}
                          name="initValidity"
                          label="Fim da vigência"
                          render={FormDateField}
                          isDisabled={disableValidity()}
                        />
                      </GridItem>
                    </Grid>
                    <Spacer height="$4" />
                  </VStack>
                </DrawerBody >
                <DrawerFooter>
                  <Button
                    onClick={onSubmit}
                  >Salvar</Button>
                </DrawerFooter>
              </>
            )
          }}
        />
      </Show>
    </DrawerContent>
  </Drawer >
}
