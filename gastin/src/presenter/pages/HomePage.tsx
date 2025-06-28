import { Component } from "solid-js";
import { Scaffold } from "../ui/Scaffold";
import { IconButton } from "@hope-ui/solid";
import { Menu } from "lucide-solid";
export const HomePage: Component = () => {
  return <>
    <Scaffold>
      <Scaffold.AppBar>
        <Scaffold.AppBar.Title>
          Menu
        </Scaffold.AppBar.Title>
        <Scaffold.AppBar.Actions>
          <IconButton
            aria-label="Open menu to more options"
            onClick={() => { }}
            variant="ghost"
            colorScheme="neutral"
            icon={<Menu />}
          />
        </Scaffold.AppBar.Actions>
      </Scaffold.AppBar>
    </Scaffold>
  </>
}
