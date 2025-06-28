import { Box, Flex } from "@hope-ui/solid";
import { ParentComponent } from "solid-js";

interface CardComponent extends ParentComponent {
  Header: ParentComponent
}

const Card: CardComponent = (props) => {
  return <Box
    borderWidth="1px"
    borderColor="$neutral6"
    borderRadius="$lg"
    overflow="hidden"
    padding="$3"
    maxH="$md"
  >
    {props.children}
  </Box>
}

const Header: ParentComponent = (props) => {
  return <Flex width="$full">
    {props.children}
  </Flex>
}

Card.Header = Header

export { Card }
