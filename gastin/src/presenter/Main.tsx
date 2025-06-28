import { Component } from "solid-js";
import { Providers } from "./providers";
import { RouterController } from "./routers/RouterController";
import { DrawerNewCategory } from "./pages/DrawerNewCategory";

export const Main: Component = () => {
  return (
    <Providers>
      <RouterController />
      <DrawerNewCategory />
    </Providers>
  )
}
