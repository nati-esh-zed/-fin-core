import { Component } from './Component.js';
export declare class TextComponent {
    #private;
    constructor(content: string);
    get content(): string;
    set content(newContent: string);
    get node(): Text;
    update(component?: Component): Text;
    render(): Text;
}
//# sourceMappingURL=TextComponent.d.ts.map