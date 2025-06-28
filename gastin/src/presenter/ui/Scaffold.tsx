import { ParentComponent } from "solid-js";

const AppBar: ParentComponent = (props) => {
  console.log("ok")
  return <div class="bg-base h-screen w-screen">ok{props.children}</div>
}

interface ScaffoldComponent extends ParentComponent {
  AppBar: ParentComponent;
}

const Scaffold: ScaffoldComponent = (props) => {
  return <>{props.children}</>
}


Scaffold.AppBar = AppBar;

export { Scaffold };


