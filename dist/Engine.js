"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engine = void 0;
class Engine {
    constructor(rootElement, rootComponent) {
        this.rootElement = rootElement;
        this.rootComponent = rootComponent;
    }
    update() {
        this.rootComponent.update();
        return this;
    }
    render() {
        const output = this.rootComponent.render();
        this.rootElement.replaceChildren(output);
        return this;
    }
}
exports.Engine = Engine;
exports.default = Engine;
