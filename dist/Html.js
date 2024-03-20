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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Html_html;
Object.defineProperty(exports, "__esModule", { value: true });
const Component_js_1 = __importDefault(require("./Component.js"));
class Html extends Component_js_1.default {
    constructor(params) {
        super(Object.assign({ tag: 'span' }, params));
        _Html_html.set(this, void 0);
        __classPrivateFieldSet(this, _Html_html, params.html || '', "f");
    }
    get html() {
        return __classPrivateFieldGet(this, _Html_html, "f");
    }
    set html(html) {
        __classPrivateFieldSet(this, _Html_html, html, "f");
        this.update();
    }
    render() {
        this.node.innerHTML = __classPrivateFieldGet(this, _Html_html, "f");
        return super.render();
    }
}
_Html_html = new WeakMap();
exports.default = Html;
