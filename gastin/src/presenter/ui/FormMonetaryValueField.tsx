import { Component } from "solid-js";
import { FieldProps } from "./Form";
import { Input, InputGroup, InputLeftElement } from "@hope-ui/solid";
import { formatMoney } from "../utils/formatMoney";

export const FormMonetaryValueField: Component<FieldProps<string>> = (props) => {

  return <InputGroup>
    <InputLeftElement> R$ </InputLeftElement>
    <Input
      type="text"
      value={props.value()}
      onInput={(event) => {
        props.setValue(formatMoney(event.target.value))
      }}
      inputMode="numeric"
    />
  </InputGroup>

}
