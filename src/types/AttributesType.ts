import { DynamicAttributeValueFn } from "../DynamicAttribute.js";
import InputTypes from "./InputType.js";
import StyleAttributeType from "./StyleAttributeType.js";
import EventAttributeTypes from "./EventAttributesType.js";

// AttributeValueType
type AVT = string|DynamicAttributeValueFn|undefined;

export interface AttributesType extends EventAttributeTypes {
  accept?: AVT,
  acceptCharset?: AVT,
  accesskey?: AVT,
  action?: AVT,
  align?: AVT,
  allow?: AVT,
  alt?: AVT,
  as?: AVT,
  async?: AVT,
  autocapitalize?: AVT,
  autocomplete?: AVT,
  autoplay?: AVT,
  background?: AVT,
  bgcolor?: AVT,
  border?: AVT,
  capture?: AVT,
  charset?: AVT,
  checked?: AVT,
  cite?: AVT,
  class?: AVT,
  color?: AVT,
  cols?: AVT,
  colSpan?: AVT,
  content?: AVT,
  contenteditable?: AVT,
  controls?: AVT,
  coords?: AVT,
  crossorigin?: AVT,
  csp?: AVT,
  data?: AVT,
  datetime?: AVT,
  decoding?: AVT,
  default?: AVT,
  defer?: AVT,
  dir?: AVT,
  dirname?: AVT,
  disabled?: AVT,
  download?: AVT,
  draggable?: AVT,
  encType?: AVT,
  enterKeyHint?: AVT,
  for?: AVT,
  form?: AVT,
  formAction?: AVT,
  formEnctype?: AVT,
  formMethod?: AVT,
  formNovalidate?: AVT,
  formTarget?: AVT,
  headers?: AVT,
  height?: AVT,
  hidden?: AVT,
  high?: AVT,
  href?: AVT,
  hrefLang?: AVT,
  http?: AVT,
  equiv?: AVT,
  id?: AVT,
  integrity?: AVT,
  intrinsicSize?: AVT,
  inputMode?: AVT,
  ismap?: AVT,
  itemProp?: AVT,
  kind?: AVT,
  label?: AVT,
  lang?: AVT,
  language?: AVT,
  loading?: AVT,
  list?: AVT,
  loop?: AVT,
  low?: AVT,
  manifest?: AVT,
  max?: AVT,
  maxLength?: AVT,
  minLength?: AVT,
  media?: AVT,
  method?: AVT,
  min?: AVT,
  multiple?: AVT,
  muted?: AVT,
  name?: AVT,
  novalidate?: AVT,
  open?: AVT,
  optimum?: AVT,
  pattern?: AVT,
  ping?: AVT,
  placeholder?: AVT,
  playsInline?: AVT,
  poster?: AVT,
  preload?: AVT,
  readonly?: AVT,
  referrerPolicy?: AVT,
  rel?: AVT,
  required?: AVT,
  reversed?: AVT,
  role?: AVT,
  rows?: AVT,
  rowSpan?: AVT,
  sandbox?: AVT,
  scope?: AVT,
  scoped?: AVT,
  selected?: AVT,
  shape?: AVT,
  size?: AVT,
  sizes?: AVT,
  slot?: AVT,
  span?: AVT,
  spellCheck?: AVT,
  src?: AVT,
  srcdoc?: AVT,
  srcLang?: AVT,
  srcset?: AVT,
  start?: AVT,
  step?: AVT,
  style?: &StyleAttributeType,
  summary?: AVT,
  tabIndex?: AVT,
  target?: AVT,
  title?: AVT,
  translate?: AVT,
  type?: InputTypes,
  usemap?: AVT,
  value?: AVT,
  width?: AVT,
  wrap?: AVT,
};

export default AttributesType;
