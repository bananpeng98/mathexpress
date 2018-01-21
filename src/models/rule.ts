import { Expression } from './expression';
import { Lexer } from '../lexer';
import { ExpressionParser } from '../expression-parser';
import { TokenStack } from './token-stack';

export class Rule {
  private from: TokenStack;
  private to: TokenStack;

  constructor() {
  }

  apply(expression: Expression): Expression {
    const from = ExpressionParser.parse(this.from);
    const to = ExpressionParser.parse(this.to);
    if (from.equal(expression)) {
      expression = expression.convert(to) as Expression;
    }
    console.log(expression);
    expression.iterate((n) => n.match = undefined);
    return expression;
  }

  fromString(pattern: string, replacement: string) {
    const lexer = new Lexer();
    this.from = lexer.lex(pattern);
    this.to = lexer.lex(replacement);
    return this;
  }
}
