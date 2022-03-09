export declare type Comparator<T> = {
    (item: T, value: number): -1 | 0 | 1;
};
export declare function findIndexOfClosestSmallerOrEqual<T>(items: T[], value: number, comparator: Comparator<T>, start?: number): number;
export declare function findClosestSmallerOrEqual<T>(items: T[], value: number, comparator: Comparator<T>): T;
export declare function findRange<T>(items: T[], startValue: number, endValue: number, comparator: Comparator<T>): T[];
