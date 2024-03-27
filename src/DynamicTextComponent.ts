'use strict'

import { Component } from './Component.js';
import { TextComponent } from './TextComponent.js';

export interface ContentFn {
  (component: &Component, child: &DynamicTextComponent): string|Promise<string>|undefined
}

export class DynamicTextComponent extends TextComponent {
  
  #contentCb: ContentFn;
  
  constructor(contentCb: ContentFn) {
    super('');
    this.#contentCb = contentCb;
  }

  update(component: Component) {
    const result = this.#contentCb(component, this);
    if(result instanceof Promise) {
      this.content = '';
      result.then((response) => this.content = response)
    } else {
      this.content = result || '';
    }
    return super.update(component);
  }

}
