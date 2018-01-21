import { TokenStack } from './token-stack';

export class Node {
  children: Node[];
  public match: string;

  constructor() {
    this.children = [];
    this.match = undefined;
  }

  get firstChild(): Node {
    return this.children[0];
  }

  parse(tokens: TokenStack) {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].parse(tokens);
    }
  }

  equal(other: Node) {
    if (this.children.length !== other.children.length) {
      return false;
    }

    if (!(this instanceof other.constructor)) {
      return false;
    }

    for (let i = 0; i < this.children.length; i++) {
      if (!this.children[i].equal(other.children[i])) {
        return false;
      }
    }

    other.match = this.toString();

    return true;
  }

  convert(to: Node): Node {
    let converted = to;
    const leaves = this.getLeaves();
    const root = leaves.find((rl) => rl.match === converted.toString());

    if (root) {
      converted = root;
    }

    converted.replaceLeaves((l) => {
      return leaves.find((rl) => rl.match === l.toString());
    });

    return converted;
  }

  getLeaves(): Node[] {
    const leaves = [];

    if (this.children.length === 0) {
      leaves.push(this);
    } else {
      const childLeaves = [];
      let match = false;
      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i].match) {
          match = true;
        }
        childLeaves.push(...this.children[i].getLeaves());
      }
      if (match) {
        leaves.push(...childLeaves);
      } else if (!match && this.match) {
        leaves.push(this);
      }
    }

    return leaves;
  }

  replaceLeaves(fn: (l: Node) => Node) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].children.length === 0) {
        this.children[i] = fn(this.children[i]);
      } else {
        this.children[i].replaceLeaves(fn);
      }
    }
  }

  add(child: Node) {
    this.children.push(child);
  }
}
