import { useStore } from "@/presenter/stores/Store";
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from "@hope-ui/solid";
import { Component } from "solid-js";

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
      </DrawerBody>
    </DrawerContent>
  </Drawer>
}
