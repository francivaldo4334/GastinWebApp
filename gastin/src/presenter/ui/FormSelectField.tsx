import { Component, For } from "solid-js";
import { FieldProps } from "./Form";
import { Select, SelectContent, SelectIcon, SelectListbox, SelectOption, SelectOptionIndicator, SelectOptionText, SelectPlaceholder, SelectTrigger, SelectValue } from "@hope-ui/solid";

export const FormSelectField: Component<{
  items: { value: number, label: string }[]
  placeholder?: string;
} & FieldProps<number>> = (props) => {
  return <Select
    value={props.value}
    onChange={item => {
      props.setValue(item)
    }}
  >
    <SelectTrigger>
      <SelectPlaceholder>{props.placeholder}</SelectPlaceholder>
      <SelectValue />
      <SelectIcon />
    </SelectTrigger>
    <SelectContent>
      <SelectListbox>
        <For each={props.items}>
          {item => (
            <SelectOption value={item.value}>
              <SelectOptionText>{item.label}</SelectOptionText>
              <SelectOptionIndicator />
            </SelectOption>
          )}
        </For>
      </SelectListbox>
    </SelectContent>
  </Select>
}
