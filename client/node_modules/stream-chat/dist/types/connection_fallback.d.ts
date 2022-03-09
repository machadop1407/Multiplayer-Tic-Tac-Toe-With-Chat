import { AxiosRequestConfig, CancelTokenSource } from 'axios';
import { StreamChat } from './client';
import { ConnectionOpen, UR, ExtendableGenerics, DefaultGenerics, LogLevel } from './types';
export declare enum ConnectionState {
    Closed = "CLOSED",
    Connected = "CONNECTED",
    Connecting = "CONNECTING",
    Disconnected = "DISCONNECTED",
    Init = "INIT"
}
export declare class WSConnectionFallback<StreamChatGenerics extends ExtendableGenerics = DefaultGenerics> {
    client: StreamChat<StreamChatGenerics>;
    state: ConnectionState;
    consecutiveFailures: number;
    connectionID?: string;
    cancelToken?: CancelTokenSource;
    constructor({ client }: {
        client: StreamChat<StreamChatGenerics>;
    });
    _log(msg: string, extra?: UR, level?: LogLevel): void;
    _setState(state: ConnectionState): void;
    /** @private */
    _onlineStatusChanged: (event: {
        type: string;
    }) => void;
    /** @private */
    _req: <T = UR>(params: UR, config: AxiosRequestConfig, retry: boolean) => Promise<T>;
    /** @private */
    _poll: () => Promise<void>;
    /**
     * connect try to open a longpoll request
     * @param reconnect should be false for first call and true for subsequent calls to keep the connection alive and call recoverState
     */
    connect: (reconnect?: boolean) => Promise<ConnectionOpen<StreamChatGenerics> | undefined>;
    /**
     * isHealthy checks if there is a connectionID and connection is in Connected state
     */
    isHealthy: () => boolean;
    disconnect: (timeout?: number) => Promise<void>;
}
//# sourceMappingURL=connection_fallback.d.ts.map