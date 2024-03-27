import { Component } from './Component.js';
import { TextComponent } from './TextComponent.js';
export interface ContentFn {
    (component: Component, child: DynamicTextComponent): string | Promise<string> | undefined;
}
export declare class DynamicTextComponent extends TextComponent {
    #private;
    constructor(contentCb: ContentFn);
    update(component: Component): Text;
}
//# sourceMappingURL=DynamicTextComponent.d.ts.map