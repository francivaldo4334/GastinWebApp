import { Input } from "@hope-ui/solid";
import { Component } from "solid-js";
import { FieldProps } from "./Form";

export const FormDateField: Component<{
  size?: "xs" | "sm" | "lg" | "md" | undefined
} & FieldProps<string | undefined>> = (props) => {
  return <Input
    size={props.size}
    type="date"
    value={props.value()}
    onChange={event => {
      props.setValue(event.target.value)
    }}
  />
}
