import { useCallback, useEffect, useRef } from 'react';
import { logChatPromiseExecution } from 'stream-chat';
import { useChannelStateContext } from '../../../context/ChannelStateContext';
export var useMessageInputText = function (props, state, dispatch) {
    var channel = useChannelStateContext('useMessageInputText').channel;
    var additionalTextareaProps = props.additionalTextareaProps, focus = props.focus, parent = props.parent, _a = props.publishTypingEvent, publishTypingEvent = _a === void 0 ? true : _a;
    var text = state.text;
    var textareaRef = useRef();
    // Focus
    useEffect(function () {
        if (focus && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [focus]);
    // Text + cursor position
    var newCursorPosition = useRef();
    var insertText = useCallback(function (textToInsert) {
        var maxLength = (additionalTextareaProps || {}).maxLength;
        if (!textareaRef.current) {
            dispatch({
                getNewText: function (text) {
                    var updatedText = text + textToInsert;
                    if (maxLength && updatedText.length > maxLength) {
                        return updatedText.slice(0, maxLength);
                    }
                    return updatedText;
                },
                type: 'setText',
            });
            return;
        }
        var _a = textareaRef.current, selectionEnd = _a.selectionEnd, selectionStart = _a.selectionStart;
        newCursorPosition.current = selectionStart + textToInsert.length;
        dispatch({
            getNewText: function (prevText) {
                var updatedText = prevText.slice(0, selectionStart) + textToInsert + prevText.slice(selectionEnd);
                if (maxLength && updatedText.length > maxLength) {
                    return updatedText.slice(0, maxLength);
                }
                return updatedText;
            },
            type: 'setText',
        });
    }, [additionalTextareaProps, newCursorPosition, textareaRef]);
    useEffect(function () {
        var textareaElement = textareaRef.current;
        if (textareaElement && newCursorPosition.current !== undefined) {
            textareaElement.selectionStart = newCursorPosition.current;
            textareaElement.selectionEnd = newCursorPosition.current;
            newCursorPosition.current = undefined;
        }
    }, [text, newCursorPosition]);
    var handleChange = useCallback(function (event) {
        event.preventDefault();
        if (!event || !event.target) {
            return;
        }
        var newText = event.target.value;
        dispatch({
            getNewText: function () { return newText; },
            type: 'setText',
        });
        if (publishTypingEvent && newText && channel) {
            logChatPromiseExecution(channel.keystroke(parent === null || parent === void 0 ? void 0 : parent.id), 'start typing event');
        }
    }, [channel, parent, publishTypingEvent]);
    return {
        handleChange: handleChange,
        insertText: insertText,
        textareaRef: textareaRef,
    };
};
