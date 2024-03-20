'use strict';
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TextComponent_content, _TextComponent_node;
class TextComponent {
    constructor(content) {
        _TextComponent_content.set(this, void 0);
        _TextComponent_node.set(this, void 0);
        __classPrivateFieldSet(this, _TextComponent_content, content, "f");
        __classPrivateFieldSet(this, _TextComponent_node, document.createTextNode(this.content), "f");
    }
    get content() {
        return __classPrivateFieldGet(this, _TextComponent_content, "f");
    }
    set content(newContent) {
        __classPrivateFieldSet(this, _TextComponent_content, newContent, "f");
        this.render();
    }
    get node() {
        return __classPrivateFieldGet(this, _TextComponent_node, "f");
    }
    update(component) {
        return this.render();
    }
    render() {
        __classPrivateFieldGet(this, _TextComponent_node, "f").textContent = this.content;
        return __classPrivateFieldGet(this, _TextComponent_node, "f");
    }
}
_TextComponent_content = new WeakMap(), _TextComponent_node = new WeakMap();
export default TextComponent;
