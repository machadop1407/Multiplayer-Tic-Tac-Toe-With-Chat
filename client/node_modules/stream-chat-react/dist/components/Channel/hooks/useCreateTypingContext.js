import { useMemo } from 'react';
export var useCreateTypingContext = function (value) {
    var typing = value.typing;
    var typingValue = Object.keys(typing || {}).join();
    var typingContext = useMemo(function () { return ({
        typing: typing,
    }); }, [typingValue]);
    return typingContext;
};
