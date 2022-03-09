import { WindowViewportInfo } from '../interfaces';
export default function useWindowViewportRectRef(callback: (info: WindowViewportInfo) => void, customScrollParent?: HTMLElement): (_el: import("./useSize").CallbackRefParam) => void;
