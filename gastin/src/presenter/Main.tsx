import { Component } from "solid-js";
import { Providers } from "./providers";
import { RouterController } from "./routers/RouterController";

export const Main: Component = () => {
  return (
    <Providers>
      <RouterController />
    </Providers>
  )
}
