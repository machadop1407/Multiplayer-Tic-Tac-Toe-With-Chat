import * as u from '@virtuoso.dev/urx';
import { AANode } from './AATree';
import { Log, LogLevel } from './loggerSystem';
export interface SizeRange {
    startIndex: number;
    endIndex: number;
    size: number;
}
export declare type Data = readonly unknown[] | undefined;
export declare function insertRanges(sizeTree: AANode<number>, ranges: SizeRange[]): readonly [AANode<number>, number];
export interface OffsetPoint {
    offset: number;
    size: number;
    index: number;
}
export interface SizeState {
    sizeTree: AANode<number>;
    offsetTree: Array<OffsetPoint>;
    groupOffsetTree: AANode<number>;
    lastIndex: number;
    lastOffset: number;
    lastSize: number;
    groupIndices: number[];
}
export declare function initialSizeState(): SizeState;
export declare function indexComparator({ index: itemIndex }: OffsetPoint, index: number): 0 | 1 | -1;
export declare function offsetComparator({ offset: itemOffset }: OffsetPoint, offset: number): 0 | 1 | -1;
export declare function rangesWithinOffsets(tree: Array<OffsetPoint>, startOffset: number, endOffset: number, minStartIndex?: number): Array<{
    start: number;
    end: number;
    value: {
        size: number;
        offset: number;
        index: number;
    };
}>;
export declare function sizeStateReducer(state: SizeState, [ranges, groupIndices, log]: [SizeRange[], number[], Log]): SizeState;
export declare function offsetOf(index: number, tree: Array<OffsetPoint>): number;
export declare function originalIndexFromItemIndex(itemIndex: number, sizes: SizeState): number;
export declare function hasGroups(sizes: SizeState): boolean;
declare type OptionalNumber = number | undefined;
/** Calculates the height of `el`, which will be the `Item` element in the DOM. */
export declare type SizeFunction = (el: HTMLElement, field: 'offsetHeight' | 'offsetWidth') => number;
export declare const sizeSystem: u.SystemSpec<[u.SystemSpec<never[], () => {
    log: u.StatefulStream<Log>;
    logLevel: u.StatefulStream<LogLevel>;
}>], ([{ log }]: [{
    log: u.StatefulStream<Log>;
    logLevel: u.StatefulStream<LogLevel>;
}]) => {
    data: u.StatefulStream<Data>;
    totalCount: u.Stream<number>;
    sizeRanges: u.Stream<SizeRange[]>;
    groupIndices: u.StatefulStream<number[]>;
    defaultItemSize: u.StatefulStream<OptionalNumber>;
    fixedItemSize: u.StatefulStream<OptionalNumber>;
    unshiftWith: u.Stream<number>;
    shiftWith: u.Stream<number>;
    shiftWithOffset: u.Stream<number>;
    beforeUnshiftWith: u.Stream<number>;
    firstItemIndex: u.StatefulStream<number>;
    sizes: u.StatefulStream<SizeState>;
    listRefresh: u.Stream<boolean>;
    statefulTotalCount: u.StatefulStream<number>;
    trackItemSizes: u.StatefulStream<boolean>;
    itemSize: u.StatefulStream<SizeFunction>;
}>;
export {};
