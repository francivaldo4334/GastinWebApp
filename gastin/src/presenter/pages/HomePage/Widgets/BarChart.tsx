import { Card } from "@/presenter/ui/Card";
import { Component, createMemo, createSelector, createSignal, Match, Switch } from "solid-js";
import { DefaultChart } from 'solid-chartjs'
import {
  type ChartOptions,
} from "chart.js";
import { FormWeekField } from "@/presenter/ui/FormWeekField";
import { Divider, Flex, IconButton, Menu, MenuContent, MenuItem, MenuTrigger, Spacer, Text } from "@hope-ui/solid";
import { MoreVertical } from "lucide-solid";
import { FormMonthField } from "@/presenter/ui/FormMonthField";
import { FormSelectField } from "@/presenter/ui/FormSelectField";

export const BarChart: Component = () => {

  const [week, setWeek] = createSignal<string>()
  const [month, setMonth] = createSignal<string>()
  const [year, setYear] = createSignal<number>(0)

  const [typeRange, setTypeRange] = createSignal<"week" | "month" | "year">("week")
  const typeRangeSelected = createSelector(typeRange)

  const years = [
    { label: "2025", value: 2025 },
    { label: "2024", value: 2024 },
  ]//TODO: obter lista de anos no banco de dados

  const metrics = [
    { label: "Segunda", value: 150 },
    { label: "Terça", value: 200 },
    { label: "Quarta", value: 180 },
    { label: "Quinta", value: 220 },
    { label: "Sexta", value: 304 },
    { label: "Sabado", value: 30 },
    { label: "Domingo", value: 60 },
  ]//TODO: implementar lista de metricas de periodo


  const data = createMemo(() => {
    return {
      labels: metrics.map(it => it.label),
      datasets: [
        {
          data: metrics.map(it => it.value),
          backgroundColor: "#60a5fa",
        }
      ]
    }
  })
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
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

          <MenuItem
            onSelect={() => {
              setTypeRange("week")
            }}
          >
            Por semana
          </MenuItem>
          <MenuItem
            onSelect={() => {
              setTypeRange("month")
            }}
          >
            Por mês
          </MenuItem>
          <MenuItem
            onSelect={() => {
              setTypeRange("year")
            }}
          >
            Por ano
          </MenuItem>
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
        <Switch>
          <Match when={typeRangeSelected("week")}>
            <FormWeekField
              value={week}
              setValue={setWeek}
            />
          </Match>
          <Match when={typeRangeSelected("month")}>
            <FormMonthField
              value={month}
              setValue={setMonth}
            />
          </Match>
          <Match when={typeRangeSelected("year")}>
            <FormSelectField
              items={years}
              value={year}
              setValue={setYear}
            />
          </Match>
        </Switch>
      </Flex>
      <Divider />
    </Flex>
    <DefaultChart type="bar" data={data()} options={options} height={300} />
  </Card>
}
