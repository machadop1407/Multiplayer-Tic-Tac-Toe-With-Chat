interface NilNode {
    lvl: 0;
}
interface NodeData<T> {
    k: number;
    v: T;
}
interface NonNilAANode<T> {
    k: number;
    v: T;
    lvl: number;
    l: NonNilAANode<T> | NilNode;
    r: NonNilAANode<T> | NilNode;
}
export interface Range<T> {
    start: number;
    end: number;
    value: T;
}
export declare type AANode<T> = NilNode | NonNilAANode<T>;
export declare function empty(node: AANode<any>): node is NilNode;
export declare function newTree<T>(): AANode<T>;
export declare function remove<T>(node: AANode<T>, key: number): AANode<T>;
export declare function find<T>(node: AANode<T>, key: number): T | undefined;
export declare function findMaxKeyValue<T>(node: AANode<T>, value: number, field?: 'k' | 'v'): [number, T | undefined];
export declare function insert<T>(node: AANode<T>, k: number, v: T): NonNilAANode<T>;
export declare function walkWithin<T>(node: AANode<T>, start: number, end: number): NodeData<T>[];
export declare function walk<T>(node: AANode<T>): NodeData<T>[];
export declare function keys(node: AANode<any>): number[];
export declare function ranges<T>(node: AANode<T>): Range<T>[];
export declare function rangesWithin<T>(node: AANode<T>, startIndex: number, endIndex: number): Range<T>[];
export declare function arrayToRanges<T, V>(items: T[], parser: (item: T) => {
    index: number;
    value: V;
}): Array<{
    start: number;
    end: number;
    value: V;
}>;
export {};
