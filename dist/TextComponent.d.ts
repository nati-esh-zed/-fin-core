import Component from './Component.js';
declare class TextComponent {
    #private;
    constructor(content: string);
    get content(): string;
    set content(newContent: string);
    get node(): Text;
    update(component?: Component): Text;
    render(): Text;
}
export default TextComponent;
//# sourceMappingURL=TextComponent.d.ts.map