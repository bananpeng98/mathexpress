import { TokenType } from './token-type';

/**
 * Token class
 */
export class Token {
  readonly type: TokenType;
  readonly value?: any;
  readonly column?: number;

  constructor(type: TokenType, value?: any, column?: number) {
    this.type = type;
    this.value = value;
    this.column = column;
  }
}
