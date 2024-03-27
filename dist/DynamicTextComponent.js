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
var _DynamicTextComponent_contentCb;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicTextComponent = void 0;
const TextComponent_js_1 = require("./TextComponent.js");
class DynamicTextComponent extends TextComponent_js_1.TextComponent {
    constructor(contentCb) {
        super('');
        _DynamicTextComponent_contentCb.set(this, void 0);
        __classPrivateFieldSet(this, _DynamicTextComponent_contentCb, contentCb, "f");
    }
    update(component) {
        const result = __classPrivateFieldGet(this, _DynamicTextComponent_contentCb, "f").call(this, component, this);
        if (result instanceof Promise) {
            this.content = '';
            result.then((response) => this.content = response);
        }
        else {
            this.content = result || '';
        }
        return super.update(component);
    }
}
exports.DynamicTextComponent = DynamicTextComponent;
_DynamicTextComponent_contentCb = new WeakMap();
