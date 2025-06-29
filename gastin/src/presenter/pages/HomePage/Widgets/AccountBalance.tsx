import { Component, createSignal } from "solid-js";
import { Card } from "@/presenter/ui/Card";
import { Flex, Grid, GridItem, Text } from "@hope-ui/solid";
import { formatMoney } from "@/presenter/utils/formatMoney";
import { ValidityRange } from "@/presenter/ui/ValidityRange";

export const AccountBalance: Component = () => {
  const [initValidity, setInitValidity] = createSignal<string>()
  const [endValidity, setEndValidity] = createSignal<string>()

  const received = "0,00" //TODO: implementar saldo recebido
  const balance = "0,00" //TODO: implementar saldo restante

  return <Card>
    <Card.Header>
      <Text>Saldo em conta</Text>
    </Card.Header>
    <Flex
      direction="column"
      width="$full"
      alignItems="end"
    >
      <ValidityRange
        initValidity={initValidity}
        endValidity={endValidity}
        setInitValidity={setInitValidity}
        setEndValidity={setEndValidity}
      />
      <Grid
        templateColumns="repeat(2,1fr)"
        gap="$2"
        width="$full"
        padding="$2"
      >
        <GridItem class="opacity-70">
          <Text size="sm">Recebido</Text>
          <Text size="xl">{formatMoney(received)}</Text>
        </GridItem>
        <GridItem >
          <Text size="sm">Saldo</Text>
          <Text size="xl">{formatMoney(balance)}</Text>
        </GridItem>
      </Grid>
    </Flex>
  </Card>
}
