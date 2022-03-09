import { Secret } from 'jsonwebtoken';
import { TokenOrProvider, ExtendableGenerics, DefaultGenerics, UserResponse } from './types';
/**
 * TokenManager
 *
 * Handles all the operations around user token.
 */
export declare class TokenManager<StreamChatGenerics extends ExtendableGenerics = DefaultGenerics> {
    loadTokenPromise: Promise<string> | null;
    type: 'static' | 'provider';
    secret?: Secret;
    token?: string;
    tokenProvider?: TokenOrProvider;
    user?: UserResponse<StreamChatGenerics>;
    /**
     * Constructor
     *
     * @param {Secret} secret
     */
    constructor(secret?: Secret);
    /**
     * Set the static string token or token provider.
     * Token provider should return a token string or a promise which resolves to string token.
     *
     * @param {TokenOrProvider} tokenOrProvider
     * @param {UserResponse<StreamChatGenerics>} user
     */
    setTokenOrProvider: (tokenOrProvider: TokenOrProvider, user: UserResponse<StreamChatGenerics>) => Promise<void>;
    /**
     * Resets the token manager.
     * Useful for client disconnection or switching user.
     */
    reset: () => void;
    validateToken: (tokenOrProvider: TokenOrProvider, user: UserResponse<StreamChatGenerics>) => void;
    tokenReady: () => Promise<string> | null;
    loadToken: () => Promise<string>;
    getToken: () => string | undefined;
    isStatic: () => boolean;
}
//# sourceMappingURL=token_manager.d.ts.map