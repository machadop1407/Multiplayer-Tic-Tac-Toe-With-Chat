import React from 'react';
export declare type InfiniteScrollProps = {
    className?: string;
    element?: React.ElementType;
    hasMore?: boolean;
    initialLoad?: boolean;
    isLoading?: boolean;
    isReverse?: boolean;
    listenToScroll?: (offset: number, reverseOffset: number, threshold: number) => void;
    loader?: React.ReactNode;
    loading?: React.ReactNode;
    loadMore?: () => void;
    pageStart?: number;
    threshold?: number;
    useCapture?: boolean;
    useWindow?: boolean;
};
export declare const InfiniteScroll: React.FC<InfiniteScrollProps>;
//# sourceMappingURL=InfiniteScroll.d.ts.map