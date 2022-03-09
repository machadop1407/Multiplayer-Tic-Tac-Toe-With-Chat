import React from 'react';
import { LoadMoreButtonProps } from './LoadMoreButton';
export declare type LoadMorePaginatorProps = {
    /** callback to load the next page */
    loadNextPage: () => void;
    hasNextPage?: boolean;
    LoadMoreButton?: React.ComponentType<LoadMoreButtonProps>;
    /** indicates if there there's currently any refreshing taking place */
    refreshing?: boolean;
    reverse?: boolean;
};
export declare const UnMemoizedLoadMorePaginator: React.FC<LoadMorePaginatorProps>;
export declare const LoadMorePaginator: React.FC<LoadMorePaginatorProps>;
//# sourceMappingURL=LoadMorePaginator.d.ts.map