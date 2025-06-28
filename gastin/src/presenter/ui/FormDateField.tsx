import { Input } from "@hope-ui/solid";
import { Component } from "solid-js";
import { FieldProps } from "./Form";

export const FormDateField: Component<FieldProps<string | undefined>> = (props) => {
  return <Input
    type="date"
    value={props.value()}
    onChange={event => {
      props.setValue(event.target.value)
    }}
  />
}
