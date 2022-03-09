import type { BaseEmoji, Data as EmojiData } from 'emoji-mart';
import type { CommonEmoji, EmojiSetDef, MinimalEmoji } from '../../context/EmojiContext';
export declare type ReactionEmoji = BaseEmoji | MinimalEmoji;
export declare const commonEmoji: CommonEmoji;
export declare const emojiSetDef: EmojiSetDef;
export declare const defaultMinimalEmojis: MinimalEmoji[];
export declare const getStrippedEmojiData: (data: EmojiData) => {
    emojis: {};
    compressed: boolean;
    categories: import("emoji-mart/dist-es/utils/data").Category[];
    aliases: {
        [key: string]: string;
    };
};
//# sourceMappingURL=emojiData.d.ts.map