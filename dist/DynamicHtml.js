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
var _DynamicHtml_htmlCb, _DynamicHtml_html;
import Component from './Component.js';
class DynamicHtml extends Component {
    constructor(params) {
        super(Object.assign({ tag: 'span' }, params));
        _DynamicHtml_htmlCb.set(this, void 0);
        _DynamicHtml_html.set(this, '');
        __classPrivateFieldSet(this, _DynamicHtml_htmlCb, params.html, "f");
    }
    get html() {
        return __classPrivateFieldGet(this, _DynamicHtml_html, "f");
    }
    set html(html) {
        __classPrivateFieldSet(this, _DynamicHtml_html, html, "f");
        this.update();
    }
    update() {
        if (super.update()) {
            const result = __classPrivateFieldGet(this, _DynamicHtml_htmlCb, "f").call(this, this);
            if (result instanceof Promise) {
                __classPrivateFieldSet(this, _DynamicHtml_html, '', "f");
                result.then((response) => __classPrivateFieldSet(this, _DynamicHtml_html, response, "f"));
            }
            else {
                __classPrivateFieldSet(this, _DynamicHtml_html, result || '', "f");
            }
            this.render();
            return true;
        }
        return false;
    }
    render() {
        if ((!this.renderCb || this.renderCb())) {
            this.node.innerHTML = __classPrivateFieldGet(this, _DynamicHtml_html, "f");
        }
        return this.node;
    }
}
_DynamicHtml_htmlCb = new WeakMap(), _DynamicHtml_html = new WeakMap();
export default DynamicHtml;
