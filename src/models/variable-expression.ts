import { Expression } from './expression';
import { NumberExpression } from './number-expression';
import { TypeMatcher } from '../type-matcher';

export class VariableExpression extends Expression {
  identifier: string;
  multiple: Expression;
  power: Expression;

  constructor(identifier: string, multiple: Expression = new NumberExpression(1), power: Expression = new NumberExpression(1)) {
    super();
    this.identifier = identifier;
    this.multiple = multiple;
    this.power = power;
    this.add(this.multiple);
    this.add(this.power);
  }

  toString() {
    const power = this.getString(this.power);
    return this.getString(this.multiple) + this.identifier + (power !== '' ? '^' + power : '');
  }

  getString(expr: Expression) {
    if (expr instanceof NumberExpression) {
      if (expr.value === 1) {
        return '';
      } else {
        return expr.value;
      }
    }
    return expr.toString();
  }

  eval() {
    this.multiple.eval();
    this.power.eval();
    return this;
  }

  equal(expression: Expression): boolean {
    if (expression instanceof VariableExpression) {
      expression.match = this.toString();
      return expression.identifier === this.identifier && super.equal(expression);
    }
    return super.equal(expression);
  }
}
