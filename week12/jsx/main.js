/* ** Moved to framework.js ***
class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(child) {
    // this.root.appendChild(child);
    // child is another ElementWrapper instance instead of a native Node element, so we need to use `mountTo` to mount the child to current element.
    child.mountTo(this.root);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}


class TextWrapper extends ElementWrapper{
  constructor(content) {
    super();
    this.root = document.createTextNode(content);
  }
  // setAttribute(name, value) {
  //   this.root.setAttribute(name, value);
  // }
  // appendChild(child) {
  //   child.mountTo(this.root);
  // }
  // mountTo(parent) {
  //   parent.appendChild(this.root);
  // }
}

function createElement(type, attributes, ...children) {
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

let a = <div id="a">
  <span>a</span>
  <span>b</span>
  <span>c</span>
</div>

// `a` may be a native HTML Node element, 
// or it may be an instance of our customized class `Div`.
// If `a` is a customized class instance, then it's not a native Node element,
// thus, it can't be appended using appendChild. Thus, we create mountTo
// method on `a`, to mount itself to DOM.
// document.body.appendChild(a);

// `a` may be a native HTML Node element, 
// or it may be an instance of our customized class `Div`.
// If `a` is a native Node element, then it doesn't have the method
// `mountTo`. Thus, we need to create a wrapper for it.
a.mountTo(document.body);
*/

import {Component, createElement} from "./framework.js"

class Carousel extends Component {
  constructor() {
    super();
    this.attributes = Object.create(null);
  }
  render() {
    console.log(this.attributes.src);
    this.root = document.createElement('div');
    for (let record of this.attributes.src) {
      let child = document.createElement('img');
      child.src = record;
      this.root.appendChild(child);
    }
    return this.root;
  }
  // override
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  mountTo(parent) {
    parent.appendChild(this.render());
  }
}

let d = [
  'http://img4.a0bi.com/upload/ttq/20170922/1506081303263.jpeg',
  'http://img4.a0bi.com/upload/ttq/20170922/1506081330241.jpeg',
  'http://img4.a0bi.com/upload/ttq/20170922/1506081421147.jpeg',
  'http://img4.a0bi.com/upload/ttq/20170922/1506081450268.jpeg',
  'http://img4.a0bi.com/upload/ttq/20170922/1506081518136.jpeg'
];

let a = <Carousel src={d}/>
a.mountTo(document.body);