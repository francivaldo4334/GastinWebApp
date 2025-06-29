import { ParentComponent } from "solid-js";
import { UseHopeProvider } from "./UseHopeProvider";
import { DatabaseProvider } from "./DatabaseProvider";



export const Providers: ParentComponent = (props) => {
  return (
    <UseHopeProvider >
      <DatabaseProvider>
        {props.children}
      </DatabaseProvider>
    </UseHopeProvider>
  )
}
