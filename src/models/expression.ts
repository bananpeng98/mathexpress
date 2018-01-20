import { TokenStack } from './token-stack';
import { Node } from './node';

export abstract class Expression extends Node {
  abstract toString(): string;
  abstract eval(): Expression;
}
