import { Lexer } from './lexer';
import { TokenStack } from './models/token-stack';

/**
 * Lexer test
 */
describe('Lexer test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy();
  });

  it('Lexer is instantiable', () => {
    expect(new Lexer()).toBeInstanceOf(Lexer);
  });

  it('lex should return a token stack', () => {
    const lexer = new Lexer();
    const result = lexer.lex('x');
    expect(result).toBeInstanceOf(TokenStack);
  });
});
