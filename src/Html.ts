'use strict'

import Component, { Params as ComponentParams } from './Component.js';

export interface Params extends
  ComponentParams
{
  html?: string 
}

class Html extends Component {
  
  #html: string;

  constructor(params: Params) {
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

export default Html;
