/// <reference types="react" />
import type { ReactEventHandler } from '../types';
export declare type EditHandlerReturnType = {
    clearEdit: (event?: React.BaseSyntheticEvent) => void;
    editing: boolean;
    setEdit: ReactEventHandler;
};
export declare const useEditHandler: (customInitialState?: boolean, customSetEditing?: ((event?: import("react").BaseSyntheticEvent<object, any, any> | undefined) => void) | undefined, customClearEditingHandler?: ((event?: import("react").BaseSyntheticEvent<object, any, any> | undefined) => void) | undefined) => EditHandlerReturnType;
//# sourceMappingURL=useEditHandler.d.ts.map