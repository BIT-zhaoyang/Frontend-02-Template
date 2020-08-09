function match(selector, element) {
  return recursiveMatch(selector.split(' '), element);
}

function recursiveMatch(selectorArr, element) {
  if (selectorArray === []) return true;
  if (element === null) return false;
  const selector = selectorArr[selectorArr.length - 1];
  if (matchByCombinedSelector(selector, element)) {
    return recursiveMatch(selectorArr.pop(), element.parentElement);
  } else {
    return recursiveMatch(selectorArr, element.parentElement);
  }
}

function matchByCombinedSelector(selector, element) {
  if (selector === '*') return true;
  const parser = new SelectorParser();
  parser.parse(selector);
  if (!parser.isValid) {
    return false;
  }
  if (parser.type && parser.type !== element.tagName) {
    return false;
  }
  if (parser.classList) {
    let match = true;
    parser.classList.forEach(() => {
      match = match && element.className.indexOf(cls) === -1
    });
    for (let cls of parser.classList) {
    }
    return match;
  }
  if (parser.id && parser.id !== element.id) {
    return false;
  }
  if (parser.attribute) {
    let match = true;
    Object.entries(parser.attribute).forEach((K, V) => {
      const value = element.getAttribute(K);
      match = match && V === value;
    });
    return match;
  } 
  return true;
}

/* Currently only support 4 types
 * type, class, id, and attribute selector
 */
class SelectorParser {

  constructor() {
    this.hasError = false;
    this.type = '';
    this.class = '';
    this.classList = [];
    this.id = '';
    this.hasId = false;
    this.attrName = '';
    this.attrValue = '';
    this.attribute = {};
    this.state = null;
  }

  parse(selector) {
    selector = selector.concat('\n');
    if (/\w/.test(selector[0])) {
      this.state = this.parseType;
    } else {
      this.state = this.getNextState;
    }
    for (let ch of selector) {
      this.state = this.state(ch);
    }
    return this.isValid;
  }

  beforeSelector(ch) {
    if (/[a-zA-Z]/.test(ch)) {
      return this.parseType(ch);
    } else {
      return this.error;
    }
  }

  parseType(ch) {
    if (/\w/.test(ch)) {
      this.type = this.type.concat(ch);
      return this.parseType;
    }
    return this.getNextState(ch);
  }

  parseClass(ch) {
    if (/\w/.test(ch)) {
      this.class = this.class.concat(ch);
      return this.parseClass;
    } else {
      this.classList.push(this.class);
      this.class = '';
      return this.getNextState(ch);
    }
  }
  
  parseId(ch) {
    if (this.hasId) return this.error;
    if (/\w/.test(ch)) {
      this.id = this.id.concat(ch);
      return this.parseId;
    } else {
      this.hasId = true;
      return this.getNextState(ch);
    }
  }

  parseAttributeName(ch) {
    if (/\w/.test(ch)) {
      this.attrName = this.attrName.concat(ch);
      return this.parseAttributeName;
    } else if (ch === '=') {
      return this.parseAttributeValue;
    } else {
      return this.error;
    }
  }

  parseAttributeValue(ch) {
    if (/\w/.test(ch)) {
      this.attrValue = this.attrValue.concat(ch);
      return this.parseAttributeValue;
    } else if (ch === ']') {
      this.attribute[this.attrName] = this.attrValue;
      return this.getNextState;
    } else {
      return this.error;
    }
  }

  error() {
    this.hasError = true;
    return this.error;
  }

  getNextState(ch) {
    if (ch === '.') {
      return this.parseClass;
    } else if (ch === '#') {
      return this.parseId;
    } else if (ch === '[') {
      return this.parseAttributeName;
    } else if (ch === '\n') {
      return this.getNextState;
    } else {
      return this.error;
    }
  }

  get isValid() {
    return !this.hasError 
      && this.state !== this.parseAttributeName
      && this.state !== this.parseAttributeValue;
  }
}

function parseAndPrint(selector) {
  console.log('parse selector:', selector);
  const parser = new SelectorParser();
  if (parser.parse(selector)) {
    console.log('type:', parser.type);
    console.log('id:', parser.id);
    console.log('class:', parser.classList);
    console.log('attribute:', JSON.stringify(parser.attribute));
  }
}

const selectors = [
  '.class',
  '[key=val]',
  'h1#id1',
  'h2.classh2',
  'h3[name=what]'
];
selectors.forEach(selector => parseAndPrint(selector));
