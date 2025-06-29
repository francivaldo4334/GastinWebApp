import { useStore } from "@/presenter/stores/Store";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, VStack } from "@hope-ui/solid";
import { Component, createSignal, onMount, Show } from "solid-js";
import { Form } from "@/presenter/ui/Form"
import { SchemaEditCategory } from "./schema";
import { FormColorField } from "@/presenter/ui/FormColorField";
import { FormTextField } from "@/presenter/ui/FormTextField";
import { FormOptionalTextField } from "@/presenter/ui/FormOptionalTextField";
import { FactoryRepositoryDomain } from "@/domain/FactoryRepositoryDomain";
import { CategoryDomainModel } from "@/domain/models/CategoryDomainModel";

export const DrawerEditCategory: Component = () => {

  const repo = FactoryRepositoryDomain.getRepository("category")
  const [details, setDetails] = createSignal<CategoryDomainModel>()

  const {
    isOpenEditCategory,
    closeEditCategory,
    categoryDetailId,
  } = useStore()

  onMount(async () => {
    const it = await repo.get(categoryDetailId())
    setDetails(it)
  })


  return <Drawer
    opened={isOpenEditCategory()}
    onClose={closeEditCategory}
    placement="bottom"
  >
    <DrawerOverlay />
    <Show
      when={!!details()}
    >
      <DrawerContent>
        <DrawerHeader>Editar Categoria</DrawerHeader>
        <Form
          schema={SchemaEditCategory}
          onSubmit={(data) => {
            repo.edit(categoryDetailId(), details()!)
          }}
          default={details()}
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
      </DrawerContent>
    </Show>
  </Drawer>
}
