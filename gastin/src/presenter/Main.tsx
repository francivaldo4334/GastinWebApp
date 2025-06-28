import { Component } from "solid-js";
import { Providers } from "./providers";
import { RouterController } from "./routers/RouterController";
import { DrawerNewCategory } from "./pages/DrawerNewCategory";
import { DrawerNewExpenditure } from "./pages/DrawerNewExpenditure";

export const Main: Component = () => {
  return (
    <Providers>
      <RouterController />
      <DrawerNewCategory />
      <DrawerNewExpenditure />
    </Providers>
  )
}
