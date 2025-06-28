import { useStore } from "@/presenter/stores/Store";
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from "@hope-ui/solid";
import { Component } from "solid-js";
import { Form } from "@/presenter/ui/Form"
import { SchemaNewCategory } from "./schema";
import { FormInputTypeColor } from "@/presenter/ui/FormInputTypeColor";

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
      <DrawerBody>
        <Form
          schema={SchemaNewCategory}
          onSubmit={(data) => { }}
          render={({ control }) => (
            <>
              <Form.Field
                control={control}
                name="title"
                render={FormInputTypeColor}
              />
            </>
          )}
        />
      </DrawerBody>
    </DrawerContent>
  </Drawer>
}
