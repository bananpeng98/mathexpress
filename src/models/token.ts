import { TokenType } from './token-type';

/**
 * Token class
 */
export class Token {
  readonly type: TokenType;
  readonly value?: any;

  constructor(type: TokenType, value?: any) {
    this.type = type;
    this.value = value;
  }
}
