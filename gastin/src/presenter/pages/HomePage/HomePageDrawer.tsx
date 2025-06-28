import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Switch, Text, useColorMode } from "@hope-ui/solid";
import { Accessor, Component } from "solid-js";

export const HomePageDrawer: Component<{
  isOpen: Accessor<boolean>;
  onClose: () => void;
}> = (props) => {
  const { toggleColorMode, colorMode } = useColorMode()
  return <Drawer
    opened={props.isOpen()}
    placement="right"
    onClose={props.onClose}
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader />
      <DrawerBody >

        <Switch
          size="lg"
          labelPlacement="end"
          w="$full"
          class="*:w-full"
          onChange={toggleColorMode}
          checked={colorMode() === 'dark'}
        > Modo Escuro </Switch>
      </DrawerBody>
    </DrawerContent>
  </Drawer>
}
