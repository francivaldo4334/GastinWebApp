import { Component } from "solid-js";
import { Scaffold } from "../ui/Scaffold";
import { MoreVertical, Undo } from "lucide-solid";
import { IconButton } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";

export const CategoriesPage: Component = () => {

  const navigate = useNavigate()

  return <Scaffold>
    <Scaffold.AppBar>
      <Scaffold.AppBar.Title>
        <IconButton
          icon={<Undo />}
          colorScheme="neutral"
          variant="ghost"
          aria-label="More options"
          marginRight="$4"
          onClick={() => {
            navigate(-1)
          }}
        />
        Categorias
      </Scaffold.AppBar.Title>
      <Scaffold.AppBar.Actions>
        <IconButton
          icon={<MoreVertical />}
          colorScheme="neutral"
          variant="ghost"
          aria-label="More options"
        />
      </Scaffold.AppBar.Actions>
    </Scaffold.AppBar>
  </Scaffold>
}
