export interface AttributeParams {
    name: string;
    value?: any;
}
export declare class Attribute {
    #private;
    constructor(params: AttributeParams);
    get name(): string;
    get value(): any;
    set value(newValue: any);
    get node(): Attr;
}
//# sourceMappingURL=Attribute.d.ts.map