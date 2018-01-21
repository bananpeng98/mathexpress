import { Expression } from './expression';
import { NumberExpression } from './number-expression';

export class AnyNumberExpression extends Expression {
  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }

  toString() {
    return '#' + this.value.toString();
  }

  eval(): Expression {
    return this;
  }

  equal(expression: Expression): boolean {
    if (expression instanceof NumberExpression) {
      expression.match = this.toString();
      return true;
    }
    return super.equal(expression);
  }
}
