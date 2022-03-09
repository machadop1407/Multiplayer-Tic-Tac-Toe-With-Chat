import { useEffect } from 'react';
import { useChatContext } from '../../../context/ChatContext';
export var useNotificationRemovedFromChannelListener = function (setChannels, customHandler) {
    var client = useChatContext('useNotificationRemovedFromChannelListener').client;
    useEffect(function () {
        var handleEvent = function (event) {
            if (customHandler && typeof customHandler === 'function') {
                customHandler(setChannels, event);
            }
            else {
                setChannels(function (channels) { return channels.filter(function (channel) { var _a; return channel.cid !== ((_a = event.channel) === null || _a === void 0 ? void 0 : _a.cid); }); });
            }
        };
        client.on('notification.removed_from_channel', handleEvent);
        return function () {
            client.off('notification.removed_from_channel', handleEvent);
        };
    }, [customHandler]);
};
