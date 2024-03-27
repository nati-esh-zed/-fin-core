'use strict'

import { Component } from './Component.js';
import { DynamicAttribute } from './DynamicAttribute.js';
import { DynamicTextComponent } from './DynamicTextComponent.js';

export type TargetChildType = &DynamicTextComponent|&DynamicAttribute|undefined;


export class Variable<Type> {
  
  #value: Type;
  #references: Map<Component,Set<TargetChildType>>;
  then?: (value?: Type) => any

  constructor(initialValue: Type) {
    this.#value = initialValue;
    this.#references = new Map();
    this.tRef   = this.tRef.bind(this);
    this.fetch  = this.fetch.bind(this);
    this.refer  = this.refer.bind(this);
    this.tRefer = this.tRefer.bind(this);
    this.update = this.update.bind(this);
  }

  set value(newValue: Type) {
    this.#value = newValue;
    this.update();
  }

  get value() {
    return this.#value;
  }

  get tValue() {
    return this.then 
      ? this.then(this.#value)
      : this.#value;
  }

  get references() {
    return this.#references;
  }

  fetch() {
    return this.#value;
  }

  addReference(component: &Component, child?: TargetChildType) {
    const reference = this.#references.get(component);
    if(reference) {
      if(!reference.has(child)) {
        reference.add(child);
        return true;
      }
    } else {
      const targets: Set<TargetChildType> = new Set();
      targets.add(child);
      this.#references.set(component, targets);
      return true;
    }
    return false;
  }

  tRef(then: (value?: Type) => any) {
    this.then = then;
    return this.tRefer;
  }

  refer(component: &Component, child?: TargetChildType) {
    console.assert(!!component, 'component cannot be null');
    this.addReference(component, child);
    return this.#value;
  }

  tRefer(component: &Component, child?: TargetChildType) {
    console.assert(!!component, 'component cannot be null');
    this.addReference(component, child);
    return this.tValue;
  }

  update() {
    for(let [component, targets] of this.references) {
      for(let child of targets) {
        if(child !== undefined) {
          if(child instanceof DynamicTextComponent) {
            component.updateChild(child);
          } else if(child instanceof DynamicAttribute) {
            component.updateAttribute(child);
          }
        }
        else
          component.update();
      }
    }
    return this.#value;
  }

}
