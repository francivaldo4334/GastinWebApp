import { Component } from "solid-js";
import { FieldProps } from "./Form";
import { Input } from "@hope-ui/solid";

export const FormOptionalTextField: Component<FieldProps<string | undefined>> = (props) => {
  return <Input
    value={props.value()}
    onChange={event => {
      props.setValue(event.target.value)
    }}
  />
}
