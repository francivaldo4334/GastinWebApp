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
import { Component, createEffect, createSignal } from "solid-js"
import { SchemaNewReceipt } from "./schema"
import { FormMonetaryValueField } from "@/presenter/ui/FormMonetaryValueField"
import { FormOptionalTextField } from "@/presenter/ui/FormOptionalTextField"
import { FormSwitchField } from "@/presenter/ui/FormSwithField"
import { FormDateField } from "@/presenter/ui/FormDateField"
import { createMemo } from "solid-js"
import { FormSelectField } from "@/presenter/ui/FormSelectField"
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain"
import { RecordDomainModel } from "@/domain/models/RecordDomainModel"

export const DrawerNewReceipt: Component = () => {

  const categoryRepo = FactoryRepositoryDomain.getRepository("category")
  const repo = FactoryRepositoryDomain.getRepository("receipt")

  const [categories, setCategories] = createSignal<{ value: number; label: string; }[]>([])

  const { isOpenNewReceipt, closeNewReceipt } = useStore()

  createEffect(async () => {
    if (!isOpenNewReceipt()) return
    const list = await categoryRepo.list()
    setCategories(list.map(it => ({
      value: it.id,
      label: it.title,
    })))
  })

  return <Drawer
    opened={isOpenNewReceipt()}
    onClose={closeNewReceipt}
    placement="bottom"
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader>Nova Receita</DrawerHeader>
      <Form
        default={{
          value: "0,00",
        }}
        schema={SchemaNewReceipt}
        onSubmit={(data) => {
          repo.set(new RecordDomainModel({
            value: data.value,
            description: data.description,
            categoryId: data.category,
            isRecurrent: data.isRecurrent,
            isEveryDays: data.isEveryDays,
            initValidity: data.initValidity,
            endValidity: data.endValidity,
          })).then(it => {
            closeNewReceipt()
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
                        items={categories()}
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
    </DrawerContent>
  </Drawer >
}
