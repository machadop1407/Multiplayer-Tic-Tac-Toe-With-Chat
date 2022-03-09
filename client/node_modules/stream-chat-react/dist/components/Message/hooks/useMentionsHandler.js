import { useChannelActionContext } from '../../../context/ChannelActionContext';
function createEventHandler(fn, message) {
    return function (event) {
        var _a;
        if (typeof fn !== 'function' || !((_a = message === null || message === void 0 ? void 0 : message.mentioned_users) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        fn(event, message.mentioned_users);
    };
}
export var useMentionsHandler = function (message, customMentionHandler) {
    var _a = useChannelActionContext('useMentionsHandler'), contextOnMentionsClick = _a.onMentionsClick, contextOnMentionsHover = _a.onMentionsHover;
    var onMentionsClick = (customMentionHandler === null || customMentionHandler === void 0 ? void 0 : customMentionHandler.onMentionsClick) || contextOnMentionsClick || (function () { return null; });
    var onMentionsHover = (customMentionHandler === null || customMentionHandler === void 0 ? void 0 : customMentionHandler.onMentionsHover) || contextOnMentionsHover || (function () { return null; });
    return {
        onMentionsClick: createEventHandler(onMentionsClick, message),
        onMentionsHover: createEventHandler(onMentionsHover, message),
    };
};
