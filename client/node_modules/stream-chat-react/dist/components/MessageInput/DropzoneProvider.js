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
import { ImageDropzone } from 'react-file-utils';
import { useCooldownTimer } from './hooks/useCooldownTimer';
import { useCreateMessageInputContext } from './hooks/useCreateMessageInputContext';
import { useMessageInputState } from './hooks/useMessageInputState';
import { useChannelStateContext } from '../../context/ChannelStateContext';
import { MessageInputContextProvider, useMessageInputContext, } from '../../context/MessageInputContext';
var DropzoneInner = function (_a) {
    var children = _a.children;
    var _b = useChannelStateContext('DropzoneProvider'), acceptedFiles = _b.acceptedFiles, multipleUploads = _b.multipleUploads;
    var _c = useMessageInputContext('DropzoneProvider'), cooldownRemaining = _c.cooldownRemaining, isUploadEnabled = _c.isUploadEnabled, maxFilesLeft = _c.maxFilesLeft, uploadNewFiles = _c.uploadNewFiles;
    return (React.createElement(ImageDropzone, { accept: acceptedFiles, disabled: !isUploadEnabled || maxFilesLeft === 0 || !!cooldownRemaining, handleFiles: uploadNewFiles, maxNumberOfFiles: maxFilesLeft, multiple: multipleUploads }, children));
};
export var DropzoneProvider = function (props) {
    var cooldownTimerState = useCooldownTimer();
    var messageInputState = useMessageInputState(props);
    var messageInputContextValue = useCreateMessageInputContext(__assign(__assign(__assign({}, cooldownTimerState), messageInputState), props));
    return (React.createElement(MessageInputContextProvider, { value: messageInputContextValue },
        React.createElement(DropzoneInner, null, props.children)));
};
