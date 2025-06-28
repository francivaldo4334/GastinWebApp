import { useStore } from "@/presenter/stores/Store";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, VStack } from "@hope-ui/solid";
import { Component } from "solid-js";
import { Form } from "@/presenter/ui/Form"
import { SchemaNewCategory } from "./schema";
import { FormColorField } from "@/presenter/ui/FormColorField";
import { FormTextField } from "@/presenter/ui/FormTextField";

export const DrawerNewCategory: Component = () => {
  const { isOpenNewCategory, closeNewCategory } = useStore()
  return <Drawer
    opened={isOpenNewCategory()}
    onClose={closeNewCategory}
    placement="bottom"
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader>Nova Categoria</DrawerHeader>
      <Form
        schema={SchemaNewCategory}
        onSubmit={(data) => { }}
        render={({ control, onSubmit }) => (
          <>
            <DrawerBody>
              <VStack spacing="$4">
                <Form.Field
                  control={control}
                  name="title"
                  render={FormTextField}
                  label="Titulo"
                />
                <Form.Field
                  control={control}
                  name="description"
                  render={FormTextField}
                  label="Descrição"
                />
                <Form.Field
                  control={control}
                  name="color"
                  render={FormColorField}
                  label="Definir cor"
                />
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
