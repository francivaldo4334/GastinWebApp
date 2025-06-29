import { Component } from "solid-js";
import { Scaffold } from "../ui/Scaffold";
import { IconButton, Menu, MenuContent, MenuItem, MenuTrigger, Text } from "@hope-ui/solid";
import { Edit, ListChecks, MoreVertical, Plus, Trash2, Undo } from "lucide-solid";
import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import { useStore } from "../stores/Store";

export const ExpenditurePage: Component = () => {

  const { openNewExpenditure, openEditExpenditure } = useStore()

  const [expendituresSelected, setexpendituresSelected] = createSignal<number[]>([])

  const navigate = useNavigate()

  const expenditures: {
    id: number;
    title: string;
    description?: string;
    value: number;
  }[] = [
      {
        id: 1,
        title: "Teste",
        description: "teste",
        value: 100
      },
      {
        id: 2,
        title: "Teste2",
        description: "teste2",
        value: 100
      },
    ]//TODO: lista de despesas 

  const handlerExclude = () => {
    //TODO: implementar exclusão de despesa
  }

  return <Scaffold>
    <Scaffold.AppBar>
      <Scaffold.AppBar.Title>
        <IconButton
          icon={<Undo />}
          aria-label="to back bage"
          variant="ghost"
          colorScheme="neutral"
          marginRight="$8"
          onClick={() => navigate(-1)}
        />
        <Text>Despesas</Text>
      </Scaffold.AppBar.Title>
      <Scaffold.AppBar.Actions>
        <Menu>
          <MenuTrigger
            as={IconButton}
            icon={<MoreVertical />}
            aria-label="to back bage"
            variant="ghost"
            colorScheme="neutral"
          />
          <MenuContent>
            <MenuItem
              icon={<ListChecks />}
              onSelect={() => {
                setexpendituresSelected(expenditures.map(it => it.id))
              }}
            > Selecionar todo </MenuItem>
            <MenuItem
              icon={<Plus />}
              onSelect={openNewExpenditure}
            > Adicionar </MenuItem>
            <MenuItem
              icon={<Trash2 />}
              onSelect={handlerExclude}
            > Excluir </MenuItem>
            <MenuItem
              icon={<Edit />}
              onSelect={() => {
                const id = expendituresSelected()?.[0]
                if (!id) return;
                openEditExpenditure(id)
              }}
            > Editar </MenuItem>
          </MenuContent>
        </Menu>
      </Scaffold.AppBar.Actions>
    </Scaffold.AppBar>
  </Scaffold>
}
