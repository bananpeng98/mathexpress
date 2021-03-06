import { Rule } from './rule';
import { Expression } from './expression';
import { BinaryOperatorExpression } from './binary-operator-expression';

export class RuleSet {
  private rules: Rule[];

  constructor() {
    this.rules = [];
    this.add(new Rule().fromString('(?0+?1)*(?2+?3)', '?0*?2+?0*?3+?1*?2+?1*?3'));
    this.add(new Rule().fromString('?0+(?1+?2)', '(?0+?1)+?2'));
    // this.add(new Rule().fromString('(?0+?1+?2+?3)*(?4+?5)', '?0*?4+?0*?5+?1*?4+?1*?5+?2*?4+?2*?5+?3*?4+?3*?5'));
    this.add(new Rule().fromString('#0*(?0+?1)', '#0*?0+#0*?1'));
    this.add(new Rule().fromString('#0+?0', '?0+#0'));

    this.add(new Rule().fromString('0+?0', '?0'));
    this.add(new Rule().fromString('?0+0', '?0'));

    this.add(new Rule().fromString('1*?0', '?0'));
    this.add(new Rule().fromString('?0*1', '?0'));
    this.add(new Rule().fromString('0*?0', '0'));
    this.add(new Rule().fromString('?0*0', '0'));

    this.add(new Rule().fromString('0/?0', '0'));
    this.add(new Rule().fromString('?0/1', '?0'));

    this.add(new Rule().fromString('1-1', '0'));
  }

  simplify(expression: Expression): Expression {
    for (let i = 0; i < this.rules.length; i++) {
      expression = this.rules[i].apply(expression);
    }
    for (let j = 0; j < expression.children.length; j++) {
      if (expression.children[j].children.length !== 0) {
        expression.children[j] = this.simplify(expression.children[j] as Expression);
      }
    }
    return expression;
  }

  add(rule: Rule) {
    this.rules.push(rule);
  }
}
