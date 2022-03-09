export var isMutableRef = function (ref) {
    if (ref) {
        return ref.current !== undefined;
    }
    return false;
};
