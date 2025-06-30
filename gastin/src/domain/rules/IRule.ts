export class IRule<T extends any> {
  private rules: IRule<T>[] = []

  static use(){
    return new IRule()
  }
  isValidy(model: T): boolean {
    throw new Error("Not implemented")
  };
  and(rule: IRule<T>):IRule<T> {
    this.rules.push(rule)
    return this
  }
  applyAllValidations(model: T): boolean {
    try {
      return this.rules.map(it => {
        return it.isValidy(model)
      }).every(it => it)
    } catch {
      return false
    }
  }
}
