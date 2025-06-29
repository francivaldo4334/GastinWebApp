import { Database } from "@/data/Database";
import { onMount, ParentComponent } from "solid-js";

export const DatabaseProvider: ParentComponent = (props) => {
  onMount(async () => {
    await Database.init()
  })
  return props.children
}
