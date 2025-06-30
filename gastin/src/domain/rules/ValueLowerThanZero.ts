import { IRule } from "./IRule";

export class ValueLowerThanZero extends  IRule<{value: number}> {
  isValidy(model: { value: number; }): boolean {
    return model.value < 0; 
  }
}
