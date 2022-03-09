import { useChannelActionContext } from '../../../context/ChannelActionContext';
export var useOpenThreadHandler = function (message, customOpenThread) {
    var channelOpenThread = useChannelActionContext('useOpenThreadHandler').openThread;
    var openThread = customOpenThread || channelOpenThread;
    return function (event) {
        if (!openThread || !message) {
            console.warn('Open thread handler was called but it is missing one of its parameters');
            return;
        }
        openThread(message, event);
    };
};
