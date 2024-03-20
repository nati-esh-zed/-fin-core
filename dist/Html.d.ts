import Component, { Params as ComponentParams } from './Component.js';
export interface Params extends ComponentParams {
    html?: string;
}
declare class Html extends Component {
    #private;
    constructor(params: Params);
    get html(): string;
    set html(html: string);
    render(): HTMLElement;
}
export default Html;
//# sourceMappingURL=Html.d.ts.map