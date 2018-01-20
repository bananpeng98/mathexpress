import { TokenStack } from './token-stack';

export class Node {
  protected children: Node[];

  constructor() {
    this.children = [];
  }

  parse(tokens: TokenStack) {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].parse(tokens);
    }
  }
}
