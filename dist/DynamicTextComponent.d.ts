import Component from './Component.js';
import TextComponent from './TextComponent.js';
export interface ContentFn {
    (component: Component, child: DynamicTextComponent): string | Promise<string> | undefined;
}
declare class DynamicTextComponent extends TextComponent {
    #private;
    constructor(contentCb: ContentFn);
    update(component: Component): Text;
}
export default DynamicTextComponent;
//# sourceMappingURL=DynamicTextComponent.d.ts.map