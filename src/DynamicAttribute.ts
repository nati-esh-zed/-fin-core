'use strict'

import Attribute from "./Attribute.js";
import Component from "./Component.js";

export interface DynamicAttributeValueFn {
  (component: &Component, child: &DynamicAttribute): string|undefined
}

export interface DynamicAttributeParams
{
  name: string;
  value: DynamicAttributeValueFn;
}

class DynamicAttribute extends Attribute {

  #valueCb: DynamicAttributeValueFn;
  
  constructor(params: DynamicAttributeParams) {
    const { name, value } = params;
    super({
      name: name, value: undefined
    });
    this.#valueCb = value;
  }

  update(component: Component) {
    this.value = this.#valueCb(component, this) || '';
    return true;
  }

}

export default DynamicAttribute;
