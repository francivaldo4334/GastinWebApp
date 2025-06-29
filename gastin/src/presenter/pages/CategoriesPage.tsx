import { Component, createMemo, createSignal, For } from "solid-js";
import { Scaffold } from "../ui/Scaffold";
import { Edit, ListChecks, MoreVertical, Plus, Trash2, Undo } from "lucide-solid";
import { Badge, Flex, IconButton, List, ListItem, Menu, MenuContent, MenuItem, MenuTrigger, Spacer, Text } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";
import { FormCheckboxField } from "../ui/FormCheckboxField";
import { useStore } from "../stores/Store";

export const CategoriesPage: Component = () => {

  const navigate = useNavigate()

  const [categoriesSelected, setCategoriesSelected] = createSignal<number[]>([])

  const { openNewCategory, openEditCategory } = useStore()

  const categories: {
    id: number;
    title: string;
    description?: string;
    color: string;
  }[] = [
      {
        id: 1,
        title: "Teste",
        description: "teste",
        color: "#ff00ff"
      },
      {
        id: 2,
        title: "Teste2",
        description: "teste2",
        color: "#ff00ff"
      },
    ]//TODO: lista de categorias

  const handlerExclude = () => {
    //TODO: implementar exclusão de categoria
  }

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
        <Menu>
          <MenuTrigger
            as={IconButton}
            icon={<MoreVertical />}
            colorScheme="neutral"
            variant="ghost"
            aria-label="More options"
          />
          <MenuContent>
            <MenuItem
              icon={<ListChecks />}
              onSelect={() => {
                setCategoriesSelected(categories.map(it => it.id))
              }}
            > Selecionar todo </MenuItem>
            <MenuItem
              icon={<Plus />}
              onSelect={openNewCategory}
            > Adicionar </MenuItem>
            <MenuItem
              icon={<Trash2 />}
              onSelect={handlerExclude}
            > Excluir </MenuItem>
            <MenuItem
              icon={<Edit />}
              onSelect={() => {
                const id = categoriesSelected()?.[0]
                if (!id) return;
                openEditCategory(id)
              }}
            > Editar </MenuItem>
          </MenuContent>
        </Menu>
      </Scaffold.AppBar.Actions>
    </Scaffold.AppBar>
    <Scaffold.Body>
      <List>
        <For each={categories}>
          {item => {
            const selected = createMemo(() => {
              return categoriesSelected().includes(item.id)
            })
            return (
              <ListItem
                padding="$4"
                class="flex items-center gap-3"
              >
                <Badge
                  boxSize="$8"
                  bgColor={item.color}
                />
                <Flex
                  direction="column"
                >
                  <Text>{item.title}</Text>
                  <Text size="sm">{item.description}</Text>
                </Flex>
                <Spacer />
                <FormCheckboxField
                  value={selected}
                  setValue={() => {
                    if (selected()) {
                      setCategoriesSelected(prev => {
                        const list: number[] = prev
                        return list.filter(it => it != item.id)
                      })
                      return
                    }
                    setCategoriesSelected(prev => {
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
  </Scaffold >
}
