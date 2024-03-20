"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
class Manager {
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
exports.Manager = Manager;
exports.default = Manager;
