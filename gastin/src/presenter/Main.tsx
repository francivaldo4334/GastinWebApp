import { Component } from "solid-js";
import { Providers } from "./providers";
import { RouterController } from "./routers/RouterController";
import { DrawerNewCategory } from "./pages/DrawerNewCategory";
import { DrawerNewExpenditure } from "./pages/DrawerNewExpenditure";
import { DrawerNewReceipt } from "./pages/DrawerNewReceipt";
import { DrawerEditCategory } from "./pages/DrawerEditCategory";
import { DrawerEditExpenditure } from "./pages/DrawerEditExpenditure";

export const Main: Component = () => {
  return (
    <Providers>
      <RouterController />
      <DrawerNewCategory />
      <DrawerNewExpenditure />
      <DrawerNewReceipt />

      <DrawerEditCategory />
      <DrawerEditExpenditure />
    </Providers>
  )
}
