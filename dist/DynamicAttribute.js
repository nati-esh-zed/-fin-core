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
var _DynamicAttribute_valueCb;
import Attribute from "./Attribute.js";
class DynamicAttribute extends Attribute {
    constructor(params) {
        const { name, value } = params;
        super({
            name: name, value: undefined
        });
        _DynamicAttribute_valueCb.set(this, void 0);
        __classPrivateFieldSet(this, _DynamicAttribute_valueCb, value, "f");
    }
    update(component) {
        this.value = __classPrivateFieldGet(this, _DynamicAttribute_valueCb, "f").call(this, component, this) || '';
        return true;
    }
}
_DynamicAttribute_valueCb = new WeakMap();
export default DynamicAttribute;
