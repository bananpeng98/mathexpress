import { Token } from './token';
import { TokenType } from './token-type';

/**
 * Token Stack class
 */
export class TokenStack {
  private stack: Token[];
  private current: number;

  constructor() {
    this.stack = [];
    this.current = 0;
  }

  reset() {
    this.current = 0;
  }

  push(token: Token) {
    this.stack.push(token);
  }

  pop(type: TokenType, value?: any): Token {
    if (this.stack[this.current].type === type && (this.stack[this.current].value === value || !value)) {
      return this.stack[this.current++];
    } else {
      const token = this.stack[this.current];
      console.error(`Unexpexted token ${token.type.toString()}: ${token.value} at column ${token.column}`);
    }
  }

  popAny(type: TokenType, values: any[]): boolean {
    for (const value of values) {
      if (this.matchType(type) && this.matchValue(value)) {
        this.pop(type, value);
        return true;
      }
    }
    return false;
  }

  peek(): Token | undefined {
    if (this.stack[this.current]) {
      return this.stack[this.current];
    }
    return undefined;
  }

  peekPrev(): Token | undefined {
    if (this.stack[this.current - 1]) {
      return this.stack[this.current - 1];
    }
    return undefined;
  }

  peekType(): TokenType | undefined {
    if (this.stack[this.current]) {
      return this.stack[this.current].type;
    }
    return undefined;
  }

  peekValue(): string | undefined {
    if (this.stack[this.current]) {
      return this.stack[this.current].value;
    }
    return undefined;
  }

  match(type: TokenType, value: string): boolean {
    return this.matchType(type) && this.matchValue(value);
  }

  matchType(type: TokenType): boolean {
    return this.stack[this.current] && this.stack[this.current].type === type;
  }

  matchValue(value: string): boolean {
    return this.stack[this.current] && this.stack[this.current].value === value;
  }

  matchAny(type: TokenType, values: any[]): boolean {
    for (const value of values) {
      if (this.matchType(type) && this.matchValue(value)) {
        return true;
      }
    }
    return false;
  }
}
