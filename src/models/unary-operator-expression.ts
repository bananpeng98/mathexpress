import { Expression } from './expression';
import { NumberExpression } from './number-expression';

export class UnaryOperatorExpression extends Expression {
  private operator: string;
  private right: Expression;

  constructor(operator: string, right: Expression) {
    super();
    this.operator = operator;
    this.right = right;
    this.add(this.right);
  }

  toString() {
    return this.operator + this.right.toString();
  }

  eval(): Expression {
    const expression = new UnaryOperatorExpression(this.operator, this.right.eval());
    if (this.right instanceof NumberExpression) {
      return new NumberExpression(-this.right.value);
    }
    return expression;
  }
}
