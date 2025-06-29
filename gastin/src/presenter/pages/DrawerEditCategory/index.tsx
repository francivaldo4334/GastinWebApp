import { useStore } from "@/presenter/stores/Store";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, VStack } from "@hope-ui/solid";
import { Component } from "solid-js";
import { Form } from "@/presenter/ui/Form"
import { SchemaEditCategory } from "./schema";
import { FormColorField } from "@/presenter/ui/FormColorField";
import { FormTextField } from "@/presenter/ui/FormTextField";
import { FormOptionalTextField } from "@/presenter/ui/FormOptionalTextField";

export const DrawerEditCategory: Component = () => {

  const {
    isOpenEditCategory,
    closeEditCategory,
    categoryDetailId,
  } = useStore()

  const details = {

  }//TODO: implementar chamado ao detalhes de categoria

  return <Drawer
    opened={isOpenEditCategory()}
    onClose={closeEditCategory}
    placement="bottom"
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader>Nova Categoria</DrawerHeader>
      <Form
        schema={SchemaEditCategory}
        onSubmit={(data) => {
          //TODO:implementar criação de categoria
        }}
        default={details}
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
                  render={FormOptionalTextField}
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
