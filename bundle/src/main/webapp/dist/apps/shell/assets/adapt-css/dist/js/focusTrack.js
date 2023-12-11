!function () {
    var w = window,
        d = w.document;

    if (w.onfocusin === undefined) {
        d.addEventListener('focus', addPolyfill, true);
        d.addEventListener('blur', addPolyfill, true);
        d.addEventListener('focusin', removePolyfill, true);
        d.addEventListener('focusout', removePolyfill, true);
    }
    function addPolyfill(e) {
        var type = e.type === 'focus' ? 'focusin' : 'focusout';
        var event = new CustomEvent(type, {bubbles: true, cancelable: false});
        event.c1Generated = true;
        e.target.dispatchEvent(event);
    }

    function removePolyfill(e) {
        if (!e.c1Generated) {
            d.removeEventListener('focus', addPolyfill, true);
            d.removeEventListener('blur', addPolyfill, true);
            d.removeEventListener('focusin', removePolyfill, true);
            d.removeEventListener('focusout', removePolyfill, true);
        }
        setTimeout(function () {
            d.removeEventListener('focusin', removePolyfill, true);
            d.removeEventListener('focusout', removePolyfill, true);
        });
    }

}();

;(function (body) {
    "use strict";

    var usingMouse;

    var preFocus = function (event) {
        usingMouse = (event.type === 'mousedown');
    };

    var addFocus = function (event) {
        if (usingMouse) {
            event.target.classList.add('is-mouse-focussed');
        }
    };

    var removeFocus = function (event) {
        event.target.classList.remove('is-mouse-focussed');
    };


    var bindEvents = function () {
        body.addEventListener('keydown', preFocus);
        body.addEventListener('mousedown', preFocus);
        body.addEventListener('focusin', addFocus);
        body.addEventListener('focusout', removeFocus);
    };

    document.addEventListener("DOMContentLoaded", function () {
        bindEvents();
    }, false);


})(document.body);