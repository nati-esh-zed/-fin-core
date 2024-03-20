'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chain = exports.inheritParams = void 0;
const Attribute_js_1 = __importDefault(require("./Attribute.js"));
const TextComponent_js_1 = __importDefault(require("./TextComponent.js"));
const DynamicTextComponent_js_1 = __importDefault(require("./DynamicTextComponent.js"));
const DynamicAttribute_js_1 = __importDefault(require("./DynamicAttribute.js"));
class Component {
    constructor(params = {}) {
        const { chain, tag, attributes, children, update, render, updateChild, renderChild } = params;
        const tag_ = tag !== null && tag !== void 0 ? tag : 'div';
        this.id = 'fid' + (++Component.ID_TOP);
        this.name = this.constructor.name;
        this.chain = Component._sGetChain(this);
        this.tag = tag_;
        this.updateCb = update;
        this.renderCb = render;
        this.updateChildCb = updateChild;
        this.renderChildCb = renderChild;
        this.node = document.createElement(this.tag);
        // set attributes from params
        if (attributes) {
            this.setAttributes(attributes);
            this.updateAttributes();
        }
        if (Component.SET_NODE_FID) {
            this.node.setAttribute('fid', this.id);
        }
        // children
        if (children)
            this.setChildren(children);
        // add the names of each inherited Component to class lists 
        if (chain)
            this.chain = this.chain.concat(chain);
        for (let componentName of this.chain) {
            this.node.classList.add(componentName);
        }
        this.node.classList.add('Component');
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
        return this.attributes &&
            this.attributes.findIndex((attribute) => attribute.name === name) !== -1;
    }
    setAttributes(attributes) {
        if (!this.attributes)
            this.attributes = new Array;
        for (let name of Object.keys(attributes)) {
            if (!this.hasAttribute(name)) {
                const attribute = new Attribute_js_1.default({ name: name, value: attributes[name] });
                const resAttribute = this._mProcessAttribute(attribute);
                if (resAttribute !== undefined)
                    this.attributes.push(resAttribute);
            }
        }
    }
    setChildren(children) {
        if (children) {
            this.children = new Array;
            for (let child of children) {
                if (child instanceof Component ||
                    child instanceof TextComponent_js_1.default) {
                    this.children.push(child);
                }
                else if (typeof child === 'string' ||
                    typeof child === 'undefined') {
                    const textComponent = new TextComponent_js_1.default(child || '');
                    this.children.push(textComponent);
                }
                else if (typeof child === 'function') {
                    const dynamicTextComponent = new DynamicTextComponent_js_1.default(child);
                    this.children.push(dynamicTextComponent);
                }
            }
        }
    }
    updateAttribute(attribute) {
        if (!this.attributes || (this.attributes.indexOf(attribute) === -1))
            throw 'attribute does not belong to the component';
        this._mUpdateAttribute(attribute);
    }
    updateAttributes() {
        if (this.attributes) {
            for (let attribute of this.attributes) {
                this._mUpdateAttribute(attribute);
            }
        }
    }
    update() {
        if (this.updateCb && !this.updateCb())
            return false;
        this.updateAttributes();
        if (this.children) {
            for (let child of this.children) {
                this._mUpdate(child);
            }
        }
        return true;
    }
    updateChild(child) {
        if (!this.children || (this.children.indexOf(child) === -1))
            throw 'child does not belong to the component';
        this._mUpdate(child);
    }
    render() {
        if (this.children &&
            (!this.renderCb || this.renderCb())) {
            this.node.replaceChildren();
            for (let child of this.children) {
                if (child instanceof Component) {
                    child.render();
                    this.node.appendChild(child.node);
                }
                else if (child instanceof TextComponent_js_1.default) {
                    this.node.appendChild(child.node);
                }
            }
        }
        return this.node;
    }
    addEventHandler(eventHandler) {
        if (!this.eventHandlers)
            this.eventHandlers = new Array;
        if (this.eventHandlers) {
            eventHandler.defHandler = (event) => { eventHandler.handler(this, event); };
            const { type, defHandler } = eventHandler;
            this.eventHandlers.push(eventHandler);
            this.node.removeEventListener(type, defHandler);
            this.node.addEventListener(type, defHandler);
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
                this.node.style[key] = attribute.value[key];
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
        this.node.attributes.setNamedItem(attribute.node);
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
Component.SET_NODE_FID = false;
Component.ID_TOP = 0;
function inheritParams(params, overrideParams) {
    return Object.assign(Object.assign(Object.assign({}, params), overrideParams), { attributes: Object.assign(Object.assign(Object.assign({}, params.attributes), overrideParams.attributes), (params.attributes && 'style' in params.attributes &&
            overrideParams.attributes && 'style' in overrideParams.attributes
            ? {
                style: Object.assign(Object.assign({}, params.attributes['style']), overrideParams.attributes['style'])
            }
            : {})) });
}
exports.inheritParams = inheritParams;
function chain(name, params = {}, overrideParams) {
    const rParams = overrideParams
        ? inheritParams(params, overrideParams)
        : params;
    rParams.chain = rParams.chain === undefined
        ? [name]
        : rParams.chain.concat(name);
    return rParams;
}
exports.chain = chain;
exports.default = Component;
