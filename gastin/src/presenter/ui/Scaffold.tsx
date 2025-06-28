import { ParentComponent } from "solid-js";
const Actions: ParentComponent = (props) => {
  return <div class="flex gap-2 h-14 absolute left-0">{props.children}</div>
}

interface AppBarComponent extends ParentComponent {
  Actions: ParentComponent;
}

const AppBar: AppBarComponent = (props) => {
  return <div class="">ok{props.children}</div>
}

AppBar.Actions = Actions

interface ScaffoldComponent extends ParentComponent {
  AppBar: AppBarComponent;
}

const Scaffold: ScaffoldComponent = (props) => {
  return <div class="h-14 absolute inset-x-0">{props.children}</div>
}


Scaffold.AppBar = AppBar;

export { Scaffold };


