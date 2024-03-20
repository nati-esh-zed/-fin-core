import Attribute from './Attribute.js';
import EventHandler from './EventHandler.js';
import TextComponent from './TextComponent.js';
import DynamicTextComponent, { ContentFn } from './DynamicTextComponent.js';
import DynamicAttribute from './DynamicAttribute.js';
export type ComponentAttributeType = Attribute | DynamicAttribute;
export type ComponentAttributesType = Object & {
    style?: Object;
};
export type ComponentStoredChildType = Component | TextComponent | DynamicTextComponent;
export type ComponentChildType = Component | TextComponent | DynamicTextComponent | ContentFn | string | undefined;
export type ComponentChildrenType = Array<ComponentChildType>;
export interface UpdateFn {
    (): boolean;
}
export interface RenderFn {
    (): boolean;
}
export interface UpdateChildFn {
    (child: ComponentStoredChildType): boolean;
}
export interface RenderChildFn {
    (child: ComponentStoredChildType): void;
}
export interface Params {
    chain?: Array<string>;
    tag?: string;
    attributes?: ComponentAttributesType;
    children?: ComponentChildrenType;
    update?: UpdateFn;
    render?: RenderFn;
    updateChild?: UpdateChildFn;
    renderChild?: RenderChildFn;
}
export interface ComponentAlterParams {
    attributes?: ComponentAttributesType;
    children?: ComponentChildrenType;
    update?: UpdateFn;
    render?: RenderFn;
    updateChild?: UpdateChildFn;
    renderChild?: RenderChildFn;
}
declare class Component {
    static SET_NODE_FID: boolean;
    static ID_TOP: number;
    id: string;
    name: string;
    chain: Array<string>;
    tag: string;
    attributes?: Array<ComponentAttributeType>;
    children?: Array<ComponentStoredChildType>;
    eventHandlers?: Array<EventHandler>;
    updateCb?: UpdateFn;
    renderCb?: RenderFn;
    updateChildCb?: UpdateChildFn;
    renderChildCb?: RenderChildFn;
    node: HTMLElement;
    constructor(params?: Params);
    alter(params: ComponentAlterParams): this;
    cloneAttribute(attribute: ComponentAttributeType): any;
    cloneAttributes(attributes: Array<ComponentAttributeType>): ComponentAttributeType[];
    hasAttribute(name: string): boolean | undefined;
    setAttributes(attributes: ComponentAttributesType): void;
    setChildren(children?: ComponentChildrenType): void;
    updateAttribute(attribute: ComponentAttributeType): void;
    updateAttributes(): void;
    update(): boolean;
    updateChild(child: ComponentStoredChildType): void;
    render(): HTMLElement;
    addEventHandler(eventHandler: EventHandler): void;
    private _mProcessAttribute;
    private _mUpdateAttribute;
    private _mUpdate;
    private static _sGetChain;
}
export declare function inheritParams(params: Params, overrideParams: Params): Params;
export declare function chain(name: string, params?: Params, overrideParams?: Params): Params;
export default Component;
//# sourceMappingURL=Component.d.ts.map