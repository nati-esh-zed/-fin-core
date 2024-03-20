'use strict';
class EventHandler {
    constructor(params) {
        this.defHandler = undefined;
        const { type, handler } = params;
        this.type = type;
        this.handler = handler;
    }
}
export default EventHandler;
