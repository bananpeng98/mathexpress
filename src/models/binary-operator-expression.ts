import { Expression } from './expression';
import { RuleSet } from './rule-set';
import { NumberExpression } from './number-expression';
import { FractionExpression } from './fraction-expression';
import { VariableExpression } from './variable-expression';
import { TypeMatcher } from '../type-matcher';
import { Rule } from './rule';

export class BinaryOperatorExpression extends Expression {
  private static operatorPriority = {
    '*': false,
    '/': false,
    '+': true,
    '-': true
  };

  private operator: string;

  constructor(left: Expression, operator: string, right: Expression) {
    super();
    this.operator = operator;
    this.add(left);
    this.add(right);
  }

  get left(): Expression {
    return this.children[0] as Expression;
  }

  get right(): Expression {
    return this.children[1] as Expression;
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

  equal(expression: Expression): boolean {
    if (expression instanceof BinaryOperatorExpression) {
      return expression.operator === this.operator && super.equal(expression);
    }
    return super.equal(expression);
  }
}
