import { Component, createEffect, createMemo, createSignal, For, onMount } from "solid-js";
import { Scaffold } from "../ui/Scaffold";
import { Edit, ListChecks, MoreVertical, Plus, Trash2, Undo } from "lucide-solid";
import { Badge, createDisclosure, Flex, IconButton, List, ListItem, Menu, MenuContent, MenuItem, MenuTrigger, Spacer, Text } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";
import { FormCheckboxField } from "../ui/FormCheckboxField";
import { useStore } from "../stores/Store";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { ModalConfirm } from "../ui/ModalConfirm";

export const CategoriesPage: Component = () => {

  const repo = FactoryRepositoryDomain.getRepository("category")

  const navigate = useNavigate()

  const { isOpen, onOpen, onClose } = createDisclosure()

  const [categoriesSelected, setCategoriesSelected] = createSignal<number[]>([])
  const [categories, setCategories] = createSignal<{
    id: number;
    title: string;
    description?: string;
    color: string;
  }[]>([])

  const {
    openNewCategory,
    openEditCategory,
    isOpenNewCategory,
    isOpenEditCategory,
  } = useStore()

  const handlerExclude = async () => {
    await Promise.all(categoriesSelected().map(it => repo.delete(it)))
    const list = await repo.list()
    setCategories(list)
  }

  onMount(async () => {
    const list = await repo.list()
    setCategories(list)
  })

  createEffect(async () => {
    if (!isOpenNewCategory()) {
      const list = await repo.list()
      setCategories(list)
    }
  })
  createEffect(async () => {
    if (!isOpenEditCategory()) {
      const list = await repo.list()
      setCategories(list)
    }
  })

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
                setCategoriesSelected(categories().map(it => it.id))
              }}
            > Selecionar todo </MenuItem>
            <MenuItem
              icon={<Plus />}
              onSelect={openNewCategory}
            > Adicionar </MenuItem>
            <MenuItem
              icon={<Trash2 />}
              onSelect={() => {
                if (!categoriesSelected().length) return
                onOpen()
              }}
            > Excluir </MenuItem>
            <MenuItem
              icon={<Edit />}
              onSelect={() => {
                const id = categoriesSelected()?.[0]
                if (!id || categoriesSelected().length > 1) return;
                openEditCategory(id)
              }}
            > Editar </MenuItem>
          </MenuContent>
        </Menu>
      </Scaffold.AppBar.Actions>
    </Scaffold.AppBar>
    <Scaffold.Body>
      <List>
        <For each={categories()}>
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
    <ModalConfirm
      isOpen={isOpen}
      onClose={onClose}
      title="Atenção"
      message="Deseja excluir a categoria?"
      onConfirm={handlerExclude}
    />
  </Scaffold >
}
