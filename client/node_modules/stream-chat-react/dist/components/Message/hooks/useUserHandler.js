export var useUserHandler = function (message, eventHandlers) { return ({
    onUserClick: function (event) {
        if (typeof (eventHandlers === null || eventHandlers === void 0 ? void 0 : eventHandlers.onUserClickHandler) !== 'function' || !(message === null || message === void 0 ? void 0 : message.user)) {
            return;
        }
        eventHandlers.onUserClickHandler(event, message.user);
    },
    onUserHover: function (event) {
        if (typeof (eventHandlers === null || eventHandlers === void 0 ? void 0 : eventHandlers.onUserHoverHandler) !== 'function' || !(message === null || message === void 0 ? void 0 : message.user)) {
            return;
        }
        eventHandlers.onUserHoverHandler(event, message.user);
    },
}); };
