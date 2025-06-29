import { useStore } from "@/presenter/stores/Store";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, VStack } from "@hope-ui/solid";
import { Component, createEffect, createMemo, onMount, Show } from "solid-js";
import { Form } from "@/presenter/ui/Form"
import { SchemaEditCategory } from "./schema";
import { FormColorField } from "@/presenter/ui/FormColorField";
import { FormTextField } from "@/presenter/ui/FormTextField";
import { FormOptionalTextField } from "@/presenter/ui/FormOptionalTextField";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { CategoryDomainModel } from "@/domain/models/CategoryDomainModel";
import { createStore } from "solid-js/store";

export const DrawerEditCategory: Component = () => {

  const repo = FactoryRepositoryDomain.getRepository("category")
  const [details, setDetails] = createStore<{
    success: boolean;
    model?: CategoryDomainModel
  }>({
    success: false,
  })

  const {
    isOpenEditCategory,
    closeEditCategory,
    categoryDetailId,
  } = useStore()

  createEffect(async () => {
    if (!isOpenEditCategory()) {
      return
    }
    const it = await repo.get(categoryDetailId())
    setDetails({
      success: true,
      model: it
    })
  })

  const isOpenDrawer = createMemo(() => {
    return isOpenEditCategory()
  })

  const handlerClose = () => {
    setDetails("success", false)
    closeEditCategory()
  }

  return <Drawer
    opened={isOpenDrawer()}
    onClose={handlerClose}
    placement="bottom"
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader>Editar Categoria</DrawerHeader>
      <Show
        when={details.success}
      >
        <Form
          schema={SchemaEditCategory}
          onSubmit={(data) => {
            repo.edit(categoryDetailId(), details.model!).then(it => {
              handlerClose()
            })
          }}
          default={details.model}
          render={({ control, onSubmit }) => (
            <>
              <DrawerBody>
                <VStack spacing="$4">
                  <Form.Field
                    control={control}
                    name="title"
                    render={FormTextField}
                    label="Titulo"
                  />
                  <Form.Field
                    control={control}
                    name="description"
                    render={FormOptionalTextField}
                    label="Descrição"
                  />
                  <Form.Field
                    control={control}
                    name="color"
                    render={FormColorField}
                    label="Definir cor"
                  />
                </VStack>
              </DrawerBody>
              <DrawerFooter>
                <Button
                  onClick={onSubmit}
                >Salvar</Button>
              </DrawerFooter>
            </>
          )}
        />
      </Show>
    </DrawerContent>
  </Drawer>
}
