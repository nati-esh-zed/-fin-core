'use strict'

import { Component, Params } from './Component.js';

export interface HtmlFn {
  (component: &Component): string|Promise<string>|undefined
}

export interface DynamicHtmlParams extends
  Params
{
  html: HtmlFn 
}

export class DynamicHtml extends Component {
  
  #htmlCb: HtmlFn;
  #html: string = '';

  constructor(params: &DynamicHtmlParams) {
    super({
      tag: 'span',
      ...params
    });
    this.#htmlCb = params.html;
  }

  get html() {
    return this.#html;
  }

  set html(html: string) {
    this.#html = html;
    this.update();
  }
  
  update() {
    if(super.update()) {
      const result = this.#htmlCb(this);
      if(result instanceof Promise) {
        this.#html = '';
        result.then((response) => this.#html = response)
      } else {
        this.#html = result || '';
      }
      this.render();
      return true;
    }
    return false;
  }

  render() {
    if((!this.renderCb || this.renderCb())) {
      this.node.innerHTML = this.#html;
    }
    return this.node;
  }

}
