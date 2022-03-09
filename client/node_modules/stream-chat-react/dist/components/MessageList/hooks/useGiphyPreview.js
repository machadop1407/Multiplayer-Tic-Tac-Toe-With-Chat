import { useEffect, useState } from 'react';
import { useChatContext } from '../../../context/ChatContext';
export var useGiphyPreview = function (separateGiphyPreview) {
    var _a = useState(), giphyPreviewMessage = _a[0], setGiphyPreviewMessage = _a[1];
    var client = useChatContext('useGiphyPreview').client;
    useEffect(function () {
        var handleEvent = function (event) {
            var message = event.message, user = event.user;
            if ((message === null || message === void 0 ? void 0 : message.command) === 'giphy' && (user === null || user === void 0 ? void 0 : user.id) === client.userID) {
                setGiphyPreviewMessage(undefined);
            }
        };
        if (separateGiphyPreview)
            client.on('message.new', handleEvent);
        return function () { return client.off('message.new', handleEvent); };
    }, [separateGiphyPreview]);
    return { giphyPreviewMessage: giphyPreviewMessage, setGiphyPreviewMessage: setGiphyPreviewMessage };
};
