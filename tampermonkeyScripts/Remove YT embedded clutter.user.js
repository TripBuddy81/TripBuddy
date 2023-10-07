// ==UserScript==
// @name         Remove YT embedded clutter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove all the clutter from youtube embedded videos
// @author       TripBuddy
// @match        https://www.youtube.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.localhost
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    removeFromIframe();
    javascript:setInterval( removeFromIframe , 5000);

    function removeFromIframe() {
        try {
            document.getElementsByClassName("ytp-button ytp-cards-button")[0].remove();
        } catch(e) {
        }

        try {
            document.getElementsByClassName("branding-img-container")[0].remove();
        } catch(e) {
        }

        try {
            document.getElementsByClassName("ytp-cards-teaser")[0].remove();
        } catch(e) {
        }

        try {
            document.getElementsByClassName("ytp-show-cards-title")[0].remove();
        } catch(e) {
        }

        try {
            document.getElementsByClassName("ytp-impression-link")[0].remove();
        } catch(e) {
        }

        try {
            document.getElementsByClassName("ytp-large-play-button")[0].remove();
        } catch(e) {
        }

    }


})();