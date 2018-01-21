export class TypeMatcher {
  static bothIs(first: any, second: any, type: any) {
    return first instanceof type && second instanceof type;
  }

  static eitherIs(first: any, second: any, type: any) {
    return first instanceof type || second instanceof type;
  }

  static eitherIsOneOf(first: any, second: any, type1: any, type2: any) {
    return first instanceof type1 && second instanceof type2 ||
           first instanceof type2 && second instanceof type1;
  }

  static getOf(first: any, second: any, type: any) {
    if (first instanceof type) {
      return first;
    } else if (second instanceof type) {
      return second;
    }
  }

  static bothInOrder(first: any, second: any, type1: any, type2: any) {
    return first instanceof type1 && second instanceof type2;
  }
}
