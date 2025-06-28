import { useStore } from "@/presenter/stores/Store";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Switch,
  Button,
  useColorMode,
  Text,
} from "@hope-ui/solid";
import { CircleQuestionMark, Minus, Plus, Tag } from "lucide-solid";
import { Accessor, Component } from "solid-js";

export const HomePageDrawer: Component<{
  isOpen: Accessor<boolean>;
  onClose: () => void;
}> = (props) => {
  const { toggleColorMode, colorMode } = useColorMode()
  const { openNewCategory, openNewExpenditure } = useStore()
  return <Drawer
    opened={props.isOpen()}
    placement="right"
    onClose={props.onClose}
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader />
      <DrawerBody class="*:h-12 *:w-full">
        <Switch
          size="lg"
          w="$full"
          class="*:w-full"
          onChange={toggleColorMode}
          checked={colorMode() === 'dark'}
        > Modo Escuro </Switch>
        <Button
          leftIcon={<Tag />}
          variant="ghost"
          colorScheme="neutral"
          size="lg"
          padding="$1"
          onClick={() => {
            props.onClose()
            openNewCategory()
          }}
        >
          <Text
            class="w-full"
            textAlign="start"
          >Adicionar Categoria</Text>
        </Button>
        <Button
          leftIcon={<Minus />}
          variant="ghost"
          colorScheme="neutral"
          size="lg"
          padding="$1"
          onClick={() => {
            props.onClose()
            openNewExpenditure()
          }}
        >
          <Text
            class="w-full"
            textAlign="start"
          >Adicionar Despesa</Text>
        </Button>
        <Button
          leftIcon={<Plus />}
          variant="ghost"
          colorScheme="neutral"
          size="lg"
          padding="$1"
        >
          <Text
            class="w-full"
            textAlign="start"
          >Adicionar Receita</Text>
        </Button>
        <Button
          leftIcon={<CircleQuestionMark />}
          variant="ghost"
          colorScheme="neutral"
          size="lg"
          padding="$1"
        >
          <Text
            class="w-full"
            textAlign="start"
          >Como funciona?</Text>
        </Button>
      </DrawerBody>
    </DrawerContent>
  </Drawer>
}
