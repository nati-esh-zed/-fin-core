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
var _AsyncVariable_promise;
import Variable from './Variable.js';
class AsyncVariable extends Variable {
    constructor(promise, initialValue) {
        super(initialValue);
        _AsyncVariable_promise.set(this, void 0);
        __classPrivateFieldSet(this, _AsyncVariable_promise, promise, "f");
        this.refer = this.refer.bind(this);
    }
    set promise(promise) {
        __classPrivateFieldSet(this, _AsyncVariable_promise, promise, "f");
        __classPrivateFieldGet(this, _AsyncVariable_promise, "f").then((result) => {
            this.value = result;
        });
    }
    get promise() {
        return __classPrivateFieldGet(this, _AsyncVariable_promise, "f");
    }
    refer(component, child) {
        console.assert(!!component, 'component cannot be null');
        if (this.addReference(component, child)) {
            __classPrivateFieldGet(this, _AsyncVariable_promise, "f").then((result) => {
                this.value = result;
            });
        }
        return this.value;
    }
    tRefer(component, child) {
        console.assert(!!component, 'component cannot be null');
        if (this.addReference(component, child)) {
            __classPrivateFieldGet(this, _AsyncVariable_promise, "f").then((result) => {
                this.value = result;
            });
        }
        return this.tValue;
    }
}
_AsyncVariable_promise = new WeakMap();
export default AsyncVariable;
