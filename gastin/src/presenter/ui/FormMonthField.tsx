import { Component } from "solid-js"
import { FieldProps } from "./Form"
import { Input } from "@hope-ui/solid"

export const FormMonthField: Component<FieldProps<string | undefined>> = (props) => {
  return <Input
    type="month"
    value={props.value()}
    onChange={event => {
      props.setValue(event.target.value)
    }}
  />
}
