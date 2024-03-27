'use strict'

import { Component } from './Component.js';
import { Variable, TargetChildType } from './Variable.js';

export class AsyncVariable<Type> extends Variable<Type> {
  
  #promise: Promise<Type>;

  constructor(promise: Promise<Type>, initialValue: Type) {
    super(initialValue);
    this.#promise = promise;
    this.refer    = this.refer.bind(this);
  }

  set promise(promise: Promise<Type>) {
    this.#promise = promise;
    this.#promise.then((result) => {
      this.value = result;
    });
  }

  get promise() {
    return this.#promise;
  }

  refer(component: &Component, child?: TargetChildType) {
    console.assert(!!component, 'component cannot be null');
    if(this.addReference(component, child)) {
      this.#promise.then((result) => {
        this.value = result;
      });
    }
    return this.value;
  }

  tRefer(component: &Component, child?: TargetChildType) {
    console.assert(!!component, 'component cannot be null');
    if(this.addReference(component, child)) {
      this.#promise.then((result) => {
        this.value = result;
      });
    }
    return this.tValue;
  }

}

