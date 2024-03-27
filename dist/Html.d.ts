import { Component, Params } from './Component.js';
export interface HtmlParams extends Params {
    html?: string;
}
export declare class Html extends Component {
    #private;
    constructor(params: HtmlParams);
    get html(): string;
    set html(html: string);
    render(): HTMLElement | SVGElement;
}
//# sourceMappingURL=Html.d.ts.map