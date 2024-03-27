'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
class EventHandler {
    constructor(params) {
        this.defHandler = undefined;
        const { type, handler } = params;
        this.type = type;
        this.handler = handler;
    }
}
exports.EventHandler = EventHandler;
