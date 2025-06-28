import { Component, createMemo, For } from "solid-js"
import { DefaultChart } from 'solid-chartjs'
import { Card } from "@/presenter/ui/Card"
import { Badge, Grid, GridItem, IconButton, List, ListIcon, ListItem, Spacer, Text } from "@hope-ui/solid"
import { MoreVertical } from "lucide-solid"

export const PieChart: Component = () => {

  const pieItems = [
    {
      label: "Gastos",
      value: 45,
      color: "#f87171",
      percentage: 45,
    },
    {
      label: "Ganhos",
      value: 30,
      color: "#34d399",
      percentage: 30,
    },
    {
      label: "Poupança",
      value: 25,
      color: "#60a5fa",
      percentage: 25,
    },
  ]

  const chartData = createMemo(() => {
    return {
      labels: pieItems.map(it => it.label),
      datasets: [
        {
          data: pieItems.map(it => it.value),
          backgroundColor: pieItems.map(it => it.color),
        }
      ]
    }
  })

  return <Card>
    <Card.Header>
      <Text>Despesas mensais</Text>
      <Spacer />
      <IconButton
        aria-label="More options of pie chart"
        icon={<MoreVertical size={20} />}
        variant="ghost"
        colorScheme="neutral"
        size="sm"
      />
    </Card.Header>
    <Grid
      templateColumns="repeat(2,1fr)"
      gap="$4"
      width="$full"
      marginTop="$4"
    >
      <GridItem>
        <DefaultChart
          type="pie"
          data={chartData()}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </GridItem>
      <GridItem>
        <List>
          <For
            each={pieItems}
          >
            {item => (
              <ListItem
                class="flex w-full justify-between h-10"
              >
                <Badge bgColor={item.color} boxSize="$6" />
                <Text>{item.label}</Text>
                <Text>{item.percentage} %</Text>
              </ListItem>
            )}
          </For>
        </List>
      </GridItem>
    </Grid>
  </Card>
}
