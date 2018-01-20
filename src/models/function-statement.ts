import { TokenStack } from './token-stack';
import { Expression } from './expression';
import { TokenType } from './token-type';
import { ExpressionParser } from '../expression-parser';
import { Node } from './node';

export class FunctionStatement extends Node {
  identifier: string;
  params: string[];

  private expression: Expression;

  constructor() {
    super();
    this.params = [];
  }

  parse(tokens: TokenStack): FunctionStatement {
    if (tokens.matchType(TokenType.Identifier)) {
      this.identifier = tokens.pop(TokenType.Identifier).value;
      tokens.pop(TokenType.Symbol, '(');
      while (tokens.matchType(TokenType.Identifier)) {
        this.params.push(tokens.pop(TokenType.Identifier).value);
        if (tokens.match(TokenType.Symbol, ',')) {
          tokens.pop(TokenType.Symbol, ',');
        }
      }
      tokens.pop(TokenType.Symbol, ')');
      tokens.pop(TokenType.Symbol, '=');
      this.expression = ExpressionParser.parse(tokens);
    }
    return this;
  }
}
