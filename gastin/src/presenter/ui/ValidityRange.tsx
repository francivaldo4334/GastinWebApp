import { Divider, Flex, FormControl, FormLabel } from "@hope-ui/solid";
import { Accessor, Component, Setter } from "solid-js";
import { FormDateField } from "./FormDateField";

type DateType = string | undefined

export const ValidityRange: Component<{
  initValidity: Accessor<DateType>;
  endValidity: Accessor<DateType>;
  setInitValidity: Setter<DateType>;
  setEndValidity: Setter<DateType>;
}> = (props) => {
  return <Flex
    direction="column"
    width="$full"
    alignItems="end"
    paddingTop="$2"
    gap="$2"
  >
    <Divider />
    <Flex
      gap="$2"
    >
      <FormControl class="flex gap-2" >
        <FormLabel>Inicio </FormLabel>
        <FormDateField
          size="sm"
          value={props.initValidity}
          setValue={props.setInitValidity}
        />
      </FormControl>

      <FormControl class="flex gap-2" >
        <FormLabel>Fim </FormLabel>
        <FormDateField
          size="sm"
          value={props.endValidity}
          setValue={props.setEndValidity}
        />
      </FormControl>
    </Flex>
    <Divider />
  </Flex>

}
