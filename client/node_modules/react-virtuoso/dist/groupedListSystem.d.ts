export interface GroupIndexesAndCount {
    totalCount: number;
    groupIndices: number[];
}
export declare function groupCountsToIndicesAndCount(counts: number[]): GroupIndexesAndCount;
export declare const groupedListSystem: import("@virtuoso.dev/urx").SystemSpec<[import("@virtuoso.dev/urx").SystemSpec<[import("@virtuoso.dev/urx").SystemSpec<never[], () => {
    log: import("@virtuoso.dev/urx").StatefulStream<import("./loggerSystem").Log>;
    logLevel: import("@virtuoso.dev/urx").StatefulStream<import("./loggerSystem").LogLevel>;
}>], ([{ log }]: [{
    log: import("@virtuoso.dev/urx").StatefulStream<import("./loggerSystem").Log>;
    logLevel: import("@virtuoso.dev/urx").StatefulStream<import("./loggerSystem").LogLevel>;
}]) => {
    data: import("@virtuoso.dev/urx").StatefulStream<import("./sizeSystem").Data>;
    totalCount: import("@virtuoso.dev/urx").Stream<number>;
    sizeRanges: import("@virtuoso.dev/urx").Stream<import("./sizeSystem").SizeRange[]>;
    groupIndices: import("@virtuoso.dev/urx").StatefulStream<number[]>;
    defaultItemSize: import("@virtuoso.dev/urx").StatefulStream<number | undefined>;
    fixedItemSize: import("@virtuoso.dev/urx").StatefulStream<number | undefined>;
    unshiftWith: import("@virtuoso.dev/urx").Stream<number>;
    shiftWith: import("@virtuoso.dev/urx").Stream<number>;
    shiftWithOffset: import("@virtuoso.dev/urx").Stream<number>;
    beforeUnshiftWith: import("@virtuoso.dev/urx").Stream<number>;
    firstItemIndex: import("@virtuoso.dev/urx").StatefulStream<number>;
    sizes: import("@virtuoso.dev/urx").StatefulStream<import("./sizeSystem").SizeState>;
    listRefresh: import("@virtuoso.dev/urx").Stream<boolean>;
    statefulTotalCount: import("@virtuoso.dev/urx").StatefulStream<number>;
    trackItemSizes: import("@virtuoso.dev/urx").StatefulStream<boolean>;
    itemSize: import("@virtuoso.dev/urx").StatefulStream<import("./sizeSystem").SizeFunction>;
}>, import("@virtuoso.dev/urx").SystemSpec<never[], () => {
    scrollContainerState: import("@virtuoso.dev/urx").Stream<[number, number]>;
    scrollTop: import("@virtuoso.dev/urx").Stream<number>;
    viewportHeight: import("@virtuoso.dev/urx").Stream<number>;
    headerHeight: import("@virtuoso.dev/urx").StatefulStream<number>;
    footerHeight: import("@virtuoso.dev/urx").StatefulStream<number>;
    scrollHeight: import("@virtuoso.dev/urx").Stream<number>;
    smoothScrollTargetReached: import("@virtuoso.dev/urx").Stream<true>;
    scrollTo: import("@virtuoso.dev/urx").Stream<ScrollToOptions>;
    scrollBy: import("@virtuoso.dev/urx").Stream<ScrollToOptions>;
    statefulScrollTop: import("@virtuoso.dev/urx").StatefulStream<number>;
    deviation: import("@virtuoso.dev/urx").StatefulStream<number>;
    scrollingInProgress: import("@virtuoso.dev/urx").StatefulStream<boolean>;
}>], ([{ totalCount, groupIndices, sizes }, { scrollTop, headerHeight }]: [{
    data: import("@virtuoso.dev/urx").StatefulStream<import("./sizeSystem").Data>;
    totalCount: import("@virtuoso.dev/urx").Stream<number>;
    sizeRanges: import("@virtuoso.dev/urx").Stream<import("./sizeSystem").SizeRange[]>;
    groupIndices: import("@virtuoso.dev/urx").StatefulStream<number[]>;
    defaultItemSize: import("@virtuoso.dev/urx").StatefulStream<number | undefined>;
    fixedItemSize: import("@virtuoso.dev/urx").StatefulStream<number | undefined>;
    unshiftWith: import("@virtuoso.dev/urx").Stream<number>;
    shiftWith: import("@virtuoso.dev/urx").Stream<number>;
    shiftWithOffset: import("@virtuoso.dev/urx").Stream<number>;
    beforeUnshiftWith: import("@virtuoso.dev/urx").Stream<number>;
    firstItemIndex: import("@virtuoso.dev/urx").StatefulStream<number>;
    sizes: import("@virtuoso.dev/urx").StatefulStream<import("./sizeSystem").SizeState>;
    listRefresh: import("@virtuoso.dev/urx").Stream<boolean>;
    statefulTotalCount: import("@virtuoso.dev/urx").StatefulStream<number>;
    trackItemSizes: import("@virtuoso.dev/urx").StatefulStream<boolean>;
    itemSize: import("@virtuoso.dev/urx").StatefulStream<import("./sizeSystem").SizeFunction>;
}, {
    scrollContainerState: import("@virtuoso.dev/urx").Stream<[number, number]>;
    scrollTop: import("@virtuoso.dev/urx").Stream<number>;
    viewportHeight: import("@virtuoso.dev/urx").Stream<number>;
    headerHeight: import("@virtuoso.dev/urx").StatefulStream<number>;
    footerHeight: import("@virtuoso.dev/urx").StatefulStream<number>;
    scrollHeight: import("@virtuoso.dev/urx").Stream<number>;
    smoothScrollTargetReached: import("@virtuoso.dev/urx").Stream<true>;
    scrollTo: import("@virtuoso.dev/urx").Stream<ScrollToOptions>;
    scrollBy: import("@virtuoso.dev/urx").Stream<ScrollToOptions>;
    statefulScrollTop: import("@virtuoso.dev/urx").StatefulStream<number>;
    deviation: import("@virtuoso.dev/urx").StatefulStream<number>;
    scrollingInProgress: import("@virtuoso.dev/urx").StatefulStream<boolean>;
}]) => {
    groupCounts: import("@virtuoso.dev/urx").Stream<number[]>;
    topItemsIndexes: import("@virtuoso.dev/urx").Stream<[number]>;
}>;
