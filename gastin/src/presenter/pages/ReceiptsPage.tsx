import { Component, createMemo, For } from "solid-js";
import { Scaffold } from "../ui/Scaffold";
import { createDisclosure, Flex, IconButton, List, ListItem, Menu, MenuContent, MenuItem, MenuTrigger, Spacer, Text } from "@hope-ui/solid";
import { Edit, ListChecks, MoreVertical, Plus, Trash2, Undo } from "lucide-solid";
import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import { useStore } from "../stores/Store";
import { FormCheckboxField } from "../ui/FormCheckboxField";
import { formatMoney } from "../utils/formatMoney";
import { ModalConfirm } from "../ui/ModalConfirm";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { RecordDomainModel } from "@/domain/models/RecordDomainModel";

export const ReceiptsPage: Component = () => {

  const repo = FactoryRepositoryDomain.getRepository("receipt")

  const { isOpen, onOpen, onClose } = createDisclosure()

  const { openNewReceipt, openEditReceipt } = useStore()

  const [receiptsSelected, setReciptsSelected] = createSignal<number[]>([])
  const [receipts, setRecipts] = createSignal<RecordDomainModel[]>([])

  const navigate = useNavigate()

  const handlerExclude = async () => {
    await Promise.all(receiptsSelected().map(it => repo.delete(it)))
    const list = await repo.list()
    setRecipts(list)
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
        Receitas
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
                setReciptsSelected(receipts().map(it => it.id))
              }}
            > Selecionar todo </MenuItem>
            <MenuItem
              icon={<Plus />}
              onSelect={openNewReceipt}
            > Adicionar </MenuItem>
            <MenuItem
              icon={<Trash2 />}
              onSelect={onOpen}
            > Excluir </MenuItem>
            <MenuItem
              icon={<Edit />}
              onSelect={() => {
                const id = receiptsSelected()?.[0]
                if (!id) return;
                openEditReceipt(id)
              }}
            > Editar </MenuItem>
          </MenuContent>
        </Menu>
      </Scaffold.AppBar.Actions>
    </Scaffold.AppBar>
    <Scaffold.Body>
      <List>
        <For each={receipts()}>
          {item => {
            const selected = createMemo(() => {

              return receiptsSelected().includes(item.id)
            })
            return (
              <ListItem
                padding="$4"
                class="flex items-center gap-3"
              >
                <Flex
                  direction="column"
                >
                  <Text size="sm">{item.description}</Text>
                </Flex>
                <Spacer />
                <Text>R$ {formatMoney(String(item.value))}</Text>
                <FormCheckboxField
                  value={selected}
                  setValue={() => {
                    if (selected()) {
                      setReciptsSelected(prev => {
                        const list: number[] = prev
                        return list.filter(it => it != item.id)
                      })
                      return
                    }
                    setReciptsSelected(prev => {
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
      message="Deseja excluir o(s) lançamento(s)?"
      onConfirm={handlerExclude}
    />
  </Scaffold>
}
