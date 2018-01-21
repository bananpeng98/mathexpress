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

  eval(): Expression {
    const expression = new BinaryOperatorExpression(this.left.eval(), this.operator, this.right.eval());
    const left = expression.left;
    const right = expression.right;

    if (TypeMatcher.bothIs(left, right, NumberExpression)) {
      return this.evalNumNum(left as NumberExpression, right as NumberExpression, expression);
    } else if (TypeMatcher.bothIs(left, right, VariableExpression)) {
      return this.evalVarVar(left as VariableExpression, right as VariableExpression, expression);
    }
    return expression;
  }

  evalNumNum(left: NumberExpression, right: NumberExpression, expression: Expression): Expression {
    switch (this.operator) {
      case '+': return new NumberExpression(left.value + right.value);
      case '-': return new NumberExpression(left.value - right.value);
      case '*': return new NumberExpression(left.value * right.value);
      case '/': return new FractionExpression(left, right).eval();
    }
    return expression;
  }

  evalVarVar(left: VariableExpression, right: VariableExpression, expression: Expression): Expression {
    if (left.identifier === right.identifier) {
      const identifier = left.identifier;
      switch (this.operator) {
        case '+':
          if (left.power.equal(right.power)) {
            return new VariableExpression(
              identifier,
              new BinaryOperatorExpression(left.multiple, '*', right.multiple).eval(),
              left.power
            );
          }
          break;
        case '*': return new VariableExpression(
          identifier,
          new BinaryOperatorExpression(left.multiple, '*', right.multiple).eval(),
          new BinaryOperatorExpression(left.power, '+', right.power).eval()
        );
      }
    }
    return expression;
  }

  equal(expression: Expression): boolean {
    if (expression instanceof BinaryOperatorExpression) {
      return expression.operator === this.operator && super.equal(expression);
    }
    return super.equal(expression);
  }
}
