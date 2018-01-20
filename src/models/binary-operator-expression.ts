import { Expression } from './expression';
import { NumberExpression } from './number-expression';
import { FractionExpression } from './fraction-expression';
import { VariableExpression } from './variable-expression';
import { TypeMatcher } from '../type-matcher';

export class BinaryOperatorExpression extends Expression {
  private static operatorPriority = {
    '*': false,
    '/': false,
    '+': true,
    '-': true
  };

  private left: Expression;
  private operator: string;
  private right: Expression;


  constructor(left: Expression, operator: string, right: Expression) {
    super();
    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  toString() {
    return this.parenthesize(this.left) + this.operator + this.parenthesize(this.right);
  }

  parenthesize(expression: Expression): string {
    if (expression instanceof BinaryOperatorExpression) {
      if (!BinaryOperatorExpression.operatorPriority[this.operator]) {
        if (BinaryOperatorExpression.operatorPriority[expression.operator]) {
          return '(' + expression.toString() + ')';
        }
      }
    }
    return expression.toString();
  }

  eval(): Expression {
    const expression = new BinaryOperatorExpression(this.left.eval(), this.operator, this.right.eval());
    const left = expression.left;
    const right = expression.right;

    if (TypeMatcher.bothIs(left, right, NumberExpression)) {
      return this.evalNumbers(
        (left as NumberExpression).value,
        (right as NumberExpression).value
      );
    }

    return expression;
  }

  private evalNumbers(left: number, right: number): Expression {
    switch (this.operator) {
      case '+': return new NumberExpression(left + right);
      case '-': return new NumberExpression(left - right);
      case '*': return new NumberExpression(left * right);
      case '/': return new FractionExpression(
        new NumberExpression(left),
        new NumberExpression(right)
      ).eval();
    }
  }
}
