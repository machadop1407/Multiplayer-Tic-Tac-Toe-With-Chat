import React from 'react';
import type { LoadingIndicatorProps } from '../Loading/LoadingIndicator';
export declare type InfiniteScrollPaginatorProps = {
    /** callback to load the next page */
    loadNextPage: () => void;
    /** indicates if there is a next page to load */
    hasNextPage?: boolean;
    /** The loading indicator to use */
    LoadingIndicator?: React.ComponentType<LoadingIndicatorProps>;
    /** indicates if there there's currently any refreshing taking place */
    refreshing?: boolean;
    /** display the items in opposite order */
    reverse?: boolean;
    /** Offset from when to start the loadNextPage call */
    threshold?: number;
};
export declare const InfiniteScrollPaginator: React.FC<InfiniteScrollPaginatorProps>;
//# sourceMappingURL=InfiniteScrollPaginator.d.ts.map