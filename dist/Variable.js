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
var _Variable_value, _Variable_references;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variable = void 0;
const DynamicAttribute_js_1 = require("./DynamicAttribute.js");
const DynamicTextComponent_js_1 = require("./DynamicTextComponent.js");
class Variable {
    constructor(initialValue) {
        _Variable_value.set(this, void 0);
        _Variable_references.set(this, void 0);
        __classPrivateFieldSet(this, _Variable_value, initialValue, "f");
        __classPrivateFieldSet(this, _Variable_references, new Map(), "f");
        this.tRef = this.tRef.bind(this);
        this.fetch = this.fetch.bind(this);
        this.refer = this.refer.bind(this);
        this.tRefer = this.tRefer.bind(this);
        this.update = this.update.bind(this);
    }
    set value(newValue) {
        __classPrivateFieldSet(this, _Variable_value, newValue, "f");
        this.update();
    }
    get value() {
        return __classPrivateFieldGet(this, _Variable_value, "f");
    }
    get tValue() {
        return this.then
            ? this.then(__classPrivateFieldGet(this, _Variable_value, "f"))
            : __classPrivateFieldGet(this, _Variable_value, "f");
    }
    get references() {
        return __classPrivateFieldGet(this, _Variable_references, "f");
    }
    fetch() {
        return __classPrivateFieldGet(this, _Variable_value, "f");
    }
    addReference(component, child) {
        const reference = __classPrivateFieldGet(this, _Variable_references, "f").get(component);
        if (reference) {
            if (!reference.has(child)) {
                reference.add(child);
                return true;
            }
        }
        else {
            const targets = new Set();
            targets.add(child);
            __classPrivateFieldGet(this, _Variable_references, "f").set(component, targets);
            return true;
        }
        return false;
    }
    tRef(then) {
        this.then = then;
        return this.tRefer;
    }
    refer(component, child) {
        console.assert(!!component, 'component cannot be null');
        this.addReference(component, child);
        return __classPrivateFieldGet(this, _Variable_value, "f");
    }
    tRefer(component, child) {
        console.assert(!!component, 'component cannot be null');
        this.addReference(component, child);
        return this.tValue;
    }
    update() {
        for (let [component, targets] of this.references) {
            for (let child of targets) {
                if (child !== undefined) {
                    if (child instanceof DynamicTextComponent_js_1.DynamicTextComponent) {
                        component.updateChild(child);
                    }
                    else if (child instanceof DynamicAttribute_js_1.DynamicAttribute) {
                        component.updateAttribute(child);
                    }
                }
                else
                    component.update();
            }
        }
        return __classPrivateFieldGet(this, _Variable_value, "f");
    }
}
exports.Variable = Variable;
_Variable_value = new WeakMap(), _Variable_references = new WeakMap();
