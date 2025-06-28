import { Component } from "solid-js";
import { Card } from "@/presenter/ui/Card";
import { Flex, IconButton, Spacer, Text } from "@hope-ui/solid";
import { MoreVertical } from "lucide-solid";

export const AccountBalance: Component = () => {
  const monthString = "29/01/2002 - 29/01/2002"
  return <Card>
    <Card.Header>
      <Flex> <Text size="sm">{monthString}</Text> </Flex>
      <Spacer />
      <IconButton
        aria-label="Show more options of account balance"
        icon={<MoreVertical />}
        variant="ghost"
        colorScheme="neutral"
        size="sm"
        onClick={() => { }}
      />
    </Card.Header>
  </Card>
}
