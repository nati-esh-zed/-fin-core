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
var _Attribute_name, _Attribute_value, _Attribute_node;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attribute = void 0;
class Attribute {
    constructor(params) {
        _Attribute_name.set(this, void 0);
        _Attribute_value.set(this, void 0);
        _Attribute_node.set(this, void 0);
        const { name, value } = params;
        __classPrivateFieldSet(this, _Attribute_name, name, "f");
        __classPrivateFieldSet(this, _Attribute_value, value, "f");
        __classPrivateFieldSet(this, _Attribute_node, document.createAttribute(__classPrivateFieldGet(this, _Attribute_name, "f")), "f");
        __classPrivateFieldGet(this, _Attribute_node, "f").value = __classPrivateFieldGet(this, _Attribute_value, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _Attribute_name, "f");
    }
    get value() {
        return __classPrivateFieldGet(this, _Attribute_value, "f");
    }
    set value(newValue) {
        __classPrivateFieldSet(this, _Attribute_value, newValue, "f");
        __classPrivateFieldGet(this, _Attribute_node, "f").value = __classPrivateFieldGet(this, _Attribute_value, "f");
    }
    get node() {
        return __classPrivateFieldGet(this, _Attribute_node, "f");
    }
}
exports.Attribute = Attribute;
_Attribute_name = new WeakMap(), _Attribute_value = new WeakMap(), _Attribute_node = new WeakMap();
