import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/vue";
import { defineComponent } from "vue";
import { WidgetValidityRange } from "./WidgetValidityRange";

export const WidgetAccountBalance = defineComponent({
  setup() {
    return () => (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>
            Saldo em conta
          </IonCardTitle>
        </IonCardHeader>
        <WidgetValidityRange />
        <IonCardContent>
        </IonCardContent>
      </IonCard>
    )
  }
})


// const [initValidity, setInitValidity] = createSignal<string>()
// const [endValidity, setEndValidity] = createSignal<string>()
//
// const received = "0,00" //TODO: implementar saldo recebido
// const balance = "0,00" //TODO: implementar saldo restante
//
// return <Card>
//   <Card.Header>
//     <Text></Text>
//   </Card.Header>
//   <Flex
//     direction="column"
//     width="$full"
//     alignItems="end"
//   >
//     <ValidityRange
//       initValidity={initValidity}
//       endValidity={endValidity}
//       setInitValidity={setInitValidity}
//       setEndValidity={setEndValidity}
//     />
//     <Grid
//       templateColumns="repeat(2,1fr)"
//       gap="$2"
//       width="$full"
//       padding="$2"
//     >
//       <GridItem class="opacity-70">
//         <Text size="sm">Recebido</Text>
//         <Text size="xl">R$ {formatMoney(received)}</Text>
//       </GridItem>
//       <GridItem >
//         <Text size="sm">Saldo</Text>
//         <Text size="xl">R$ {formatMoney(balance)}</Text>
//       </GridItem>
//     </Grid>
//   </Flex>
// </Card>
