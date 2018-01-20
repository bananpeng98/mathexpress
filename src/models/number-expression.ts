import { Expression } from './expression';

export class NumberExpression extends Expression {
  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }

  toString() {
    return this.value.toString();
  }

  eval(): Expression {
    return this;
  }
}
