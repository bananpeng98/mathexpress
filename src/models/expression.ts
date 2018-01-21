import { TokenStack } from './token-stack';
import { Node } from './node';
import { NumberExpression } from './number-expression';

export abstract class Expression extends Node {
  abstract toString(): string;
  eval(): Expression {
    return this;
  }
}
