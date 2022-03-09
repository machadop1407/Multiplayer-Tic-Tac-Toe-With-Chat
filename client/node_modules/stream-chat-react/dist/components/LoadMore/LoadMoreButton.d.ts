import React from 'react';
export declare type LoadMoreButtonProps = {
    /** onClick handler load more button. Pagination logic should be executed in this handler. */
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    /** If true, LoadingIndicator is displayed instead of button */
    refreshing?: boolean;
};
export declare const LoadMoreButton: React.FC<LoadMoreButtonProps>;
//# sourceMappingURL=LoadMoreButton.d.ts.map