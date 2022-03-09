import { useMemo } from 'react';
import { useEmojiContext } from '../../../context/EmojiContext';
export var useEmojiIndex = function () {
    var _a = useEmojiContext('useEmojiIndex'), emojiConfig = _a.emojiConfig, EmojiIndex = _a.EmojiIndex;
    var emojiData = (emojiConfig || {}).emojiData;
    var emojiIndex = useMemo(function () {
        if (EmojiIndex) {
            // @ts-expect-error type here isn't registering the constructor type
            return new EmojiIndex(emojiData);
        }
    }, [emojiData, EmojiIndex]);
    return emojiIndex;
};
