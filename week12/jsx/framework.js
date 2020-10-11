export class Component {
  constructor(type) {
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(child) {
    child.mountTo(this.root);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class ElementWrapper extends Component {
  constructor(type) {
    this.root = document.createElement(type);
  }
}


class TextWrapper extends Component {
  constructor(content) {
    super();
    this.root = document.createTextNode(content);
  }
}

export function createElement(type, attributes, ...children) {
  let element = null;
  if (typeof type === 'string') {
    element = new ElementWrapper(type);
  } else {
    element = new type;
  }

  for (let name in attributes) {
    // here the `setAttribute` method may be the method provided by DOM
    // or it may be the method provided by our class instance, which represents
    // the customized HTML element node.
    // This also applies to `appendChild`.
    element.setAttribute(name, attributes[name]);
  }
  for (let child of children) {
    if (typeof child === 'string') {
      child = new TextWrapper(child);
    }
    element.appendChild(child);
  }
  return element;
}

// What we should do?
// To create a class for customized HTML element,
// which implements the DOM node element interface.
// Namely, the class should have the methods: setAttribute(), appendChild()
class Div extends ElementWrapper{
  constructor() {
    super();
    this.root = document.createElement('div');
  }

  // Now we used `extends` so we don't need to write these methods again.
  // setAttribute(name, value) {
  //   this.root.setAttribute(name, value);
  // }
  // appendChild(child) {
  //   this.root.appendChild(child);
  // }
  // mountTo(parent) {
  //   parent.appendChild(this.root);
  // }
}