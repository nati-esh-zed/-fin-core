'use strict'

import Component from './Component.js';

export interface EventHandlerFn { (component: Component, event?: Event): any }

export interface Params {
  type: string;
  handler: EventHandlerFn;
}

class EventHandler { 
  type: string;
  handler: EventHandlerFn;
  defHandler?: { (event: Event): any } = undefined;
  constructor(params: Params) {
    const {type, handler} = params;
    this.type = type;
    this.handler = handler;
  }
}

export default EventHandler;
