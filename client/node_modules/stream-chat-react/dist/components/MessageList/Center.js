import React from 'react';
var UnMemoizedCenter = function (_a) {
    var children = _a.children;
    return (React.createElement("div", { className: 'str-chat__list__center' }, children));
};
export var Center = React.memo(UnMemoizedCenter);
