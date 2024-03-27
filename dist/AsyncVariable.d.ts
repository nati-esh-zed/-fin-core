import { Component } from './Component.js';
import { Variable, TargetChildType } from './Variable.js';
export declare class AsyncVariable<Type> extends Variable<Type> {
    #private;
    constructor(promise: Promise<Type>, initialValue: Type);
    set promise(promise: Promise<Type>);
    get promise(): Promise<Type>;
    refer(component: Component, child?: TargetChildType): Type;
    tRefer(component: Component, child?: TargetChildType): any;
}
//# sourceMappingURL=AsyncVariable.d.ts.map