import { Component, createSignal } from "solid-js";
import { Card } from "@/presenter/ui/Card";
import { Flex, FormControl, FormLabel, Grid, GridItem, Spacer, Text } from "@hope-ui/solid";
import { FormDateField } from "@/presenter/ui/FormDateField";

export const AccountBalance: Component = () => {
  const [initValidity, setInitValidity] = createSignal<string>()
  const [endValidity, setendValidity] = createSignal<string>()

  const received = "0,00" //TODO: implementar saldo recebido
  const balance = "0,00" //TODO: implementar saldo restante

  return <Card>
    <Card.Header>
      <Flex
        direction="column"
        width="$full"
        alignItems="end"
      >
        <Flex
          width="$sm"
          gap="$2"
        >
          <FormControl class="flex gap-2" >
            <FormLabel>Inicio </FormLabel>
            <FormDateField
              size="sm"
              value={initValidity}
              setValue={setInitValidity}
            />
          </FormControl>

          <FormControl class="flex gap-2" >
            <FormLabel>Fim </FormLabel>
            <FormDateField
              size="sm"
              value={endValidity}
              setValue={setendValidity}
            />
          </FormControl>
        </Flex>
        <Grid
          templateColumns="repeat(2,1fr)"
          gap="$2"
          width="$full"
          padding="$2"
        >
          <GridItem>
            <Text size="sm">Recebido</Text>
            <Text size="xl">{received}</Text>
          </GridItem>
          <GridItem >
            <Text size="sm">Saldo</Text>
            <Text size="xl">{balance}</Text>
          </GridItem>
        </Grid>
      </Flex>
    </Card.Header>
  </Card>
}
