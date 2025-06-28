import { Component } from "solid-js";
import { createDisclosure, IconButton } from "@hope-ui/solid";
import { MoreVertical } from "lucide-solid";
import { Scaffold } from "@/presenter/ui/Scaffold";
import { HomePageDrawer } from "./HomePageDrawer";
export const HomePage: Component = () => {

  const {
    isOpen,
    onOpen,
    onClose,
  } = createDisclosure()
  return <>
    <Scaffold>
      <Scaffold.AppBar>
        <Scaffold.AppBar.Title>
          Tela Principal
        </Scaffold.AppBar.Title>
        <Scaffold.AppBar.Actions>
          <IconButton
            aria-label="Open menu to more options"
            onClick={onOpen}
            variant="ghost"
            colorScheme="neutral"
            icon={<MoreVertical />}
          />
          <HomePageDrawer
            isOpen={isOpen}
            onClose={onClose}
          />
        </Scaffold.AppBar.Actions>
      </Scaffold.AppBar>
    </Scaffold>
  </>
}
