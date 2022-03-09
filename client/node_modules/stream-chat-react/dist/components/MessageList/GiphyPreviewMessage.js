import React from 'react';
import { Message } from '../Message/Message';
export var GiphyPreviewMessage = function (props) {
    var message = props.message;
    return (React.createElement("div", { className: 'giphy-preview-message' },
        React.createElement(Message, { message: message })));
};
