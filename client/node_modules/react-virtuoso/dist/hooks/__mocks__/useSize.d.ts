declare type CallbackRefParam = HTMLElement | null;
export default function useSize(callback: (e: HTMLElement) => void): (elRef: CallbackRefParam) => void;
export {};
