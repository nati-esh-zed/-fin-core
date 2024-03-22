import Attribute from './Attribute.js';
import EventHandler from './EventHandler.js';
import TextComponent from './TextComponent.js';
import DynamicTextComponent, { ContentFn } from './DynamicTextComponent.js';
import DynamicAttribute from './DynamicAttribute.js';
import AttributeType from './types/AttributesType.js';
export type ComponentAttributeType = Attribute | DynamicAttribute;
export type ComponentAttributesType = AttributeType;
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
    namespace?: string | undefined;
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
    #private;
    static SET_NODE_FID: boolean;
    static ID_TOP: number;
    updateCb?: UpdateFn;
    renderCb?: RenderFn;
    updateChildCb?: UpdateChildFn;
    renderChildCb?: RenderChildFn;
    get id(): string;
    get name(): string;
    get namespace(): string | undefined;
    get chain(): string[];
    get tag(): string;
    get attributes(): ComponentAttributeType[] | undefined;
    get children(): ComponentStoredChildType[] | undefined;
    get eventHandlers(): EventHandler[] | undefined;
    get node(): HTMLElement | SVGElement;
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
    render(): HTMLElement | SVGElement;
    addEventHandler(eventHandler: EventHandler): void;
    private _mProcessAttribute;
    private _mUpdateAttribute;
    private _mUpdate;
    private static _sGetChain;
}
/**
 * Merges the two parameter ojects with the `higherPriorityParams`
 * overriding properties in `params`.
 *
 * @param higherPriorityParams
 * @param params
 * @returns the merged Params object
 */
export declare function merge(higherPriorityParams: Params, params: Params): Params;
/**
 * Calls `merge` then appends `name` to the chain
 *
 * @param name
 * @param higherPriorityParams
 * @param params
 * @returns the chained Params object
 */
export declare function chain(name: string, higherPriorityParams?: Params, params?: Params): Params;
export default Component;
//# sourceMappingURL=Component.d.ts.map