import { HopeProvider } from "@hope-ui/solid";
import { ParentComponent } from "solid-js";

export const Providers: ParentComponent = (props) => {
  return (
    <HopeProvider>
      {props.children}
    </HopeProvider>
  )
}
