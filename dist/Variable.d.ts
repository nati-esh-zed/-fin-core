import Component from './Component.js';
import DynamicAttribute from './DynamicAttribute.js';
import DynamicTextComponent from './DynamicTextComponent.js';
export type TargetChildType = DynamicTextComponent | DynamicAttribute | undefined;
declare class Variable<Type> {
    #private;
    then?: (value?: Type) => any;
    constructor(initialValue?: Type);
    set value(newValue: Type | undefined);
    get value(): Type | undefined;
    get tValue(): any;
    get references(): Map<Component, Set<TargetChildType>>;
    fetch(): Type | undefined;
    addReference(component: Component, child?: TargetChildType): boolean;
    tRef(then: (value?: Type) => any): (component: Component, child?: TargetChildType) => any;
    refer(component: Component, child?: TargetChildType): Type | undefined;
    tRefer(component: Component, child?: TargetChildType): any;
    update(): Type | undefined;
}
export default Variable;
//# sourceMappingURL=Variable.d.ts.map