import { useState } from 'react';
export var useEditHandler = function (customInitialState, customSetEditing, customClearEditingHandler) {
    if (customInitialState === void 0) { customInitialState = false; }
    var _a = useState(customInitialState), editing = _a[0], setEditing = _a[1];
    var setEdit = customSetEditing ||
        (function (event) {
            if (event === null || event === void 0 ? void 0 : event.preventDefault) {
                event.preventDefault();
            }
            setEditing(true);
        });
    var clearEdit = customClearEditingHandler ||
        (function (event) {
            if (event === null || event === void 0 ? void 0 : event.preventDefault) {
                event.preventDefault();
            }
            setEditing(false);
        });
    return { clearEdit: clearEdit, editing: editing, setEdit: setEdit };
};
