import { Component } from "solid-js"
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


  const chartData = {
    labels: ['Gastos', 'Ganhos', 'Poupança'],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: ["#f87171", "#34d399", "#60a5fa"]
      },
    ],
  }
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }

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
      gap="$2"
      width="$full"
      marginTop="$4"
    >
      <GridItem>
        <DefaultChart
          type="pie"
          data={chartData}
          options={chartOptions}
        />
      </GridItem>
      <GridItem>
      </GridItem>
    </Grid>
  </Card>
}
