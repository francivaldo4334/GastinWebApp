import { Text } from "@hope-ui/solid";
import { ParentComponent } from "solid-js";
const Actions: ParentComponent = (props) => {
  return <div class="flex gap-2 h-14 absolute right-0 top-0 py-2 pr-2">{props.children}</div>
}


const Title: ParentComponent = (props) => {
  return <Text class="p-3" size="lg">{props.children}</Text>
}

const Body: ParentComponent = (props) => {
  return <div class="absolute w-wcreen h-[calc(100vh-14rem)] inset-0 top-14">{props.children}</div>
}

interface AppBarComponent extends ParentComponent {
  Actions: ParentComponent;
  Title: ParentComponent;
}

const AppBar: AppBarComponent = (props) => {
  return <div class="">{props.children}</div>
}

AppBar.Actions = Actions
AppBar.Title = Title

interface ScaffoldComponent extends ParentComponent {
  AppBar: AppBarComponent;
  Body: ParentComponent;
}

const Scaffold: ScaffoldComponent = (props) => {
  return <div class="h-14 absolute inset-x-0">{props.children}</div>
}


Scaffold.AppBar = AppBar;
Scaffold.Body = Body

export { Scaffold };


