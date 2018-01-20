import { TokenStack } from './models/token-stack';
import { Token } from './models/token';
import { TokenType } from './models/token-type';

/**
 * Lexer class
 */
export class Lexer {
  /**
   * Lexes the code.
   * @param  {string} code
   * @returns A token stack.
   */
  lex(code: string): TokenStack {
    const stack = new TokenStack();

    let current = 0;
    let c: string = code[current];
    while (c) {
      if (this.contains(c, ' \n')) {
        stack.push(new Token(TokenType.Whitespace));
      } else if (this.contains(c, '+-*/')) {
        stack.push(new Token(TokenType.Operator, c));
      } else if (this.contains(c, '(){}[],;=')) {
        stack.push(new Token(TokenType.Symbol, c));
      } else if (c.match(/[\.0-9]/)) {
        const val = this.lexWhile(/[\.0-9]/, code, current);
        current += val.length - 1;
        stack.push(new Token(TokenType.Literal, parseFloat(val)));
      } else if (c.match(/[a-zA-Z]/)) {
        const val = this.lexWhile(/[a-zA-Z]/, code, current);
        current += val.length - 1;
        stack.push(new Token(TokenType.Identifier, val));
      }
      c = code[++current];
    }

    stack.push(new Token(TokenType.EOF, 'eof'));

    return stack;
  }

  private lexWhile(pattern: RegExp, code: string, index: number): string {
    let value = '';
    while (index < code.length && code[index].match(pattern)) {
      value += code[index];
      index++;
    }
    return value;
  }

  private contains(char: string, search: string): boolean {
    return search.indexOf(char) !== -1;
  }
}
