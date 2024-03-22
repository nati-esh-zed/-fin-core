'use strict';
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Component_id, _Component_name, _Component_namespace, _Component_chain, _Component_tag, _Component_attributes, _Component_children, _Component_eventHandlers, _Component_node;
Object.defineProperty(exports, "__esModule", { value: true });
exports.chain = exports.merge = void 0;
const Attribute_js_1 = __importDefault(require("./Attribute.js"));
const TextComponent_js_1 = __importDefault(require("./TextComponent.js"));
const DynamicTextComponent_js_1 = __importDefault(require("./DynamicTextComponent.js"));
const DynamicAttribute_js_1 = __importDefault(require("./DynamicAttribute.js"));
class Component {
    get id() { return __classPrivateFieldGet(this, _Component_id, "f"); }
    get name() { return __classPrivateFieldGet(this, _Component_name, "f"); }
    get namespace() { return __classPrivateFieldGet(this, _Component_namespace, "f"); }
    get chain() { return __classPrivateFieldGet(this, _Component_chain, "f"); }
    get tag() { return __classPrivateFieldGet(this, _Component_tag, "f"); }
    get attributes() { return __classPrivateFieldGet(this, _Component_attributes, "f"); }
    get children() { return __classPrivateFieldGet(this, _Component_children, "f"); }
    get eventHandlers() { return __classPrivateFieldGet(this, _Component_eventHandlers, "f"); }
    get node() { return __classPrivateFieldGet(this, _Component_node, "f"); }
    constructor(params = {}) {
        _Component_id.set(this, void 0);
        _Component_name.set(this, void 0);
        _Component_namespace.set(this, void 0);
        _Component_chain.set(this, void 0);
        _Component_tag.set(this, void 0);
        _Component_attributes.set(this, void 0);
        _Component_children.set(this, void 0);
        _Component_eventHandlers.set(this, void 0);
        _Component_node.set(this, void 0);
        const { chain, tag, namespace, attributes, children, update, render, updateChild, renderChild } = params;
        const tag_ = tag !== null && tag !== void 0 ? tag : 'div';
        __classPrivateFieldSet(this, _Component_id, 'fid' + (++Component.ID_TOP), "f");
        __classPrivateFieldSet(this, _Component_name, this.constructor.name, "f");
        __classPrivateFieldSet(this, _Component_chain, chain
            ? chain.concat(Component._sGetChain(this))
            : Component._sGetChain(this), "f");
        __classPrivateFieldSet(this, _Component_tag, tag_.toLowerCase(), "f");
        this.updateCb = update;
        this.renderCb = render;
        this.updateChildCb = updateChild;
        this.renderChildCb = renderChild;
        const chosenNamespace = namespace
            ? (namespace.toLowerCase() === 'svg'
                ? 'http://www.w3.org/2000/svg'
                : namespace)
            : undefined;
        __classPrivateFieldSet(this, _Component_node, chosenNamespace
            ? document.createElementNS(chosenNamespace, __classPrivateFieldGet(this, _Component_tag, "f"))
            : document.createElement(__classPrivateFieldGet(this, _Component_tag, "f")), "f");
        // set attributes from params
        if (attributes) {
            this.setAttributes(attributes);
            this.updateAttributes();
        }
        if (Component.SET_NODE_FID) {
            __classPrivateFieldGet(this, _Component_node, "f").setAttribute('fid', __classPrivateFieldGet(this, _Component_id, "f"));
        }
        // children
        if (children)
            this.setChildren(children);
        // add the names of each inherited Component to class lists 
        for (let componentName of __classPrivateFieldGet(this, _Component_chain, "f")) {
            __classPrivateFieldGet(this, _Component_node, "f").classList.add(componentName);
        }
        __classPrivateFieldGet(this, _Component_node, "f").classList.add('Component');
        return this;
    }
    alter(params) {
        const { attributes, children, update, render } = params;
        if (attributes) {
            this.setAttributes(attributes);
            this.updateAttributes();
        }
        if (children) {
            this.setChildren(children);
        }
        if (update) {
            this.updateCb = update;
        }
        if (render) {
            this.renderCb = render;
        }
        return this;
    }
    cloneAttribute(attribute) {
        const { name, value } = attribute;
        let clonedAttribute;
        if (attribute instanceof DynamicAttribute_js_1.default) {
            clonedAttribute = new DynamicAttribute_js_1.default({
                name: name,
                value: value
            });
        }
        else {
            clonedAttribute = new Attribute_js_1.default({
                name: name,
                value: value
            });
        }
        return clonedAttribute;
    }
    cloneAttributes(attributes) {
        const clonedAttributes = new Array;
        for (let attribute of attributes) {
            const clonedAttribute = this.cloneAttribute(attribute);
            clonedAttributes.push(clonedAttribute);
        }
        return clonedAttributes;
    }
    hasAttribute(name) {
        return __classPrivateFieldGet(this, _Component_attributes, "f") &&
            __classPrivateFieldGet(this, _Component_attributes, "f").findIndex((attribute) => attribute.name === name) !== -1;
    }
    setAttributes(attributes) {
        if (!__classPrivateFieldGet(this, _Component_attributes, "f"))
            __classPrivateFieldSet(this, _Component_attributes, new Array, "f");
        for (let name of Object.keys(attributes)) {
            if (!this.hasAttribute(name)) {
                const attribute = new Attribute_js_1.default({ name: name, value: attributes[name] });
                const resAttribute = this._mProcessAttribute(attribute);
                if (resAttribute !== undefined)
                    __classPrivateFieldGet(this, _Component_attributes, "f").push(resAttribute);
            }
        }
    }
    setChildren(children) {
        if (children) {
            __classPrivateFieldSet(this, _Component_children, new Array, "f");
            for (let child of children) {
                if (child instanceof Component ||
                    child instanceof TextComponent_js_1.default) {
                    __classPrivateFieldGet(this, _Component_children, "f").push(child);
                }
                else if (typeof child === 'string' ||
                    typeof child === 'undefined') {
                    const textComponent = new TextComponent_js_1.default(child || '');
                    __classPrivateFieldGet(this, _Component_children, "f").push(textComponent);
                }
                else if (typeof child === 'function') {
                    const dynamicTextComponent = new DynamicTextComponent_js_1.default(child);
                    __classPrivateFieldGet(this, _Component_children, "f").push(dynamicTextComponent);
                }
            }
        }
    }
    updateAttribute(attribute) {
        if (!__classPrivateFieldGet(this, _Component_attributes, "f") || (__classPrivateFieldGet(this, _Component_attributes, "f").indexOf(attribute) === -1))
            throw 'attribute does not belong to the component';
        this._mUpdateAttribute(attribute);
    }
    updateAttributes() {
        if (__classPrivateFieldGet(this, _Component_attributes, "f")) {
            for (let attribute of __classPrivateFieldGet(this, _Component_attributes, "f")) {
                this._mUpdateAttribute(attribute);
            }
        }
    }
    update() {
        if (this.updateCb && !this.updateCb())
            return false;
        this.updateAttributes();
        if (__classPrivateFieldGet(this, _Component_children, "f")) {
            for (let child of __classPrivateFieldGet(this, _Component_children, "f")) {
                this._mUpdate(child);
            }
        }
        return true;
    }
    updateChild(child) {
        if (!__classPrivateFieldGet(this, _Component_children, "f") || (__classPrivateFieldGet(this, _Component_children, "f").indexOf(child) === -1))
            throw 'child does not belong to the component';
        this._mUpdate(child);
    }
    render() {
        if (__classPrivateFieldGet(this, _Component_children, "f") &&
            (!this.renderCb || this.renderCb())) {
            __classPrivateFieldGet(this, _Component_node, "f").replaceChildren();
            for (let child of __classPrivateFieldGet(this, _Component_children, "f")) {
                if (child instanceof Component) {
                    child.render();
                    __classPrivateFieldGet(this, _Component_node, "f").appendChild(child.node);
                }
                else if (child instanceof TextComponent_js_1.default) {
                    __classPrivateFieldGet(this, _Component_node, "f").appendChild(child.node);
                }
            }
        }
        return __classPrivateFieldGet(this, _Component_node, "f");
    }
    addEventHandler(eventHandler) {
        if (!__classPrivateFieldGet(this, _Component_eventHandlers, "f"))
            __classPrivateFieldSet(this, _Component_eventHandlers, new Array, "f");
        if (__classPrivateFieldGet(this, _Component_eventHandlers, "f")) {
            eventHandler.defHandler = (event) => { eventHandler.handler(this, event); };
            const { type, defHandler } = eventHandler;
            __classPrivateFieldGet(this, _Component_eventHandlers, "f").push(eventHandler);
            __classPrivateFieldGet(this, _Component_node, "f").removeEventListener(type, defHandler);
            __classPrivateFieldGet(this, _Component_node, "f").addEventListener(type, defHandler);
        }
    }
    _mProcessAttribute(attribute) {
        if (attribute.name.indexOf('on') === 0) {
            if (typeof attribute.value === 'function') {
                this.addEventHandler({
                    type: attribute.name.substring(2).toLowerCase(),
                    handler: attribute.value
                });
                return undefined;
            }
        }
        else if (attribute.name === 'style' &&
            typeof attribute.value === 'object') {
            for (let key of Object.keys(attribute.value))
                __classPrivateFieldGet(this, _Component_node, "f").style[key] = attribute.value[key];
            return undefined;
        }
        else if (typeof attribute.value === 'function') {
            const dynamicAttribute = new DynamicAttribute_js_1.default({
                name: attribute.name,
                value: attribute.value
            });
            return dynamicAttribute;
        }
        return attribute;
    }
    _mUpdateAttribute(attribute) {
        if (attribute instanceof DynamicAttribute_js_1.default)
            attribute.update(this);
        __classPrivateFieldGet(this, _Component_node, "f").attributes.setNamedItem(attribute.node);
    }
    _mUpdate(child) {
        if (child instanceof Component) {
            child.update();
        }
        else if (child instanceof DynamicTextComponent_js_1.default) {
            child.update(this);
        }
        return child;
    }
    static _sGetChain(component) {
        let comp = component;
        let prototypes = new Array;
        for (; comp &&
            comp.constructor.name !== 'Component'; comp = Object.getPrototypeOf(comp)) {
            prototypes.push(comp.constructor.name);
        }
        return prototypes;
    }
}
_Component_id = new WeakMap(), _Component_name = new WeakMap(), _Component_namespace = new WeakMap(), _Component_chain = new WeakMap(), _Component_tag = new WeakMap(), _Component_attributes = new WeakMap(), _Component_children = new WeakMap(), _Component_eventHandlers = new WeakMap(), _Component_node = new WeakMap();
Component.SET_NODE_FID = false;
Component.ID_TOP = 0;
/**
 * Merges the two parameter ojects with the `higherPriorityParams`
 * overriding properties in `params`.
 *
 * @param higherPriorityParams
 * @param params
 * @returns the merged Params object
 */
function merge(higherPriorityParams, params) {
    var _a;
    return Object.assign(Object.assign(Object.assign({}, params), higherPriorityParams), { chain: (params.chain && higherPriorityParams.chain
            ? params.chain.concat(higherPriorityParams.chain)
            : ((_a = params.chain) !== null && _a !== void 0 ? _a : higherPriorityParams.chain)), attributes: Object.assign(Object.assign(Object.assign({}, params.attributes), higherPriorityParams.attributes), (params.attributes && 'style' in params.attributes &&
            higherPriorityParams.attributes && 'style' in higherPriorityParams.attributes
            ? {
                style: Object.assign(Object.assign({}, params.attributes.style), higherPriorityParams.attributes.style)
            }
            : {})) });
}
exports.merge = merge;
/**
 * Calls `merge` then appends `name` to the chain
 *
 * @param name
 * @param higherPriorityParams
 * @param params
 * @returns the chained Params object
 */
function chain(name, higherPriorityParams, params = {}) {
    console.assert(!!name && typeof name === 'string', 'name must be a non empty string');
    const rParams = higherPriorityParams
        ? merge(params, higherPriorityParams)
        : params;
    rParams.chain = rParams.chain === undefined
        ? [name]
        : rParams.chain.concat(name);
    return rParams;
}
exports.chain = chain;
exports.default = Component;
