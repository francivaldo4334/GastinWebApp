import { Checkbox } from "@hope-ui/solid"
import { Component } from "solid-js"
import { FieldProps } from "./Form"

export const FormCheckboxField: Component<FieldProps<boolean>> = (props) => {
  return <Checkbox
    checked={props.value()}
    onChange={event => props.setValue((event.target as any).checked)}
    size="lg"
  />
}
