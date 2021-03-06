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

  equal(expression: Expression): boolean {
    if (expression instanceof NumberExpression) {
      expression.match = this.toString();
      return expression.value === this.value;
    }
    return super.equal(expression);
  }
}
