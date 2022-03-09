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
export var commonEmoji = {
    custom: true,
    emoticons: [],
    short_names: [],
};
export var emojiSetDef = {
    imageUrl: '',
    sheetColumns: 2,
    sheetRows: 3,
    sheetSize: 64,
    spriteUrl: 'https://getstream.imgix.net/images/emoji-sprite.png',
};
export var defaultMinimalEmojis = [
    __assign(__assign({ colons: ':+1:', id: 'like', name: 'like', sheet_x: 0, sheet_y: 0 }, commonEmoji), emojiSetDef),
    __assign(__assign({ colons: ':heart:', id: 'love', name: 'love', sheet_x: 1, sheet_y: 2 }, commonEmoji), emojiSetDef),
    __assign(__assign({ colons: ':joy:', id: 'haha', name: 'haha', sheet_x: 1, sheet_y: 0 }, commonEmoji), emojiSetDef),
    __assign(__assign({ colons: ':astonished:', id: 'wow', name: 'wow', sheet_x: 0, sheet_y: 2 }, commonEmoji), emojiSetDef),
    __assign(__assign({ colons: ':pensive:', id: 'sad', name: 'sad', sheet_x: 0, sheet_y: 1 }, commonEmoji), emojiSetDef),
    __assign(__assign({ colons: ':angry:', id: 'angry', name: 'angry', sheet_x: 1, sheet_y: 1 }, commonEmoji), emojiSetDef),
];
// use this only for small lists like in ReactionSelector
export var getStrippedEmojiData = function (data) { return (__assign(__assign({}, data), { emojis: {} })); };
