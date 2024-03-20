'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class EventHandler {
    constructor(params) {
        this.defHandler = undefined;
        const { type, handler } = params;
        this.type = type;
        this.handler = handler;
    }
}
exports.default = EventHandler;
