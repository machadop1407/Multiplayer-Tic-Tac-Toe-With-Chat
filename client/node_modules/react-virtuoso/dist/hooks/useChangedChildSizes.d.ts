import { Log } from '../loggerSystem';
import { SizeFunction, SizeRange } from '../sizeSystem';
export default function useChangedListContentsSizes(callback: (ranges: SizeRange[]) => void, itemSize: SizeFunction, enabled: boolean, scrollContainerStateCallback: (state: [number, number]) => void, log: Log, customScrollParent?: HTMLElement): (_el: import("./useSize").CallbackRefParam) => void;
