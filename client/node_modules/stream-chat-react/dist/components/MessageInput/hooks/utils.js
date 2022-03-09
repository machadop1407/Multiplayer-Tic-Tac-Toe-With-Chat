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
export var accentsMap = {
    a: 'á|à|ã|â|À|Á|Ã|Â',
    c: 'ç|Ç',
    e: 'é|è|ê|É|È|Ê',
    i: 'í|ì|î|Í|Ì|Î',
    n: 'ñ|Ñ',
    o: 'ó|ò|ô|ő|õ|Ó|Ò|Ô|Õ',
    u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
};
export var removeDiacritics = function (text) {
    if (!text)
        return '';
    return Object.keys(accentsMap).reduce(function (acc, current) { return acc.replace(new RegExp(accentsMap[current], 'g'), current); }, text);
};
export var calculateLevenshtein = function (query, name) {
    if (query.length === 0)
        return name.length;
    if (name.length === 0)
        return query.length;
    var matrix = [];
    var i;
    for (i = 0; i <= name.length; i++) {
        matrix[i] = [i];
    }
    var j;
    for (j = 0; j <= query.length; j++) {
        matrix[0][j] = j;
    }
    for (i = 1; i <= name.length; i++) {
        for (j = 1; j <= query.length; j++) {
            if (name.charAt(i - 1) === query.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            }
            else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                Math.min(matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j] + 1)); // deletion
            }
        }
    }
    return matrix[name.length][query.length];
};
export var searchLocalUsers = function (params) {
    var ownUserId = params.ownUserId, query = params.query, text = params.text, useMentionsTransliteration = params.useMentionsTransliteration, users = params.users;
    var matchingUsers = users.filter(function (user) {
        if (user.id === ownUserId)
            return false;
        if (!query)
            return true;
        var updatedId = removeDiacritics(user.id).toLowerCase();
        var updatedName = removeDiacritics(user.name).toLowerCase();
        var updatedQuery = removeDiacritics(query).toLowerCase();
        if (useMentionsTransliteration) {
            (function () { return __awaiter(void 0, void 0, void 0, function () {
                var transliterate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, import('@stream-io/transliterate')];
                        case 1:
                            transliterate = (_a.sent()).default;
                            updatedName = transliterate(user.name || '').toLowerCase();
                            updatedQuery = transliterate(query).toLowerCase();
                            updatedId = transliterate(user.id).toLowerCase();
                            return [2 /*return*/];
                    }
                });
            }); })();
        }
        var maxDistance = 3;
        var lastDigits = text.slice(-(maxDistance + 1)).includes('@');
        if (updatedName) {
            var levenshtein_1 = calculateLevenshtein(updatedQuery, updatedName);
            if (updatedName.includes(updatedQuery) || (levenshtein_1 <= maxDistance && lastDigits)) {
                return true;
            }
        }
        var levenshtein = calculateLevenshtein(updatedQuery, updatedId);
        return updatedId.includes(updatedQuery) || (levenshtein <= maxDistance && lastDigits);
    });
    return matchingUsers;
};
export var checkUploadPermissions = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var addNotification, file, getAppSettings, t, uploadType, appSettings, _a, allowed_file_extensions, allowed_mime_types, blocked_file_extensions, blocked_mime_types, sendErrorNotification, allowed, blocked, allowed, blocked;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                addNotification = params.addNotification, file = params.file, getAppSettings = params.getAppSettings, t = params.t, uploadType = params.uploadType;
                appSettings = null;
                return [4 /*yield*/, getAppSettings()];
            case 1:
                appSettings = _d.sent();
                _a = (uploadType === 'image'
                    ? (_b = appSettings === null || appSettings === void 0 ? void 0 : appSettings.app) === null || _b === void 0 ? void 0 : _b.image_upload_config
                    : (_c = appSettings === null || appSettings === void 0 ? void 0 : appSettings.app) === null || _c === void 0 ? void 0 : _c.file_upload_config) || {}, allowed_file_extensions = _a.allowed_file_extensions, allowed_mime_types = _a.allowed_mime_types, blocked_file_extensions = _a.blocked_file_extensions, blocked_mime_types = _a.blocked_mime_types;
                sendErrorNotification = function () {
                    return addNotification(t("Upload type: \"{{ type }}\" is not allowed", { type: file.type || 'unknown type' }), 'error');
                };
                if (allowed_file_extensions === null || allowed_file_extensions === void 0 ? void 0 : allowed_file_extensions.length) {
                    allowed = allowed_file_extensions.some(function (ext) {
                        return file.name.toLowerCase().endsWith(ext.toLowerCase());
                    });
                    if (!allowed) {
                        sendErrorNotification();
                        return [2 /*return*/, false];
                    }
                }
                if (blocked_file_extensions === null || blocked_file_extensions === void 0 ? void 0 : blocked_file_extensions.length) {
                    blocked = blocked_file_extensions.some(function (ext) {
                        return file.name.toLowerCase().endsWith(ext.toLowerCase());
                    });
                    if (blocked) {
                        sendErrorNotification();
                        return [2 /*return*/, false];
                    }
                }
                if (allowed_mime_types === null || allowed_mime_types === void 0 ? void 0 : allowed_mime_types.length) {
                    allowed = allowed_mime_types.some(function (type) { var _a; return type.toLowerCase() === ((_a = file.type) === null || _a === void 0 ? void 0 : _a.toLowerCase()); });
                    if (!allowed) {
                        sendErrorNotification();
                        return [2 /*return*/, false];
                    }
                }
                if (blocked_mime_types === null || blocked_mime_types === void 0 ? void 0 : blocked_mime_types.length) {
                    blocked = blocked_mime_types.some(function (type) { var _a; return type.toLowerCase() === ((_a = file.type) === null || _a === void 0 ? void 0 : _a.toLowerCase()); });
                    if (blocked) {
                        sendErrorNotification();
                        return [2 /*return*/, false];
                    }
                }
                return [2 /*return*/, true];
        }
    });
}); };
