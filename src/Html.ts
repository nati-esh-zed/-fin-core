'use strict'

import { Component, Params } from './Component.js';

export interface HtmlParams extends Params
{
  html?: string 
}

export class Html extends Component {
  
  #html: string;

  constructor(params: &HtmlParams) {
    super({
      tag: 'span',
      ...params
    });
    this.#html = params.html || '';
  }

  get html() {
    return this.#html;
  }

  set html(html: string) {
    this.#html = html;
    this.update();
  }

  render() {
    this.node.innerHTML = this.#html;
    return super.render();
  }

}
