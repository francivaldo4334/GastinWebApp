import { Component } from "solid-js";
import { createDisclosure, Flex, IconButton } from "@hope-ui/solid";
import { MoreVertical } from "lucide-solid";
import { Scaffold } from "@/presenter/ui/Scaffold";
import { HomePageDrawer } from "./HomePageDrawer";
import { AccountBalance } from "./Widgets/AccountBalance";
import { Overview } from "./Widgets/Overview";
import { PieChart } from "./Widgets/PieChart";
import { BarChart } from "./Widgets/BarChart";
export const HomePage: Component = () => {

  const {
    isOpen,
    onOpen,
    onClose,
  } = createDisclosure()
  return <>
    <Scaffold>
      <Scaffold.Body>
        <Flex
          direction="column"
          width="$full"
          padding="$4"
          gap="$4"
        >
          <AccountBalance />
          <Overview />
          <PieChart />
          <BarChart />
        </Flex>
      </Scaffold.Body>

      <Scaffold.AppBar>
        <Scaffold.AppBar.Title>
          Tela Principal
        </Scaffold.AppBar.Title>
        <Scaffold.AppBar.Actions>
          <IconButton
            aria-label="Open menu to more options"
            onClick={onOpen}
            variant="ghost"
            colorScheme="neutral"
            icon={<MoreVertical />}
          />
          <HomePageDrawer
            isOpen={isOpen}
            onClose={onClose}
          />
        </Scaffold.AppBar.Actions>
      </Scaffold.AppBar>
    </Scaffold>
  </>
}
