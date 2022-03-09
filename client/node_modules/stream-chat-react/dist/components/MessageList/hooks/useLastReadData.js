import { useMemo } from 'react';
import { getReadStates } from '../utils';
export var useLastReadData = function (props) {
    var messages = props.messages, read = props.read, returnAllReadData = props.returnAllReadData, userID = props.userID;
    return useMemo(function () {
        return getReadStates(messages.filter(function (_a) {
            var user = _a.user;
            return (user === null || user === void 0 ? void 0 : user.id) === userID;
        }), read, returnAllReadData);
    }, [messages, read, returnAllReadData, userID]);
};
