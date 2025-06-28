import { Component } from "solid-js";
import { FieldProps } from "./Form";
import { Input } from "@hope-ui/solid";

export const FormInputTypeColor: Component<FieldProps<string>> = () => {
  return <Input type="color" />
}
