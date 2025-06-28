import { Component, createMemo, createSignal } from "solid-js";
import { FieldProps } from "./Form";
import { Input, InputGroup, InputLeftElement } from "@hope-ui/solid";

export const FormMonetaryValueField: Component<FieldProps<string>> = (props) => {

  const formatMoney = (value: string) => {
    const digits = value.replace(/\D/g, "").padStart(3, "0");
    const integer = digits.slice(0, -2);
    const cents = digits.slice(-2);
    const formattedInteger = parseInt(integer, 10).toLocaleString("pt-BR")
    return `${formattedInteger},${cents}`;
  }

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
