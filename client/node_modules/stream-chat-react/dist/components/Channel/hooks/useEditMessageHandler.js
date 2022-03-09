import { useChatContext } from '../../../context/ChatContext';
export var useEditMessageHandler = function (doUpdateMessageRequest) {
    var _a = useChatContext('useEditMessageHandler'), channel = _a.channel, client = _a.client;
    return function (updatedMessage) {
        if (doUpdateMessageRequest && channel) {
            return Promise.resolve(doUpdateMessageRequest(channel.cid, updatedMessage));
        }
        return client.updateMessage(updatedMessage);
    };
};
