'use strict'

export interface Params {
  name: string;
  value?: any;
}

class Attribute {
  
  #name: string;
  #value?: any;
  #node: Attr;

  constructor(params: Params) {
    const {name, value} = params;
    this.#name  = name;
    this.#value = value;
    this.#node  = document.createAttribute(this.#name);
    this.#node.value = this.#value;
  }

  get name() {
    return this.#name;
  }

  get value() {
    return this.#value;
  }
  
  set value(newValue) {
    this.#value = newValue;
    this.#node.value = this.#value;
  }

  get node() {
    return this.#node;
  }
  
}

export default Attribute;
