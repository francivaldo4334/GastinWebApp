import { Card } from "@/presenter/ui/Card";
import { Component, createSignal } from "solid-js";
import { DefaultChart } from 'solid-chartjs'
import {
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { FormWeekField } from "@/presenter/ui/FormWeekField";
import { Divider, Flex, IconButton, Menu, MenuContent, MenuTrigger, Spacer, Text } from "@hope-ui/solid";
import { MoreVertical } from "lucide-solid";

export const BarChart: Component = () => {

  const [week, setWeek] = createSignal<string>()

  const data: ChartData<"bar"> = {
    labels: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado", "Domingo"],
    datasets: [
      {
        data: [150, 200, 180, 220, 304, 30, 60],
        backgroundColor: "#60a5fa",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Vendas por mês" },
    },
  };

  return <Card>
    <Card.Header>
      <Text>Evolução na semana</Text>
      <Spacer />
      <Menu>
        <MenuTrigger
          as={IconButton}
          aria-label="More options of bar chart"
          variant="ghost"
          size="sm"
          colorScheme="neutral"
          icon={<MoreVertical />}
        />
        <MenuContent>
        </MenuContent>
      </Menu>
    </Card.Header>
    <Flex
      direction="column"
      gap="$2"
      alignItems="end"
      paddingTop="$2"
    >
      <Divider />
      <Flex
        width="$sm"
      >
        <FormWeekField
          value={week}
          setValue={setWeek}
        />
      </Flex>
      <Divider />
    </Flex>
    <DefaultChart type="bar" data={data} options={options} height={300} />
  </Card>
}
