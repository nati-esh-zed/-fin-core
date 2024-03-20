'use strict'

import Component from './Component.js';

class TextComponent {

  #content: string;
  #node: Text;
  
  constructor(content: string) {
    this.#content = content;
    this.#node    = document.createTextNode(this.content);
  }
  
  get content() {
    return this.#content;
  }

  set content(newContent: string) {
    this.#content = newContent;
    this.render();
  }

  get node() {
    return this.#node;
  }

  update(component?: Component) {
    return this.render();
  }

  render() {
    this.#node.textContent = this.content;
    return this.#node;
  }

}

export default TextComponent;
