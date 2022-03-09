declare type CallbackRefParam = HTMLElement | null;
export default function useSize(callback: (state: [number, number]) => void): {
    scrollerRef: (elRef: CallbackRefParam) => void;
    scrollByCallback: () => void;
    scrollToCallback: () => void;
};
export {};
