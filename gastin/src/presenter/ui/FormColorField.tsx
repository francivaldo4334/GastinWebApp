import { Component } from "solid-js";
import { FieldProps } from "./Form";
import { Input } from "@hope-ui/solid";

export const FormColorField: Component<FieldProps<string>> = (props) => {
  return <Input
    type="color"
    value={props.value()}
    onChange={event => {
      props.setValue(event.target.value)
    }}
  />
}
