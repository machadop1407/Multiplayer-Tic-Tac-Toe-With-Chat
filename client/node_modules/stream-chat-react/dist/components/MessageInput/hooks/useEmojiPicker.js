import { useCallback, useEffect, useRef } from 'react';
export var useEmojiPicker = function (state, dispatch, insertText, textareaRef, closeEmojiPickerOnClick) {
    var emojiPickerRef = useRef(null);
    var closeEmojiPicker = useCallback(function (event) {
        event.preventDefault();
        if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
            dispatch({
                type: 'setEmojiPickerIsOpen',
                value: false,
            });
        }
    }, [emojiPickerRef]);
    var openEmojiPicker = useCallback(function (event) {
        event.preventDefault();
        dispatch({
            type: 'setEmojiPickerIsOpen',
            value: true,
        });
        // Prevent event from bubbling to document, so the close handler is never called for this event
        event.stopPropagation();
    }, []);
    var handleEmojiKeyDown = function (event) {
        if (event.key === ' ' || event.key === 'Enter' || event.key === 'Spacebar') {
            event.preventDefault();
            /**
             * TODO: fix the below at some point because this type casting is wrong
             * and just forced to not have warnings currently with the unknown casting
             */
            openEmojiPicker(event);
        }
    };
    var handleEmojiEscape = function (event) {
        if (event.key === 'Escape') {
            dispatch({
                type: 'setEmojiPickerIsOpen',
                value: false,
            });
        }
    };
    useEffect(function () {
        if (state.emojiPickerIsOpen) {
            document.addEventListener('click', closeEmojiPicker, false);
            document.addEventListener('keydown', handleEmojiEscape);
        }
        return function () {
            document.removeEventListener('click', closeEmojiPicker, false);
            document.removeEventListener('keydown', handleEmojiEscape);
        };
    }, [closeEmojiPicker, state.emojiPickerIsOpen]);
    var onSelectEmoji = useCallback(function (emoji) {
        var _a;
        insertText(emoji.native);
        if (closeEmojiPickerOnClick) {
            dispatch({
                type: 'setEmojiPickerIsOpen',
                value: false,
            });
        }
        (_a = textareaRef === null || textareaRef === void 0 ? void 0 : textareaRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, [insertText]);
    return {
        closeEmojiPicker: closeEmojiPicker,
        emojiPickerRef: emojiPickerRef,
        handleEmojiKeyDown: handleEmojiKeyDown,
        onSelectEmoji: onSelectEmoji,
        openEmojiPicker: openEmojiPicker,
    };
};
