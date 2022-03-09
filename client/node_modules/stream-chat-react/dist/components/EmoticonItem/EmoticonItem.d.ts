import React from 'react';
export declare type EmoticonItemProps = {
    entity: {
        /** The parts of the Name property of the entity (or id if no name) that can be matched to the user input value.
         * Default is bold for matches, but can be overwritten in css.
         * */
        itemNameParts: {
            match: string;
            parts: string[];
        };
        /** Name for emoticon */
        name: string;
        /** Native value or actual emoticon */
        native: string;
    };
};
export declare const EmoticonItem: React.FC<EmoticonItemProps>;
//# sourceMappingURL=EmoticonItem.d.ts.map