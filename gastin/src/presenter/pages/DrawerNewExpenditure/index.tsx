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
import { Component } from "solid-js"
import { SchemaNewExpenditure } from "./schema"
import { FormMonetaryValueField } from "@/presenter/ui/FormMonetaryValueField"
import { FormOptionalTextField } from "@/presenter/ui/FormOptionalTextField"
import { FormSwitchField } from "@/presenter/ui/FormSwithField"
import { FormDateField } from "@/presenter/ui/FormDateField"
import { createMemo } from "solid-js"
import { FormSelectField } from "@/presenter/ui/FormSelectField"

export const DrawerNewExpenditure: Component = () => {

  const { isOpenNewExpenditure, closeNewExpenditure } = useStore()

  const categories = [
    {
      value: 1,
      label: "Categoria 1"
    },
    {
      value: 2,
      label: "Categoria 2"
    },
  ]//TODO: realizar chamado para listar categorias

  return <Drawer
    opened={isOpenNewExpenditure()}
    onClose={closeNewExpenditure}
    placement="bottom"
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader>Nova Despesa</DrawerHeader>
      <Form
        default={{
          value: "0,00",
        }}
        schema={SchemaNewExpenditure}
        onSubmit={(data) => {
          //TODO:implementar criação de despesa 
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
    </DrawerContent>
  </Drawer >
}
