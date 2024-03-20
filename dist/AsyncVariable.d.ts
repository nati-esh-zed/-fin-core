import Component from './Component.js';
import Variable, { TargetChildType } from './Variable.js';
declare class AsyncVariable<Type> extends Variable<Type> {
    #private;
    constructor(promise: Promise<Type>, initialValue?: Type);
    set promise(promise: Promise<Type>);
    get promise(): Promise<Type>;
    refer(component: Component, child?: TargetChildType): Type | undefined;
    tRefer(component: Component, child?: TargetChildType): any;
}
export default AsyncVariable;
//# sourceMappingURL=AsyncVariable.d.ts.map