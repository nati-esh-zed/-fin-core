import Attribute from "./Attribute.js";
import Component from "./Component.js";
export interface DynamicAttributeValueFn {
    (component: Component, child: DynamicAttribute): string | undefined;
}
export interface DynamicAttributeParams {
    name: string;
    value: DynamicAttributeValueFn;
}
declare class DynamicAttribute extends Attribute {
    #private;
    constructor(params: DynamicAttributeParams);
    update(component: Component): boolean;
}
export default DynamicAttribute;
//# sourceMappingURL=DynamicAttribute.d.ts.map