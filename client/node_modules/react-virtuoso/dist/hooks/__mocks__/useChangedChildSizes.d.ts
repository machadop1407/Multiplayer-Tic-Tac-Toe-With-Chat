import { SizeRange } from '../../sizeSystem';
declare type CallbackRefParam = HTMLElement | null;
export default function useChangedChildSizes(callback: (sizes: SizeRange[]) => void): (elRef: CallbackRefParam) => void;
export {};
