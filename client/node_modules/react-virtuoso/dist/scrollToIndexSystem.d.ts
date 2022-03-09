import * as u from '@virtuoso.dev/urx';
import { IndexLocationWithAlign } from './interfaces';
import { LogLevel } from './loggerSystem';
export declare type IndexLocation = number | IndexLocationWithAlign;
export declare function normalizeIndexLocation(location: IndexLocation): Required<IndexLocationWithAlign>;
export declare const scrollToIndexSystem: u.SystemSpec<[u.SystemSpec<[u.SystemSpec<never[], () => {
    log: u.StatefulStream<import("./loggerSystem").Log>;
    logLevel: u.StatefulStream<LogLevel>;
}>], ([{ log }]: [{
    log: u.StatefulStream<import("./loggerSystem").Log>;
    logLevel: u.StatefulStream<LogLevel>;
}]) => {
    data: u.StatefulStream<import("./sizeSystem").Data>;
    totalCount: u.Stream<number>;
    sizeRanges: u.Stream<import("./sizeSystem").SizeRange[]>;
    groupIndices: u.StatefulStream<number[]>;
    defaultItemSize: u.StatefulStream<number | undefined>;
    fixedItemSize: u.StatefulStream<number | undefined>;
    unshiftWith: u.Stream<number>;
    shiftWith: u.Stream<number>;
    shiftWithOffset: u.Stream<number>;
    beforeUnshiftWith: u.Stream<number>;
    firstItemIndex: u.StatefulStream<number>;
    sizes: u.StatefulStream<import("./sizeSystem").SizeState>;
    listRefresh: u.Stream<boolean>;
    statefulTotalCount: u.StatefulStream<number>;
    trackItemSizes: u.StatefulStream<boolean>;
    itemSize: u.StatefulStream<import("./sizeSystem").SizeFunction>;
}>, u.SystemSpec<never[], () => {
    scrollContainerState: u.Stream<[number, number]>;
    scrollTop: u.Stream<number>;
    viewportHeight: u.Stream<number>;
    headerHeight: u.StatefulStream<number>;
    footerHeight: u.StatefulStream<number>;
    scrollHeight: u.Stream<number>;
    smoothScrollTargetReached: u.Stream<true>;
    scrollTo: u.Stream<ScrollToOptions>;
    scrollBy: u.Stream<ScrollToOptions>;
    statefulScrollTop: u.StatefulStream<number>;
    deviation: u.StatefulStream<number>;
    scrollingInProgress: u.StatefulStream<boolean>;
}>, u.SystemSpec<never[], () => {
    log: u.StatefulStream<import("./loggerSystem").Log>;
    logLevel: u.StatefulStream<LogLevel>;
}>], ([{ sizes, totalCount, listRefresh }, { scrollingInProgress, viewportHeight, scrollTo, smoothScrollTargetReached, headerHeight, footerHeight }, { log },]: [{
    data: u.StatefulStream<import("./sizeSystem").Data>;
    totalCount: u.Stream<number>;
    sizeRanges: u.Stream<import("./sizeSystem").SizeRange[]>;
    groupIndices: u.StatefulStream<number[]>;
    defaultItemSize: u.StatefulStream<number | undefined>;
    fixedItemSize: u.StatefulStream<number | undefined>;
    unshiftWith: u.Stream<number>;
    shiftWith: u.Stream<number>;
    shiftWithOffset: u.Stream<number>;
    beforeUnshiftWith: u.Stream<number>;
    firstItemIndex: u.StatefulStream<number>;
    sizes: u.StatefulStream<import("./sizeSystem").SizeState>;
    listRefresh: u.Stream<boolean>;
    statefulTotalCount: u.StatefulStream<number>;
    trackItemSizes: u.StatefulStream<boolean>;
    itemSize: u.StatefulStream<import("./sizeSystem").SizeFunction>;
}, {
    scrollContainerState: u.Stream<[number, number]>;
    scrollTop: u.Stream<number>;
    viewportHeight: u.Stream<number>;
    headerHeight: u.StatefulStream<number>;
    footerHeight: u.StatefulStream<number>;
    scrollHeight: u.Stream<number>;
    smoothScrollTargetReached: u.Stream<true>;
    scrollTo: u.Stream<ScrollToOptions>;
    scrollBy: u.Stream<ScrollToOptions>;
    statefulScrollTop: u.StatefulStream<number>;
    deviation: u.StatefulStream<number>;
    scrollingInProgress: u.StatefulStream<boolean>;
}, {
    log: u.StatefulStream<import("./loggerSystem").Log>;
    logLevel: u.StatefulStream<LogLevel>;
}]) => {
    scrollToIndex: u.Stream<IndexLocation>;
    topListHeight: u.StatefulStream<number>;
}>;
