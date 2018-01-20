import { Expression } from './expression';
import { NumberExpression } from './number-expression';
import { TypeMatcher } from '../type-matcher';

export class VariableExpression extends Expression {
  identifier: string;
  multiple: Expression;
  power: Expression;

  constructor(identifier: string, multiple: number = 1, power: number = 1) {
    super();
    this.identifier = identifier;
    this.multiple = new NumberExpression(multiple);
    this.power = new NumberExpression(power);
  }

  toString() {
    return this.getString(this.multiple) + this.identifier + this.getString(this.power);
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
}
