import { useEffect, useRef } from 'react';
export function useShouldForceScrollToBottom(messages, currentUserId) {
    var lastFocusedOwnMessage = useRef('');
    var initialFocusRegistered = useRef(false);
    function recheckForNewOwnMessage() {
        var _a;
        if (messages && messages.length > 0) {
            var lastMessage = messages[messages.length - 1];
            if (((_a = lastMessage.user) === null || _a === void 0 ? void 0 : _a.id) === currentUserId &&
                lastFocusedOwnMessage.current !== lastMessage.id) {
                lastFocusedOwnMessage.current = lastMessage.id;
                return true;
            }
        }
        return false;
    }
    useEffect(function () {
        if (messages && messages.length && !initialFocusRegistered.current) {
            initialFocusRegistered.current = true;
            recheckForNewOwnMessage();
        }
    }, [messages, messages === null || messages === void 0 ? void 0 : messages.length]);
    return recheckForNewOwnMessage;
}
