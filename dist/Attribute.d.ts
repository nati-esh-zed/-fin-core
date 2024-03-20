export interface Params {
    name: string;
    value?: any;
}
declare class Attribute {
    #private;
    constructor(params: Params);
    get name(): string;
    get value(): any;
    set value(newValue: any);
    get node(): Attr;
}
export default Attribute;
//# sourceMappingURL=Attribute.d.ts.map