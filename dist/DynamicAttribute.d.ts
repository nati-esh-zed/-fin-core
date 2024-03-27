import { Attribute } from "./Attribute.js";
import { Component } from "./Component.js";
export interface DynamicAttributeValueFn {
    (component: Component, child: DynamicAttribute): string | undefined;
}
export interface DynamicAttributeParams {
    name: string;
    value: DynamicAttributeValueFn;
}
export declare class DynamicAttribute extends Attribute {
    #private;
    constructor(params: DynamicAttributeParams);
    update(component: Component): boolean;
}
//# sourceMappingURL=DynamicAttribute.d.ts.map