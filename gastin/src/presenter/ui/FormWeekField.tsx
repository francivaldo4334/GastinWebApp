import { Input } from "@hope-ui/solid"
import { Component } from "solid-js"
import { FieldProps } from "./Form"

export const FormWeekField: Component<FieldProps<string | undefined>> = (props) => {
  return <Input
    type="week"
    value={props.value()}
    onChange={event => {
      props.setValue(event.target.value)
    }}
  />
}
