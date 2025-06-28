import { useStore } from "@/presenter/stores/Store"
import { Form } from "@/presenter/ui/Form"
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, VStack } from "@hope-ui/solid"
import { Component } from "solid-js"
import { SchemaNewExpenditure } from "./schema"

export const DrawerNewExpenditure: Component = () => {
  const { isOpenNewExpenditure, closeNewExpenditure } = useStore()
  return <Drawer
    opened={isOpenNewExpenditure()}
    onClose={closeNewExpenditure}
    placement="bottom"
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader>Nova Despesa</DrawerHeader>
      <Form
        schema={SchemaNewExpenditure}
        onSubmit={(data) => {
          //TODO:implementar criação de categoria
        }}
        render={({ control, onSubmit }) => (
          <>
            <DrawerBody>
              <VStack spacing="$4">
                {/* <Form.Field */}
                {/*   control={control} */}
                {/*   name="title" */}
                {/*   render={FormTextField} */}
                {/*   label="Titulo" */}
                {/* /> */}
                {/* <Form.Field */}
                {/*   control={control} */}
                {/*   name="description" */}
                {/*   render={FormOptionalTextField} */}
                {/*   label="Descrição" */}
                {/* /> */}
                {/* <Form.Field */}
                {/*   control={control} */}
                {/*   name="color" */}
                {/*   render={FormColorField} */}
                {/*   label="Definir cor" */}
                {/* /> */}
              </VStack>
            </DrawerBody>
            <DrawerFooter>
              <Button
                onClick={onSubmit}
              >Salvar</Button>
            </DrawerFooter>
          </>
        )}
      />
    </DrawerContent>
  </Drawer>
}
