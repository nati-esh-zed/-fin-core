import Component, { Params as ComponentParams } from './Component.js';
export interface HtmlFn {
    (component: Component): string | Promise<string> | undefined;
}
export interface Params extends ComponentParams {
    html: HtmlFn;
}
declare class DynamicHtml extends Component {
    #private;
    constructor(params: Params);
    get html(): string;
    set html(html: string);
    update(): boolean;
    render(): HTMLElement | SVGElement;
}
export default DynamicHtml;
//# sourceMappingURL=DynamicHtml.d.ts.map