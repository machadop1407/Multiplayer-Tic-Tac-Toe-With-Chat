import React from 'react';
var UnMemoizedCommandItem = function (props) {
    var entity = props.entity;
    return (React.createElement("div", { className: 'str-chat__slash-command' },
        React.createElement("span", { className: 'str-chat__slash-command-header' },
            React.createElement("strong", null, entity.name),
            " ",
            entity.args),
        React.createElement("br", null),
        React.createElement("span", { className: 'str-chat__slash-command-description' }, entity.description)));
};
export var CommandItem = React.memo(UnMemoizedCommandItem);
