import { Component } from "solid-js";
import { Providers } from "./providers";
import { RouterController } from "./routers/RouterController";
import { DrawerNewCategory } from "./pages/DrawerNewCategory";
import { DrawerNewExpenditure } from "./pages/DrawerNewExpenditure";
import { DrawerNewRecipt } from "./pages/DrawerNewRecipt";

export const Main: Component = () => {
  return (
    <Providers>
      <RouterController />
      <DrawerNewCategory />
      <DrawerNewExpenditure />
      <DrawerNewRecipt />
    </Providers>
  )
}
