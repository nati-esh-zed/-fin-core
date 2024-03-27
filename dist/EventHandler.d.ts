import { Component } from './Component.js';
export interface EventHandlerFn {
    (component: Component, event?: Event): any;
}
export interface EventHandlerParams {
    type: string;
    handler: EventHandlerFn;
}
export declare class EventHandler {
    type: string;
    handler: EventHandlerFn;
    defHandler?: {
        (event: Event): any;
    };
    constructor(params: EventHandlerParams);
}
//# sourceMappingURL=EventHandler.d.ts.map