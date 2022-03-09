import React from 'react';
import { useTranslationContext } from '../../context/TranslationContext';
export var DefaultSuggestionListHeader = function (props) {
    var currentTrigger = props.currentTrigger, value = props.value;
    var t = useTranslationContext('DefaultSuggestionListHeader').t;
    var triggerIndex = value.lastIndexOf(currentTrigger);
    if (currentTrigger === '/') {
        return (React.createElement(React.Fragment, null,
            t('Commands matching'),
            " ",
            React.createElement("strong", null, value.slice(triggerIndex + 1))));
    }
    if (currentTrigger === ':') {
        return (React.createElement(React.Fragment, null,
            t('Emoji matching'),
            " ",
            React.createElement("strong", null, value.slice(triggerIndex + 1))));
    }
    if (currentTrigger === '@') {
        return (React.createElement(React.Fragment, null,
            t('People matching'),
            " ",
            React.createElement("strong", null, value.slice(triggerIndex + 1))));
    }
    return null;
};
