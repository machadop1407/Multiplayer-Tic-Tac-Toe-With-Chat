import { useEffect } from 'react';
export var useMobileNavigation = function (channelListRef, navOpen, closeMobileNav) {
    useEffect(function () {
        var handleClickOutside = function (event) {
            if (closeMobileNav &&
                channelListRef.current &&
                !channelListRef.current.contains(event.target) &&
                navOpen) {
                closeMobileNav();
            }
        };
        document.addEventListener('click', handleClickOutside);
        return function () {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [channelListRef, closeMobileNav, navOpen]);
};
