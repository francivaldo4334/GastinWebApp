import { FieldProps } from "./Form";
import { Switch } from "@hope-ui/solid";
import { ParentComponent } from "solid-js";

export const FormSwitchField: ParentComponent<FieldProps<boolean | undefined>> = (props) => {
  return <Switch
    size="lg"
    checked={props.value()}
    onChange={() => {
      props.setValue(prev => !prev)
    }}
    class="*:w-full w-full"
  >{props.children}</Switch>
}
