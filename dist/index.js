"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = void 0;
const Attribute_js_1 = __importDefault(require("./Attribute.js"));
const DynamicAttribute_js_1 = __importDefault(require("./DynamicAttribute.js"));
const Component_js_1 = __importDefault(require("./Component.js"));
const TextComponent_js_1 = __importDefault(require("./TextComponent.js"));
const DynamicTextComponent_js_1 = __importDefault(require("./DynamicTextComponent.js"));
const Html_js_1 = __importDefault(require("./Html.js"));
const DynamicHtml_js_1 = __importDefault(require("./DynamicHtml.js"));
const EventHandler_js_1 = __importDefault(require("./EventHandler.js"));
const Variable_js_1 = __importDefault(require("./Variable.js"));
const AsyncVariable_js_1 = __importDefault(require("./AsyncVariable.js"));
const Engine_js_1 = __importDefault(require("./Engine.js"));
exports.VERSION = "1.0.4";
exports.default = {
    VERSION: exports.VERSION,
    Attribute: Attribute_js_1.default,
    DynamicAttribute: DynamicAttribute_js_1.default,
    Component: Component_js_1.default,
    TextComponent: TextComponent_js_1.default,
    DynamicTextComponent: DynamicTextComponent_js_1.default,
    Html: Html_js_1.default,
    DynamicHtml: DynamicHtml_js_1.default,
    EventHandler: EventHandler_js_1.default,
    Variable: Variable_js_1.default,
    AsyncVariable: AsyncVariable_js_1.default,
    Engine: Engine_js_1.default
};
