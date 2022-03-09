import React from 'react';
import { LoadMoreButton as DefaultLoadMoreButton } from './LoadMoreButton';
export var UnMemoizedLoadMorePaginator = function (props) {
    var children = props.children, hasNextPage = props.hasNextPage, _a = props.LoadMoreButton, LoadMoreButton = _a === void 0 ? DefaultLoadMoreButton : _a, loadNextPage = props.loadNextPage, refreshing = props.refreshing, reverse = props.reverse;
    return (React.createElement(React.Fragment, null,
        !reverse && children,
        hasNextPage && React.createElement(LoadMoreButton, { onClick: loadNextPage, refreshing: refreshing }),
        reverse && children));
};
export var LoadMorePaginator = React.memo(UnMemoizedLoadMorePaginator);
