import React from 'react';
export declare type ModalProps = {
    /** If true, modal is opened or visible. */
    open: boolean;
    /** Callback handler for closing of modal. */
    onClose?: () => void | ((event?: React.BaseSyntheticEvent) => void);
};
export declare const Modal: React.FC<ModalProps>;
//# sourceMappingURL=Modal.d.ts.map