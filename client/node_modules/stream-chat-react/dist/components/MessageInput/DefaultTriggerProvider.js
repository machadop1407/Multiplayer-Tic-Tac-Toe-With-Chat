var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import { useCommandTrigger } from './hooks/useCommandTrigger';
import { useEmojiTrigger } from './hooks/useEmojiTrigger';
import { useUserTrigger } from './hooks/useUserTrigger';
import { MessageInputContextProvider, useMessageInputContext, } from '../../context/MessageInputContext';
export var DefaultTriggerProvider = function (_a) {
    var children = _a.children;
    var currentValue = useMessageInputContext('DefaultTriggerProvider');
    var defaultAutocompleteTriggers = {
        '/': useCommandTrigger(),
        ':': useEmojiTrigger(currentValue.emojiIndex),
        '@': useUserTrigger({
            disableMentions: currentValue.disableMentions,
            mentionAllAppUsers: currentValue.mentionAllAppUsers,
            mentionQueryParams: currentValue.mentionQueryParams,
            onSelectUser: currentValue.onSelectUser,
            useMentionsTransliteration: currentValue.useMentionsTransliteration,
        }),
    };
    var newValue = __assign(__assign({}, currentValue), { autocompleteTriggers: defaultAutocompleteTriggers });
    return React.createElement(MessageInputContextProvider, { value: newValue }, children);
};
