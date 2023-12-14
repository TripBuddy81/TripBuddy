// ==UserScript==
// @name         Remove embedded video clutter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove all the clutter from embedded videos
// @author       TripBuddy
// @match        https://www.youtube.com/embed*
// @match        https://*/embed*
// @match        https://static*
// @match        *videoassets*
// @match        https://videos*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.localhost
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    modifyIframe();
    javascript:setInterval( modifyIframe , 5000);

    function modifyIframe() {
        try {
            document.getElementsByClassName("ytp-right-controls")[0].remove();
        } catch(e) {
        }

/*        try {
            document.getElementsByClassName("ytp-volume-panel")[0].remove();
        } catch(e) {
        }*/

        try {
            document.getElementsByClassName("fp-embed")[0].remove();
        } catch(e) {
        }

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

        try {
            document.getElementsByClassName("html5-endscreen")[0].remove();
        } catch(e) {
        }

        try {
            document.getElementsByClassName("vjs-big-play-button")[0].remove();
        } catch(e) {
        }

        try {
            document.getElementsByClassName("ytp-ce-element")[0].remove();
        } catch(e) {
        }

        try {
            document.getElementsByClassName("ytp-ce-channel")[0].remove();
        } catch(e) {
        }

        try {
            document.getElementById("playerOverlay").remove();
        } catch(e) {
        }

        try {
            document.getElementsByClassName("big-buttons")[0].remove();
        } catch(e) {
        }

        try {
            document.getElementsByClassName("shaka-play-button-container")[0].remove();
        } catch(e) {
        }

        try {
            document.getElementsByClassName("xv-logo")[0].remove();
        } catch(e) {
        }
    }


})();