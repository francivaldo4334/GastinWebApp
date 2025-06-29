import { Component, createMemo, For } from "solid-js";
import { Scaffold } from "../ui/Scaffold";
import { Flex, IconButton, List, ListItem, Menu, MenuContent, MenuItem, MenuTrigger, Spacer, Text } from "@hope-ui/solid";
import { Edit, ListChecks, MoreVertical, Plus, Trash2, Undo } from "lucide-solid";
import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import { useStore } from "../stores/Store";
import { FormCheckboxField } from "../ui/FormCheckboxField";
import { formatMoney } from "../utils/formatMoney";

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
        Despesas
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
    <Scaffold.Body>
      <List>
        <For each={expenditures}>
          {item => {
            const selected = createMemo(() => {

              return expendituresSelected().includes(item.id)
            })
            return (
              <ListItem
                padding="$4"
                class="flex items-center gap-3"
              >
                <Flex
                  direction="column"
                >
                  <Text>{item.title}</Text>
                  <Text size="sm">{item.description}</Text>
                </Flex>
                <Spacer />
                <Text>R$ {formatMoney(String(item.value))}</Text>
                <FormCheckboxField
                  value={selected}
                  setValue={() => {
                    if (selected()) {
                      setexpendituresSelected(prev => {
                        const list: number[] = prev
                        return list.filter(it => it != item.id)
                      })
                      return
                    }
                    setexpendituresSelected(prev => {
                      return [...prev, item.id]
                    })
                  }}
                />
              </ListItem>
            )
          }}
        </For>
      </List>
    </Scaffold.Body>
  </Scaffold>
}
