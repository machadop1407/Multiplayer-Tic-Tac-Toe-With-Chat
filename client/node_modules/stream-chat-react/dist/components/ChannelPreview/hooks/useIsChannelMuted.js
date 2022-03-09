import { useEffect, useState } from 'react';
import { useChatContext } from '../../../context/ChatContext';
export var useIsChannelMuted = function (channel) {
    var client = useChatContext('useIsChannelMuted').client;
    var _a = useState(channel.muteStatus()), muted = _a[0], setMuted = _a[1];
    useEffect(function () {
        var handleEvent = function () { return setMuted(channel.muteStatus()); };
        client.on('notification.channel_mutes_updated', handleEvent);
        return function () { return client.off('notification.channel_mutes_updated', handleEvent); };
    }, [muted]);
    return muted;
};
