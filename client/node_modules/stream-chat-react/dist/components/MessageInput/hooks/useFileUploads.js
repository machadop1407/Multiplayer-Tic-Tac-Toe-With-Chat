var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useCallback, useEffect } from 'react';
import { checkUploadPermissions } from './utils';
import { useChannelActionContext } from '../../../context/ChannelActionContext';
import { useChannelStateContext } from '../../../context/ChannelStateContext';
import { useChatContext } from '../../../context/ChatContext';
import { useTranslationContext } from '../../../context/TranslationContext';
export var useFileUploads = function (props, state, dispatch) {
    var doFileUploadRequest = props.doFileUploadRequest, errorHandler = props.errorHandler;
    var fileUploads = state.fileUploads;
    var channel = useChannelStateContext('useFileUploads').channel;
    var addNotification = useChannelActionContext('useFileUploads').addNotification;
    var getAppSettings = useChatContext('useFileUploads').getAppSettings;
    var t = useTranslationContext('useFileUploads').t;
    var uploadFile = useCallback(function (id) {
        dispatch({ id: id, state: 'uploading', type: 'setFileUpload' });
    }, []);
    var removeFile = useCallback(function (id) {
        // TODO: cancel upload if still uploading
        dispatch({ id: id, type: 'removeFileUpload' });
    }, []);
    useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var upload, file, id, canUpload, response, error_1, errorMessage, alreadyRemoved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        upload = Object.values(fileUploads).find(function (fileUpload) { return fileUpload.state === 'uploading' && fileUpload.file; });
                        if (!upload)
                            return [2 /*return*/];
                        file = upload.file, id = upload.id;
                        return [4 /*yield*/, checkUploadPermissions({
                                addNotification: addNotification,
                                file: file,
                                getAppSettings: getAppSettings,
                                t: t,
                                uploadType: 'file',
                            })];
                    case 1:
                        canUpload = _a.sent();
                        if (!canUpload)
                            return [2 /*return*/, removeFile(id)];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, , 8]);
                        if (!doFileUploadRequest) return [3 /*break*/, 4];
                        return [4 /*yield*/, doFileUploadRequest(file, channel)];
                    case 3:
                        response = _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, channel.sendFile(file)];
                    case 5:
                        response = _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        errorMessage = typeof error_1.message === 'string'
                            ? error_1.message
                            : t('Error uploading file');
                        addNotification(errorMessage, 'error');
                        alreadyRemoved = false;
                        if (!fileUploads[id]) {
                            alreadyRemoved = true;
                        }
                        else {
                            dispatch({ id: id, state: 'failed', type: 'setFileUpload' });
                        }
                        if (!alreadyRemoved && errorHandler) {
                            // TODO: verify if the parameters passed to the error handler actually make sense
                            errorHandler(error_1, 'upload-file', file);
                        }
                        return [2 /*return*/];
                    case 8:
                        // If doImageUploadRequest returns any falsy value, then don't create the upload preview.
                        // This is for the case if someone wants to handle failure on app level.
                        if (!response) {
                            removeFile(id);
                            return [2 /*return*/];
                        }
                        dispatch({
                            id: id,
                            state: 'finished',
                            type: 'setFileUpload',
                            url: response.file,
                        });
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [fileUploads, channel, doFileUploadRequest, errorHandler, removeFile]);
    return {
        removeFile: removeFile,
        uploadFile: uploadFile,
    };
};
