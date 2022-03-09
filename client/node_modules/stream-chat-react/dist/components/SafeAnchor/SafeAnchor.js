import React from 'react';
import { sanitizeUrl } from '@braintree/sanitize-url';
var UnMemoizedSafeAnchor = function (props) {
    var children = props.children, className = props.className, download = props.download, href = props.href, rel = props.rel, target = props.target;
    if (!href)
        return null;
    var sanitized = sanitizeUrl(href);
    return (React.createElement("a", { "aria-label": 'Attachment', className: className, download: download, href: sanitized, rel: rel, target: target }, children));
};
export var SafeAnchor = React.memo(UnMemoizedSafeAnchor);
