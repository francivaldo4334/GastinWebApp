import { ParentComponent } from "solid-js";
import { UseHopeProvider } from "./UseHopeProvider";



export const Providers: ParentComponent = (props) => {
  return (
    <UseHopeProvider >
      {props.children}
    </UseHopeProvider>
  )
}
