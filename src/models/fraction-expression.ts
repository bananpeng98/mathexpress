import { Expression } from './expression';
import { NumberExpression } from './number-expression';
import { TypeMatcher } from '../type-matcher';

export class FractionExpression extends Expression {
  numerator: Expression;
  denominator: Expression;

  constructor(numerator: Expression, denominator: Expression) {
    super();
    this.numerator = numerator;
    this.denominator = denominator;
    this.add(this.numerator);
    this.add(this.denominator);
  }

  toString() {
    return this.numerator.toString() + '/' + this.denominator.toString();
  }

  eval(): Expression {
    const expression = new FractionExpression(this.numerator.eval(), this.denominator.eval());
    if (TypeMatcher.bothIs(expression.numerator, expression.denominator, NumberExpression)) {
      const numerator = (expression.numerator as NumberExpression).value;
      const denominator = (expression.denominator as NumberExpression).value;
      if (denominator === 0) {
        return new UndefinedExpression();
      }
      if ((numerator / denominator) % 1 === 0) {
        return new NumberExpression(numerator / denominator);
      }
    }
    return expression;
  }
}

export class UndefinedExpression extends Expression {
  toString() {
    return 'undefined';
  }

  eval() {
    return this;
  }
}
