import { Component, createMemo } from "solid-js"
import { onMount } from 'solid-js'
import {
  Chart,
  LineController,
  CategoryScale,
  PointElement,
  LineElement,
  LinearScale,
} from 'chart.js'
import { DefaultChart, Pie } from 'solid-chartjs'
import { Card } from "@/presenter/ui/Card"
import { Grid, GridItem, IconButton, Spacer, Text } from "@hope-ui/solid"
import { MoreVertical } from "lucide-solid"

export const PieChart: Component = () => {

  const pieItems = [
    {
      label: "Gastos",
      value: 45,
      color: "#f87171"
    },
    {
      label: "Ganhos",
      value: 30,
      color: "#34d399"
    },
    {
      label: "Poupança",
      value: 25,
      color: "#60a5fa"
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

  onMount(() => {
    Chart.register(LineController, CategoryScale, PointElement, LineElement, LinearScale)
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
      </GridItem>
    </Grid>
  </Card>
}
