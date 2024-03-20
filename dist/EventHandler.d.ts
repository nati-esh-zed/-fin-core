import Component from './Component.js';
export interface EventHandlerFn {
    (component: Component, event?: Event): any;
}
export interface Params {
    type: string;
    handler: EventHandlerFn;
}
declare class EventHandler {
    type: string;
    handler: EventHandlerFn;
    defHandler?: {
        (event: Event): any;
    };
    constructor(params: Params);
}
export default EventHandler;
//# sourceMappingURL=EventHandler.d.ts.map