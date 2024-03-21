'use strict'

import Attribute from './Attribute.js';
import EventHandler from './EventHandler.js';
import TextComponent from './TextComponent.js';
import DynamicTextComponent, { ContentFn } from './DynamicTextComponent.js';
import DynamicAttribute from './DynamicAttribute.js';
import AttributeType from './types/AttributesType.js';

export type ComponentAttributeType   = &Attribute|&DynamicAttribute;
export type ComponentAttributesType  = &AttributeType;
export type ComponentStoredChildType = &Component|&TextComponent|&DynamicTextComponent;
export type ComponentChildType       = 
  &Component|&TextComponent|&DynamicTextComponent|&ContentFn|string|undefined;
export type ComponentChildrenType    = Array<ComponentChildType>;

export interface UpdateFn { (): boolean }
export interface RenderFn { (): boolean }
export interface UpdateChildFn { (child: ComponentStoredChildType): boolean }
export interface RenderChildFn { (child: ComponentStoredChildType): void }

export interface Params {
  chain?: Array<string>,
  tag?: string,
  attributes?: ComponentAttributesType,
  children?: ComponentChildrenType,
  update?: UpdateFn;
  render?: RenderFn;
  updateChild?: UpdateChildFn;
  renderChild?: RenderChildFn;
}

export interface ComponentAlterParams {
  attributes?: ComponentAttributesType,
  children?: ComponentChildrenType,
  update?: UpdateFn;
  render?: RenderFn;
  updateChild?: UpdateChildFn;
  renderChild?: RenderChildFn;
}

class Component {
  static SET_NODE_FID = false;
  static ID_TOP: number = 0;

  #id: string;
  #name: string;
  #chain: Array<string>;
  #tag: string;
  #attributes?: Array<ComponentAttributeType>;
  #children?: Array<ComponentStoredChildType>;
  #eventHandlers?: Array<EventHandler>
  updateCb?: UpdateFn;
  renderCb?: RenderFn;
  updateChildCb?: UpdateChildFn;
  renderChildCb?: RenderChildFn;

  #node: HTMLElement;
  
  get id() { return this.#id; }
  get name() { return this.#name; }
  get chain() { return this.#chain; }
  get tag() { return this.#tag; }
  get attributes() { return this.#attributes; }
  get children() { return this.#children; }
  get eventHandlers() { return this.#eventHandlers; }
  get node() { return this.#node; }

  constructor(params: Params = {}) {
    const {chain, tag, attributes, children, 
      update, render, updateChild, renderChild} = params;
    const tag_ = tag ?? 'div';
    this.#id = 'fid'+(++Component.ID_TOP);
    this.#name = this.constructor.name;
    this.#chain = chain 
      ? chain.concat(Component._sGetChain(this))
      : Component._sGetChain(this);
    this.#tag = tag_;
    this.updateCb = update;
    this.renderCb = render;
    this.updateChildCb = updateChild;
    this.renderChildCb = renderChild;
    this.#node = document.createElement(this.#tag);
    // set attributes from params
    if(attributes) {
      this.setAttributes(attributes);
      this.updateAttributes();
    }
    if(Component.SET_NODE_FID) {
      this.#node.setAttribute('fid', this.#id);
    }
    // children
    if(children)
      this.setChildren(children);
    // add the names of each inherited Component to class lists 
    for(let componentName of this.#chain) {
      this.#node.classList.add(componentName);
    }
    this.#node.classList.add('Component');
    return this;
  }

  alter(params: ComponentAlterParams) {
    const {attributes, children, update, render} = params;
    if(attributes) {
      this.setAttributes(attributes);
      this.updateAttributes();
    }
    if(children) {
      this.setChildren(children);
    }
    if(update) {
      this.updateCb = update;
    }
    if(render) {
      this.renderCb = render;
    }
    return this;
  }

  cloneAttribute(attribute: ComponentAttributeType) {
    const { name, value } = attribute;
    let clonedAttribute;
    if(attribute instanceof DynamicAttribute) {
      clonedAttribute = new DynamicAttribute({
        name: name,
        value: value
      });
    } else {
      clonedAttribute = new Attribute({
        name: name,
        value: value
      });
    }
    return clonedAttribute;
  } 

  cloneAttributes(attributes: Array<ComponentAttributeType>) {
    const clonedAttributes = new Array<ComponentAttributeType>;
    for(let attribute of attributes) {
      const clonedAttribute = this.cloneAttribute(attribute);
      clonedAttributes.push(clonedAttribute);
    }
    return clonedAttributes;
  }

  hasAttribute(name: string) {
    return this.#attributes && 
      this.#attributes.findIndex(
        (attribute) => attribute.name === name) !== -1;
  }

  setAttributes(attributes: ComponentAttributesType) {
    if(!this.#attributes) 
      this.#attributes = new Array<ComponentAttributeType>;
      for(let name of Object.keys(attributes)) {
        if(!this.hasAttribute(name)) {
          const attribute = new Attribute({name: name, value: attributes[name]});
          const resAttribute = this._mProcessAttribute(attribute);
          if(resAttribute !== undefined)
            this.#attributes.push(resAttribute);
        }
    }
  }

  setChildren(children?: ComponentChildrenType) {
    if(children) {
      this.#children = new Array<ComponentStoredChildType>;
      for(let child of children) {
        if(child instanceof Component ||
          child instanceof TextComponent) 
        {
          this.#children.push(child);
        } else if(typeof child === 'string' ||
          typeof child === 'undefined') 
        {
          const textComponent = new TextComponent(child || '');
          this.#children.push(textComponent);
        } else if(typeof child === 'function') {
          const dynamicTextComponent = new DynamicTextComponent(child);
          this.#children.push(dynamicTextComponent);
        }
      }
    }
  }

  updateAttribute(attribute: ComponentAttributeType) {
    if(!this.#attributes || (this.#attributes.indexOf(attribute) === -1))
      throw 'attribute does not belong to the component';
    this._mUpdateAttribute(attribute);
  }

  updateAttributes() {
    if(this.#attributes) {
      for(let attribute of this.#attributes) {
        this._mUpdateAttribute(attribute);
      }
    }
  }
  
  update() {
    if(this.updateCb && !this.updateCb())
      return false;
    this.updateAttributes();
    if(this.#children) {
      for(let child of this.#children) {
        this._mUpdate(child);
      }
    }
    return true;
  }

  updateChild(child: ComponentStoredChildType) {
    if(!this.#children || (this.#children.indexOf(child) === -1))
      throw 'child does not belong to the component';
    this._mUpdate(child);
  }

  render() {
    if(this.#children && 
      (!this.renderCb || this.renderCb()))
    {
      this.#node.replaceChildren();
      for(let child of this.#children) {
        if(child instanceof Component) {
          child.render();
          this.#node.appendChild(child.node);
        } else if(child instanceof TextComponent) {
          this.#node.appendChild(child.node);
        }
      }
    }
    return this.#node; 
  }

  addEventHandler(eventHandler: EventHandler) {
    if(!this.#eventHandlers)
      this.#eventHandlers = new Array<EventHandler>;
    if(this.#eventHandlers) {
      eventHandler.defHandler = (event: Event) => { eventHandler.handler(this, event); };
      const {type, defHandler} = eventHandler;
      this.#eventHandlers.push(eventHandler);
      this.#node.removeEventListener(type, defHandler);
      this.#node.addEventListener(type, defHandler);
    }
  }

  private _mProcessAttribute(attribute: Attribute) {
    if(attribute.name.indexOf('on') === 0) {
      if(typeof attribute.value === 'function') {
        this.addEventHandler({
          type: attribute.name.substring(2).toLowerCase(),
          handler: attribute.value
        });
        return undefined;
      }
    } else if(attribute.name === 'style' && 
      typeof attribute.value === 'object') 
    {
      for(let key of Object.keys(attribute.value))
        this.#node.style[key] = attribute.value[key];
      return undefined;
    } else if(typeof attribute.value === 'function') {
      const dynamicAttribute = new DynamicAttribute({
        name: attribute.name,
        value: attribute.value
      });
      return dynamicAttribute;
    } 
    return attribute;
  }

  private _mUpdateAttribute(attribute: ComponentAttributeType) {
    if(attribute instanceof DynamicAttribute)
      attribute.update(this);
    this.#node.attributes.setNamedItem(attribute.node);
  }

  private _mUpdate(child: ComponentStoredChildType) {
    if(child instanceof Component) {
      child.update();
    } else if(child instanceof DynamicTextComponent) {
      child.update(this);
    }
    return child;
  }

  private static _sGetChain(component: Component)
    : Array<string>
  {
    let comp = component;
    let prototypes = new Array<string>;
    for(; comp && 
      comp.constructor.name !== 'Component'; 
      comp = Object.getPrototypeOf(comp)
    ) {
      prototypes.push(comp.constructor.name);
    }
    return prototypes;
  }
  
}

/**
 * Merges the two parameter ojects with the `higherPriorityParams`
 * overriding properties in `params`.
 * 
 * @param higherPriorityParams 
 * @param params 
 * @returns the merged Params object
 */
export function merge(
  higherPriorityParams: Params,
  params: Params
) : Params
{
  return {
    ...params,
    ...higherPriorityParams,
    chain: (params.chain && higherPriorityParams.chain
      ? params.chain.concat(higherPriorityParams.chain)
      : (params.chain ?? higherPriorityParams.chain)
    ),
    attributes: { 
      ...params.attributes, 
      ...higherPriorityParams.attributes,
      ...(params.attributes && 'style' in params.attributes && 
          higherPriorityParams.attributes && 'style' in higherPriorityParams.attributes
        ? {
          style: {
            ...params.attributes.style,
            ...higherPriorityParams.attributes.style
          }
        }
        : {})
    },
  }! as Params;
}

/**
 * Calls `merge` then appends `name` to the chain 
 * 
 * @param name 
 * @param higherPriorityParams 
 * @param params 
 * @returns the chained Params object
 */
export function chain(name: string, 
  higherPriorityParams?: Params,
  params: Params = {}
) : Params 
{
  console.assert(!!name && typeof name === 'string', 'name must be a non empty string');
  const rParams = higherPriorityParams
    ? merge(params, higherPriorityParams)
    : params;
  rParams.chain = rParams.chain === undefined
    ? [name]
    : rParams.chain.concat(name);
  return rParams;
}


export default Component;
