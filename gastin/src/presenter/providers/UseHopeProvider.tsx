import { HopeProvider, HopeThemeConfig } from "@hope-ui/solid";
import { ParentComponent } from "solid-js";

const config: HopeThemeConfig = {
  initialColorMode: "system",
}

export const UseHopeProvider: ParentComponent = (props) => {
  return (
    <HopeProvider
      config={config}
    >
      {props.children}
    </HopeProvider>
  )
}
