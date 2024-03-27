import { Component, Params } from './Component.js';
export interface HtmlFn {
    (component: Component): string | Promise<string> | undefined;
}
export interface DynamicHtmlParams extends Params {
    html: HtmlFn;
}
export declare class DynamicHtml extends Component {
    #private;
    constructor(params: DynamicHtmlParams);
    get html(): string;
    set html(html: string);
    update(): boolean;
    render(): HTMLElement | SVGElement;
}
//# sourceMappingURL=DynamicHtml.d.ts.map