export class Manager {
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
export default Manager;
