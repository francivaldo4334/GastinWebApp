import { Card } from "@/presenter/ui/Card";
import { Badge, Button, Divider, Flex, Text } from "@hope-ui/solid";
import { Minus, Plus } from "lucide-solid";
import { Component } from "solid-js";

export const Overview: Component = () => {

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
    >
      <Text width="$full" textAlign="start">Despesas</Text>
      <Text>R$ {expenditure}</Text>
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
      <Text>R$ {receipt}</Text>
    </Button>
  </Card>
}
