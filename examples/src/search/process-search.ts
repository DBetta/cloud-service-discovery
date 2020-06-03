import { Node } from './node';

export class ProcessSearch {
  constructor(private config) {}
  /**
   * @param input
   */
  process<T>(input: T): any {
    if (input == null) {
      throw Error('provide a valid input');
    }
    if (typeof input !== 'object') {
      throw Error(`${typeof input} not yet supported`);
    }

    this.traverse({
      rootKey: null,
      expression: null,
      next: input,
      prev: null,
    });

    return this.queries;
  }

  // eslint-disable-next-line
  private rootKeys: Set<string> = new Set();
  private queries: string[] = [];
  // eslint-disable-next-line
  traverse(input) {
    const entries = Object.entries(input.next);
    for (const [key, value] of entries) {
      const currentInput = { ...input };
      if (currentInput.rootKey == null) {
        currentInput.rootKey = key;
        currentInput.expression = key;
        currentInput.next = value;
      }

      const endQuote = currentInput.prev == null ? '' : `'`;
      let currentValue = JSON.stringify(currentInput.next);
      if (currentInput.prev != null) {
        currentInput.expression = currentInput.expression + '.' + key;
        currentValue = JSON.stringify(currentInput.next[key]);
      }
      if (value instanceof Array) {
        const expression = JSON.parse(currentValue)
          .map((v) => `JSON_SEARCH(${currentInput.expression}${endQuote}, 'all', '%${v}%')`)
          .join(' or ');
        this.queries.push(expression);
      } else if (value instanceof Date) {
        this.queries.push(`${currentInput.expression}${endQuote} = ${currentValue}`);
      } else if (value instanceof Object) {
        if (currentInput.prev == null) {
          currentInput.expression = currentInput.expression + ` ->> '$`;
        }
        currentInput.next = value;
        currentInput.prev = currentInput;
        this.traverse(currentInput);
      } else {
        this.queries.push(`${currentInput.expression}${endQuote} = ${currentValue}`);
      }
    }
  }
}
