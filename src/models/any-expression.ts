import { Expression } from './expression';

export class AnyExpression extends Expression {
  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }

  toString() {
    return '?' + this.value.toString();
  }

  eval(): Expression {
    return this;
  }

  equal(expression: Expression): boolean {
    expression.match = this.toString();
    return true;
  }
}
