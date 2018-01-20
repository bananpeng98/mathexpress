import { TokenStack } from './models/token-stack';
import { TokenType } from './models/token-type';
import { BinaryOperatorExpression } from './models/binary-operator-expression';
import { UnaryOperatorExpression } from './models/unary-operator-expression';
import { NumberExpression } from './models/number-expression';
import { VariableExpression } from './models/variable-expression';
import { Expression } from './models/expression';

export class ExpressionParser {
  private static oppositeBracket = {
    '(': ')',
    '[': ']',
  };

  static parse(tokens: TokenStack): Expression {
    const expression: Expression = this.parseAddition(tokens);
    return expression;
  }

  static parseAddition(tokens: TokenStack): Expression {
    let left: Expression = this.parseMultiplication(tokens);

    while (tokens.popAny(TokenType.Operator, ['+', '-'])) {
      const op = tokens.peekPrev();
      const right = this.parseMultiplication(tokens);
      left = new BinaryOperatorExpression(left, op.value, right);
    }

    return left;
  }

  static parseBrackets(tokens: TokenStack): Expression {
    if (tokens.matchAny(TokenType.Symbol, ['(', '['])) {
      const token = tokens.pop(TokenType.Symbol);
      const expression = this.parseAddition(tokens);
      tokens.pop(TokenType.Symbol, this.oppositeBracket[token.value]);
      return expression;
    } else {
      return this.parseUnary(tokens);
    }
  }

  static parseMultiplication(tokens: TokenStack): Expression {
    let left: Expression = this.parseBrackets(tokens);

    while (tokens.popAny(TokenType.Operator, ['/', '*'])) {
      const op = tokens.peekPrev();
      const right = this.parseBrackets(tokens);
      left = new BinaryOperatorExpression(left, op.value, right);
    }

    return left;
  }

  static parseUnary(tokens: TokenStack): Expression {
    if (tokens.popAny(TokenType.Operator, ['-'])) {
      const op = tokens.peekPrev();
      const right = this.parseUnary(tokens);
      return new UnaryOperatorExpression(op.value, right);
    }
    return this.parseConstant(tokens);
  }

  static parseConstant(tokens: TokenStack): Expression {
    if (tokens.matchType(TokenType.Literal)) {
      const val = tokens.pop(TokenType.Literal).value;
      return new NumberExpression(val);
    } else if (tokens.matchType(TokenType.Identifier)) {
      const val = tokens.pop(TokenType.Identifier).value;
      return new VariableExpression(val);
    }
  }
}
