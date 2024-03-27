'use strict'

import { Attribute } from './Attribute.js';
import { EventHandler } from './EventHandler.js';
import { TextComponent } from './TextComponent.js';
import { DynamicTextComponent, ContentFn } from './DynamicTextComponent.js';
import { DynamicAttribute } from './DynamicAttribute.js';
import { AttributesType } from './types/AttributesType.js';

export type ComponentAttributeType   = &Attribute|&DynamicAttribute;
export type ComponentAttributesType  = &AttributesType;
export type ComponentStoredChildType = &Component|&TextComponent|&DynamicTextComponent;
export type ComponentChildType       = 
  &Component|&TextComponent|&DynamicTextComponent|&ContentFn|string|undefined;
export type ComponentChildrenType    = Array<ComponentChildType>;

export interface UpdateFn { (component?: &Component): boolean }
export interface RenderFn { (component?: &Component): boolean }
export interface UpdateChildFn { (component?: &Component, child?: &ComponentStoredChildType): boolean }
export interface RenderChildFn { (component?: &Component, child?: &ComponentStoredChildType): void }

export interface Params {
  name?: string,
  chain?: Array<string>,
  tag?: string,
  namespace?: string|undefined;
  attributes?: &ComponentAttributesType,
  children?: ComponentChildrenType,
  update?: UpdateFn;
  render?: RenderFn;
  updateChild?: UpdateChildFn;
  renderChild?: RenderChildFn;
}

export interface ComponentAlterParams {
  attributes?: &ComponentAttributesType,
  children?: ComponentChildrenType,
  update?: UpdateFn;
  render?: RenderFn;
  updateChild?: UpdateChildFn;
  renderChild?: RenderChildFn;
}

export class Component {
  static SET_NODE_FID_ATTRIBUTE = true;
  static ID_TOP: number = 0;

  #id: string;
  #name: string;
  #namespace: string|undefined;
  #chain: Array<string>;
  #tag: string;
  #attributes?: Array<ComponentAttributeType>;
  #children?: Array<ComponentStoredChildType>;
  #eventHandlers?: Array<EventHandler>;
  #cssStrings?: Array<string>;
  #styleNodes?: Array<HTMLStyleElement>;
  #params: &Params;  
  updateCb?: UpdateFn;
  renderCb?: RenderFn;
  updateChildCb?: UpdateChildFn;
  renderChildCb?: RenderChildFn;

  #node: HTMLElement|SVGElement;
  
  get id() { return this.#id; }
  get name() { return this.#name; }
  get namespace() { return this.#namespace; }
  get chain() { return this.#chain; }
  get tag() { return this.#tag; }
  get attributes() { return this.#attributes; }
  get children() { return this.#children; }
  get eventHandlers() { return this.#eventHandlers; }
  get node() { return this.#node; }
  get cssStrings() { return this.#cssStrings; }
  get styleNodes() { return this.#styleNodes; }
  get params() { return this.#params; }

  constructor(params: &Params = {}) {
    const {name, chain, tag, namespace, attributes, children, 
      update, render, updateChild, renderChild} = params;
    this.#params = params;
    const tag_  = tag ?? 'div';
    this.#name  = name ?? this.constructor.name;
    this.#id    = (this.#name ? this.#name : 'Component') + '-' + (++Component.ID_TOP);
    this.#chain = chain 
      ? chain.concat(Component._sGetChain(this))
      : Component._sGetChain(this);
    if(name)
      this.#chain.unshift(name);
    this.#tag = tag_.toLowerCase();
    if(update)
      this.updateCb = update.bind(this);
    if(render)
      this.renderCb = render.bind(this);
    if(updateChild)
      this.updateChildCb = updateChild.bind(this);
    if(renderChild)
      this.renderChildCb = renderChild.bind(this);
    const chosenNamespace = namespace
      ? (namespace.toLowerCase() === 'svg' 
        ? 'http://www.w3.org/2000/svg' 
        : namespace)
      : undefined;
    this.#node = chosenNamespace
      ? document.createElementNS(chosenNamespace, this.#tag)! as HTMLElement|SVGElement
      : document.createElement(this.#tag);
    // set attributes from params
    if(attributes) {
      this.setAttributes(attributes);
      this.updateAttributes();
    }
    if(Component.SET_NODE_FID_ATTRIBUTE) {
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

  alter(params: &ComponentAlterParams) {
    this.#params = merge(params, this.#params);
    const {attributes, children, update, render} = this.#params;
    if(attributes) {
      this.setAttributes(attributes);
      this.updateAttributes();
    }
    if(children) {
      this.setChildren(children);
    }
    if(update)
      this.updateCb = update.bind(this);
    if(render)
      this.renderCb = render.bind(this);
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
    if(this.updateCb && !this.updateCb(this))
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

  styled(format: TemplateStringsArray, ...args: any) {
    let css = format[0];
    const length = args.length;
    for(let i = 0; i < length; i++) {
      const arg = args[i];
      if(arg instanceof Function)
        css += arg(this) + format[i+1];
      else 
        css += arg + format[i+1];
    }
    this._mAddStyle(css);
    return this;
  }

  private _mAddStyle(css) {
    if(!this.#cssStrings)
      this.#cssStrings = new Array<string>;
    if(!this.#styleNodes)
      this.#styleNodes = new Array<HTMLStyleElement>;
    const styleElement = document.createElement('style');
    styleElement.innerHTML = css;
    if(this.#name)
      styleElement.setAttribute('for', this.#id);
    styleElement.setAttribute('index', this.#styleNodes.length.toFixed());
    this.#cssStrings.push(css);
    this.#styleNodes.push(styleElement);
    document.head.appendChild(styleElement);
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
    ? merge(higherPriorityParams, params)
    : params;
  rParams.chain = rParams.chain === undefined
    ? [name]
    : rParams.chain.concat(name);
  return rParams;
}

