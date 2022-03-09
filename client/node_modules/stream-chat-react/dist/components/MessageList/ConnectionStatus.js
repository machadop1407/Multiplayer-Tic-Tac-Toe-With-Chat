import React, { useEffect, useState } from 'react';
import { CustomNotification } from './CustomNotification';
import { useChatContext, useTranslationContext } from '../../context';
var UnMemoizedConnectionStatus = function () {
    var client = useChatContext('ConnectionStatus').client;
    var t = useTranslationContext('ConnectionStatus').t;
    var _a = useState(true), online = _a[0], setOnline = _a[1];
    useEffect(function () {
        var connectionChanged = function (_a) {
            var _b = _a.online, onlineStatus = _b === void 0 ? false : _b;
            if (online !== onlineStatus) {
                setOnline(onlineStatus);
            }
        };
        client.on('connection.changed', connectionChanged);
        return function () { return client.off('connection.changed', connectionChanged); };
    }, [client, online]);
    return (React.createElement(CustomNotification, { active: !online, type: 'error' }, t('Connection failure, reconnecting now...')));
};
export var ConnectionStatus = React.memo(UnMemoizedConnectionStatus);
