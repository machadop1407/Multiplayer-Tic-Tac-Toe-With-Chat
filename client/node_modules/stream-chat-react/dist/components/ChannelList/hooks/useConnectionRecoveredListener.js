import { useEffect } from 'react';
import { useChatContext } from '../../../context/ChatContext';
export var useConnectionRecoveredListener = function (forceUpdate) {
    var client = useChatContext('useConnectionRecoveredListener').client;
    useEffect(function () {
        var handleEvent = function () {
            if (forceUpdate) {
                forceUpdate();
            }
        };
        client.on('connection.recovered', handleEvent);
        return function () {
            client.off('connection.recovered', handleEvent);
        };
    }, []);
};
