'use strict'

import { Component } from './Component.js';

export interface EventHandlerFn { (component: Component, event?: Event): any }

export interface EventHandlerParams {
  type: string;
  handler: EventHandlerFn;
}

export class EventHandler { 
  type: string;
  handler: EventHandlerFn;
  defHandler?: { (event: Event): any } = undefined;
  constructor(params: &EventHandlerParams) {
    const {type, handler} = params;
    this.type = type;
    this.handler = handler;
  }
}
