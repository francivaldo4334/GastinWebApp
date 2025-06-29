import { Card } from "@/presenter/ui/Card";
import { formatMoney } from "@/presenter/utils/formatMoney";
import { Badge, Button, Divider, Text } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";
import { Minus, Plus } from "lucide-solid";
import { Component } from "solid-js";


export const Overview: Component = () => {

  const navigate = useNavigate()

  const expenditure = "0,00" //TODO: implementar toais de despesas
  const receipt = "0,00"//TODO: implementar totais de receitas


  return <Card>
    <Card.Header>
      <Text>Visão geral</Text>
    </Card.Header>
    <Divider height="$3" />
    <Button
      variant="ghost"
      width="$full"
      colorScheme="neutral"
      padding="$1"
      leftIcon={
        <Badge colorScheme="danger">
          <Minus />
        </Badge>
      }
      onClick={() => navigate("/expenditures")}
    >
      <Text width="$full" textAlign="start">Despesas</Text>
      <Text>R$ {formatMoney(expenditure)}</Text>
    </Button>

    <Button
      variant="ghost"
      width="$full"
      colorScheme="neutral"
      padding="$1"
      leftIcon={
        <Badge colorScheme="success">
          <Plus />
        </Badge>
      }
    >
      <Text width="$full" textAlign="start">Receitas</Text>
      <Text>R$ {formatMoney(receipt)}</Text>
    </Button>
  </Card>
}
