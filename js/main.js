$( document ).ready( function () {
    // ***********************************
    // Globals
    var pizzaTimerMinutesTillReady = 18;
    var minutesCountAtLastDisplayedThought = 0; // This is the minute the first time a reminder is displayed at all
    var isFullScreen = false;
    var lastDisplayedImage = config['images'][0]['image'];
    var minutesTillNextThought = 0;
    var allGuidedThoughts = [];
    var guidedThoughtsNext = 0;
    var keyCache = {};
    var timer = '';
    var imageSlideshowInterval = undefined;
    var imageSlideshowIntervalLength = 1000;
    var start = '';
    var currentState = 'ignition';
    var lastState = '';
    var topUpReminderShown1 = false;
    var topUpReminderShown2 = false;
    var orderPizzaReminderShown = false;
    var pizzaTimerShown = false;
    var imageSectionShown = false;
    var gameSectionShown = false;
    var totalMins = 0;
    var veryFirstThoughtDisplayed = false;
    var xxxVisible = false;
    var slideshowJustStarted = false;
    var lastActiveBackgroundGradientKeyFrame = 1;

    Object.assign( config, optionalConfig );

    // Disable right click context menu
    $( document ).bind( 'contextmenu', function ( e ) {
        if ( $( e.target ).attr( 'type' ) != 'text' ) {
            return false;
        }
    } );

    // If debug mode is active, remove all but some videos (speeds up load time)
    if ( localStorage.getItem( 'debugModeSetting' ) == 'true' ) {
        $.each( config['videosYoutube'], function ( key, value ) {
            if ( key >= 2 ) {
                delete config['videosYoutube'][key];
            }
        } );
    }

    // ***********************************
    // Handlebar renderer - takes config within config/config.js
    $( 'body' ).html(
            Handlebars.compile( $( '#mainTemplate' ).html() )( config )
    );

    // Check if loading is complete
    document.onreadystatechange = function () {
        if ( document.readyState !== 'complete' ) {
        } else {
            $( '#launchText' ).html( 'Start!' );

            /*            $( '.videoFilterBtn' ).each( function () {
                            $( this ).trigger( 'click' );
                            return false;
                        } );*/
        }
    };

    // Firefox does not want to play along
    userAgentString = navigator.userAgent;
    if ( userAgentString.indexOf( 'Firefox' ) > -1 ) {
        $( '#launchText' ).html( 'Start!' );
    }

    if ( config['VRGames'] ) {
        $( '.VRGamesBtn' ).attr( 'style', 'display:inline-block' );
        $( '.VRGamesBtn' ).show();
    }

    // Init keyboard
    $( document ).keyboard( {
        language           : 'german',
        keyboardPosition   : 'middle',
        acceptColor        : '#809bce',
        acceptTextColor    : '#000000',
        inputType          : 'text',
        blackoutColor      : '25, 25, 25, 0.75',
        specifiedFieldsOnly: true
    } );
    $( '*[data-trigger-keyboard]' ).click( function () {
        $( window ).trigger( 'resize' );
        $( this ).val( '' );
    } );

    // Init gradient background
    refreshGradientBackground();

    function refreshGradientBackground() {
        lastActiveBackgroundGradientKeyFrame = (lastActiveBackgroundGradientKeyFrame + 1) % 2;

        /*https://cssgradient.io/*/

        multiple = new Multiple( {
            selector  : '.sharedBackground',
            background: 'linear-gradient(-45deg, rgba(245,255,115,1) 0%, rgba(155,255,107,1) 26%, rgba(72,205,255,1) 71%, rgba(144,107,255,1) 100%);background-size: 400% 400%;animation: backgroundgradient' + lastActiveBackgroundGradientKeyFrame + ' 10s ease infinite;'
        } );
    }

    // ***********************************
    // Main Menu
    $( '#mainMenu' ).hover(
            function ( event ) {
                if ( $( '#mainMenu' ).attr( 'style' ) == 'opacity:0' ) {
                    refreshGradientBackground();
                }

                $( '#mainMenu' ).attr( 'style', 'opacity:1' );
                $( '#imageTags' ).show();
                $( '#gamesLinks' ).show();
            }, function () {
            }
    );

    $( '#showVideoSection' ).click( function () {
        $( '#videos' ).show();
        $( '#images' ).hide();
        $( '#disco' ).hide();
        $( '#games' ).hide();

        $( '.mainSectionActive' ).each( function () {
            $( this ).toggleClass( 'mainSectionActive' );
        } );
        $( this ).toggleClass( 'mainSectionActive' );

        enableFullscreen();
        refreshGradientBackground();
    } );
    $( '#showImageSection' ).click( function () {
        $( '#videos' ).hide();
        $( '#images' ).show();
        $( '#disco' ).hide();
        $( '#games' ).hide();

        $( '.mainSectionActive' ).each( function () {
            $( this ).toggleClass( 'mainSectionActive' );
        } );
        $( this ).toggleClass( 'mainSectionActive' );

        if ( !imageSectionShown ) {
            $( '.imageFilterBtn' ).each( function () {
                $( this ).trigger( 'click' );
                return false;
            } );
            imageSectionShown = true;
        }

        enableFullscreen();
        refreshGradientBackground();
    } );
    $( '#showDiscoSection' ).click( function () {
        $( '#videos' ).hide();
        $( '#images' ).hide();
        $( '#disco' ).show();
        $( '#games' ).hide();

        $( '.mainSectionActive' ).each( function () {
            $( this ).toggleClass( 'mainSectionActive' );
        } );
        $( this ).toggleClass( 'mainSectionActive' );

        renderDiscoSection( showParticles );
        enableFullscreen();
        refreshGradientBackground();
    } );
    $( '#showGamesSection' ).click( function () {
        $( '#videos' ).hide();
        $( '#images' ).hide();
        $( '#disco' ).hide();
        $( '#games' ).show();

        $( '.mainSectionActive' ).each( function () {
            $( this ).toggleClass( 'mainSectionActive' );
        } );
        $( this ).toggleClass( 'mainSectionActive' );

        if ( !gameSectionShown ) {
            $( '.gameLink' ).each( function () {
                if ( $( this ).is( ':visible' ) ) {
                    $( this ).trigger( 'click' );
                    return false;
                }
            } );
            gameSectionShown = true;
        }

        $( 'html, body' ).animate( {scrollTop: 0}, 'fast' );

        enableFullscreen();
        refreshGradientBackground();
    } );

    $( '.menuItem' ).click( function () {
        $( '#menuClose' ).trigger( 'click' );
    } );

    // ******************************************
    // Enable hidden menue
    $( '.XXX' ).hide();
    $( document ).keydown( function ( e ) {
        keyCache[e.which] = true;
        if ( 17 in keyCache && 18 in keyCache && 88 in keyCache ) {
            $( '.XXX' ).toggle();
            xxxVisible = !xxxVisible;
            $( '.videoFilterBtn' ).each( function () {
                $( this ).trigger( 'click' );
                return false;
            } );
        }
    } );
    $( document ).keyup( function ( e ) {
        delete keyCache[e.which];
    } );

    var rightMouseClicked = false;
    $( '#acticateHiddenMenue' ).mousedown( function ( event ) {
        switch ( event.which ) {
            case 1:
                if ( rightMouseClicked ) {
                    $( '.XXX' ).toggle();
                    xxxVisible = !xxxVisible;
                    rightMouseClicked = false;
                    $( '.videoFilterBtn' ).each( function () {
                        $( this ).trigger( 'click' );
                        return false;
                    } );
                }
                break;
            case 3:
                rightMouseClicked = true;
                break;
        }
    } );
    $( '#acticateHiddenMenue' ).mouseout( function ( event ) {
        rightMouseClicked = false;
    } );

    // ******************************************
    // Start button & preFlightChecklist & Reminders
    $( '#launchText' ).click( function ( e ) {
        localStorage.setItem( 'topupReminderInMinutes1', '' );
        localStorage.setItem( 'topupReminderInMinutes2', '' );
        localStorage.setItem( 'orderPizzaReminderInMinutes', '' );
        enableFullscreen();

        if ( localStorage.getItem( 'activateAllSectionsOnce' ) == 'true' ) {
            activateAllSectionsOnce(); /* DOES NOT REALLY WORK AS INTENDED ...*/
        }
    } );

    // Lift off - initialize a lot of stuff
    $( '#liftOff' ).click( function ( e ) {
        timer = setInterval( tripTimer, 1000 );
        start = new Date();

        localStorage.setItem( 'pizzaTimerStartMinutes', '' );

        minutesTillNextThought = randomIntFromInterval( localStorage.getItem( 'guidedThoughtMinMinutes' ), localStorage.getItem( 'guidedThoughtMaxMinutes' ) );

        $( '#preFlightChecklist' ).modal( 'hide' );
        $( '#launchText' ).hide();
        $( '#progressGraphContainer' ).show();

        if ( localStorage.getItem( 'guidedThought1' ) != '' ) {
            allGuidedThoughts.push( localStorage.getItem( 'guidedThought1' ) );
        }
        if ( localStorage.getItem( 'guidedThought2' ) != '' ) {
            allGuidedThoughts.push( localStorage.getItem( 'guidedThought2' ) );
        }
        if ( localStorage.getItem( 'guidedThought3' ) != '' ) {
            allGuidedThoughts.push( localStorage.getItem( 'guidedThought3' ) );
        }
        $( '.menuvisibleAfterStarted' ).show();
        if ( allGuidedThoughts.length == 0 ) {
            $( '.deactivateGuidedThoughts' ).hide();
        }
    } );

    // Top up Reminder Config
    $( '#topupCheckbox1' ).change( function () {
        if ( $( '#topupCheckbox1' ).is( ':checked' ) ) {
            localStorage.setItem( 'topupReminderInMinutes1', $( '#topupReminderInMinutes1' ).val() );
        } else {
            localStorage.setItem( 'topupReminderInMinutes1', '' );
        }
    } );
    $( '#topupReminderInMinutes1' ).change( function () {
        if ( $( '#topupCheckbox1' ).is( ':checked' ) ) {
            localStorage.setItem( 'topupReminderInMinutes1', $( '#topupReminderInMinutes1' ).val() );
        }
    } );
    $( '#topupCheckbox2' ).change( function () {
        if ( $( '#topupCheckbox2' ).is( ':checked' ) ) {
            localStorage.setItem( 'topupReminderInMinutes2', $( '#topupReminderInMinutes2' ).val() );
        } else {
            localStorage.setItem( 'topupReminderInMinutes2', '' );
        }
    } );
    $( '#topupReminderInMinutes2' ).change( function () {
        if ( $( '#topupCheckbox2' ).is( ':checked' ) ) {
            localStorage.setItem( 'topupReminderInMinutes2', $( '#topupReminderInMinutes2' ).val() );
        }
    } );

    // Order Pizza Reminder Config
    $( '#orderPizzaCheckbox' ).change( function () {
        if ( $( '#orderPizzaCheckbox' ).is( ':checked' ) ) {
            localStorage.setItem( 'orderPizzaReminderInMinutes', $( '#orderPizzaReminderInMinutes' ).val() );
        } else {
            localStorage.setItem( 'orderPizzaReminderInMinutes', '' );
        }
    } );
    $( '#orderPizzaReminderInMinutes' ).change( function () {
        if ( $( '#orderPizzaCheckbox' ).is( ':checked' ) ) {
            localStorage.setItem( 'orderPizzaReminderInMinutes', $( '#orderPizzaReminderInMinutes' ).val() );
        }
    } );

    // Guided Thoughts Config
    localStorage.setItem( 'guidedThought1', '' );
    localStorage.setItem( 'guidedThought2', '' );
    localStorage.setItem( 'guidedThought3', '' );
    localStorage.setItem( 'guidedThoughtMinMinutes', $( '#guidedThoughtMinMinutes' ).val() );
    localStorage.setItem( 'guidedThoughtMaxMinutes', $( '#guidedThoughtMaxMinutes' ).val() );
    localStorage.setItem( 'minutesCountAtLastDisplayedThought', $( '#firstGuidedThoughtMin' ).val() );
    $( '.guidedThoughtsContainer, .deactivateGuidedThoughts' ).click( function () {
        $( '.guidedThoughtsContainer' ).hide();
        $( '.deactivateGuidedThoughts' ).hide();
        while ( allGuidedThoughts.length ) {
            allGuidedThoughts.pop();
        }
    } );
    $( '.guidedThoughtsTextInput' ).change( function () {
        localStorage.setItem( $( this ).attr( 'id' ), jQuery.trim( $( this ).val() ) );
    } );
    $( '.guidedThoughtMinutes' ).change( function () {
        localStorage.setItem( $( this ).attr( 'id' ), jQuery.trim( $( this ).val() ) );
    } );

    $( '#firstGuidedThoughtMin' ).change( function () {
        localStorage.setItem( 'minutesCountAtLastDisplayedThought', jQuery.trim( $( this ).val() ) );
    } );

    guidedThoughtPrefilTarget = 1;
    $( '.reminderSuggestion' ).click( function () {
        $( '#guidedThought' + guidedThoughtPrefilTarget ).val( $( this ).html() );
        $( '#guidedThought' + guidedThoughtPrefilTarget ).trigger( 'change' );
        guidedThoughtPrefilTarget += 1;

        if ( guidedThoughtPrefilTarget == 4 ) {
            guidedThoughtPrefilTarget = 1;
        }
    } );
    $( '#clearReminders' ).click( function () {
        $( '#guidedThought1' ).val( '' );
        $( '#guidedThought1' ).trigger( 'change' );
        $( '#guidedThought2' ).val( '' );
        $( '#guidedThought2' ).trigger( 'change' );
        $( '#guidedThought3' ).val( '' );
        $( '#guidedThought3' ).trigger( 'change' );
        guidedThoughtPrefilTarget = 1;
    } );

    // ******************************************
    // Pizza timer
    $( '#startPizzaTimer' ).click( function ( e ) {
        localStorage.setItem( 'pizzaTimerStartMinutes', totalMins );
        pizzaTimerShown = false;
        $( '#yinYangContainer' ).hide();
        $( '#pizzaTimerContainer' ).show();
    } );
    $( '#pizzaTimerContainer' ).click( function ( e ) {
        $( '#pizzaTimerContainer' ).hide();
        $( '#yinYangContainer' ).show();
    } );

    // ******************************************
    // enable/disable screen
    $( '#turnScreenBlack' ).click( function ( e ) {
        enableFullscreen();
        e.stopPropagation();
        $( 'body' ).hide();
        $( 'html' ).attr( 'style', 'background-color:black;cursor:none !important;' );
    } );
    $( 'html' ).click( function () {
        $( 'body' ).show();
        $( 'html' ).attr( 'style', 'cursor:auto;' );
    } );

    // ******************************************
    // absoluteTruthOverlay
    $( '#yinYangSymbol' ).click( function ( e ) {
        enableFullscreen();
        $( '#absoluteTruthsOverlay' ).show();
    } );
    $( '#absoluteTruthsOverlay' ).click( function () {
        $( '#absoluteTruthsOverlay' ).hide();
    } );

    setInterval( absoluteTruthsUpdate, 10000 );

    function absoluteTruthsUpdate() {
        $( '#absoluteTruthsOverlayText' ).html( config['absoluteTruths'][Math.floor( Math.random() * config['absoluteTruths'].length )] );
    }

    // ******************************************
    // Timer && Graph && Time dependent actions
    function tripTimer() {
        var now = new Date();
        var diffMs = (now - start);
        var diffHrs = displayHour = Math.floor( diffMs / 3600000 );
        var diffMins = displayMinute = Math.floor( diffMs / 60000 ) % 60;
        totalMins = Math.floor( diffMs / 60000 );

        if ( diffMins <= 9 ) {
            displayMinute = '0' + diffMins;
        }
        if ( diffHrs <= 9 ) {
            displayHour = '0' + diffHrs;
        }

        $( '#timerMinutes' ).show();
        document.getElementById( 'displayHour' ).innerHTML = displayHour;
        document.getElementById( 'displayMinute' ).innerHTML = displayMinute;
        $( '.videoMenuOverlayFullscreenTime' ).html( displayHour + ':' + displayMinute );

        // Update progressGraph
        $( '.progressGraphElement' ).each( function () {
            minMinutes = $( this ).attr( 'data-time' );
            if ( minMinutes <= totalMins ) {
                $( this ).parent().append( '<td class="activeprogressGraphElement" style="' + $( this ).attr( 'style' ) + '"></td>' );
                $( this ).removeClass( 'progressGraphElement' );
                currentState = $( this ).attr( 'data-progressGraphState' );
            }
        } );

        if ( currentState != lastState ) {
            lastState = currentState;
        }

        if ( currentState == 'ignition' ) {
            color = '#60d394';
            updateprogressGraphColor( color );
        } else if ( currentState == 'onset' ) {
            color = '#ffd97d';
            updateprogressGraphColor( color );
        } else if ( currentState == 'peak' ) {
            color = '#ee6055';
            updateprogressGraphColor( color );
        } else {
            color = '#60d394';
            updateprogressGraphColor( color );
        }

        // Reminder Display - Pizza Timer
        if ( localStorage.getItem( 'pizzaTimerStartMinutes' ) != undefined && localStorage.getItem( 'pizzaTimerStartMinutes' ) != '' ) {
            minutesPassed = totalMins - parseInt( localStorage.getItem( 'pizzaTimerStartMinutes' ) );
            if ( minutesPassed <= 9 ) {
                minutesPassed = '0' + minutesPassed;
            }
            $( '#pizzaTimerProgress' ).html( minutesPassed );
        }
        if ( localStorage.getItem( 'pizzaTimerStartMinutes' ) != undefined && localStorage.getItem( 'pizzaTimerStartMinutes' ) != '' && totalMins >= (parseInt( localStorage.getItem( 'pizzaTimerStartMinutes' ) ) + pizzaTimerMinutesTillReady) && pizzaTimerShown == false ) {
            pizzaTimerShown = true;
            showTimedRecommendation( 'Pizza is ready!!!' );
        }
        // Reminder Display - Top up
        if ( localStorage.getItem( 'topupReminderInMinutes1' ) > 0 && totalMins >= parseInt( localStorage.getItem( 'topupReminderInMinutes1' ) ) && topUpReminderShown1 == false ) {
            topUpReminderShown1 = true;
            showTimedRecommendation( '??? Top up Shrooms ???' );
        }
        if ( localStorage.getItem( 'topupReminderInMinutes2' ) > 0 && totalMins >= parseInt( localStorage.getItem( 'topupReminderInMinutes2' ) ) && topUpReminderShown2 == false ) {
            topUpReminderShown2 = true;
            showTimedRecommendation( '??? Take Weed ???' );
        }
        // Reminder Display - Order Pizza
        if ( localStorage.getItem( 'orderPizzaReminderInMinutes' ) > 0 && totalMins >= parseInt( localStorage.getItem( 'orderPizzaReminderInMinutes' ) ) && orderPizzaReminderShown == false ) {
            orderPizzaReminderShown = true;
            showTimedRecommendation( 'Order Pizza!' );
        }
        $( '#timedRecommendation' ).click( function ( event ) {
            $( '#timedRecommendation' ).modal( 'hide' );
        } );

        // Guided Thoughts
        if ( allGuidedThoughts[guidedThoughtsNext] != undefined && ((totalMins == minutesTillNextThought + parseInt( localStorage.getItem( 'minutesCountAtLastDisplayedThought' ) )) || (totalMins == parseInt( localStorage.getItem( 'minutesCountAtLastDisplayedThought' ) ) && veryFirstThoughtDisplayed != true)) ) {
            veryFirstThoughtDisplayed = true;
            localStorage.setItem( 'minutesCountAtLastDisplayedThought', totalMins );
            minutesTillNextThought = randomIntFromInterval( localStorage.getItem( 'guidedThoughtMinMinutes' ), localStorage.getItem( 'guidedThoughtMaxMinutes' ) );
            $( '.guidedThoughtsText' ).html( allGuidedThoughts[guidedThoughtsNext] );
            $( '.guidedThoughtsContainer' ).show();
            $( '.guidedThoughtsContainer' ).delay( 15000 ).fadeOut( 'slow' );
            guidedThoughtsNext += 1;
            guidedThoughtsNext = guidedThoughtsNext % allGuidedThoughts.length;
        }
    }

    function showTimedRecommendation( recommendationText ) {
        if ( document.elementFromPoint( 40, 40 ).classList.contains( 'videoFrame' ) ) {
            disableFullscreen();
            $( '.videoMenuOverlayMinimized, .videoMenuOverlayMinimized2' ).show();
            $( '.videoMenuOverlayFullscreen, .videoMenuOverlayFullscreen2' ).hide();
        }

        if ( document.elementFromPoint( 0, 0 ).nodeName == 'IMG' ) {
            document.elementFromPoint( 0, 0 ).click();
        }

        $( '#timedRecommendation' ).modal( 'show' );
        $( '#topupRecommendation' ).html( recommendationText );
        $( '#topupRecommendation' ).show();
    }

    function randomIntFromInterval( min, max ) {
        return Math.floor( Math.random() * (parseInt( max ) - parseInt( min ) + 1) + parseInt( min ) )
    }

    function updateprogressGraphColor( color ) {
        $( '.activeprogressGraphElement' ).each( function () {
            newStyle = $( this ).attr( 'style' ).replace( /;--color:.*/, '' );
            $( this ).attr( 'style', newStyle + ';--color: ' + color );
        } );
    }

    // ******************************************
    // Toggle Fullscreen button
    $( '.toggleFullscreen' ).click( function ( event ) {
        toggleFullScreen( event );
    } );

    function toggleFullScreen( event ) {
        event.preventDefault();
        event.stopPropagation();
        clearSelection();
        if ( window.innerHeight != screen.height ) {
            enableFullscreen();
        } else {
            disableFullscreen();
        }
    }

    function enableFullscreen() {
        isFullScreen = true;
        if ( document.documentElement.webkitRequestFullscreen ) {
            document.documentElement.webkitRequestFullscreen();
        } else if ( document.documentElement.msRequestFullscreen ) {
            document.documentElement.msRequestFullscreen();
        } else if ( document.documentElement.msRequestFullscreen ) {
            document.documentElement.requestFullscreen();
        }
    }

    function disableFullscreen() {
        isFullScreen = false;
        if ( document.exitFullscreen ) {
            document.exitFullscreen();
        } else if ( document.webkitExitFullscreen ) {
            document.webkitExitFullscreen();
        } else if ( document.msExitFullscreen ) {
            document.msExitFullscreen();
        }
    }

    function clearSelection() {
        if ( document.selection && document.selection.empty ) {
            document.selection.empty();
        } else if ( window.getSelection ) {
            var sel = window.getSelection();
            sel.removeAllRanges();
        }
    }

    // ******************************************
    // Info Tag toggle setting
    $( '#toggleInfo' ).click( function () {
        $( '.videoInfo' ).toggle();
    } )

    // ******************************************
    // debugMode toggle setting
    if ( localStorage.getItem( 'debugModeSetting' ) == undefined || localStorage.getItem( 'debugModeSetting' ) == 'false' ) {
        localStorage.setItem( 'debugModeSetting', 'false' );
        $( '#debugModeSetting' ).html( '(off)' );
    } else {
        localStorage.setItem( 'debugModeSetting', 'true' );
        $( '#debugModeSetting' ).html( '(on)' );
    }
    $( '#debugMode' ).click( function ( event ) {
        if ( localStorage.getItem( 'debugModeSetting' ) == 'false' ) {
            localStorage.setItem( 'debugModeSetting', 'true' );
            $( '#debugModeSetting' ).html( '(on)' );
        } else {
            localStorage.setItem( 'debugModeSetting', 'false' );
            $( '#debugModeSetting' ).html( '(off)' );
        }
        location.reload();
    } )

    // ******************************************
    // Toggling fullscreen autoplay toggle setting
    if ( localStorage.getItem( 'fullscreenAutoplay' ) == undefined || localStorage.getItem( 'fullscreenAutoplay' ) == 'false' ) {
        localStorage.setItem( 'fullscreenAutoplay', 'false' );
        $( '#fullscreenAutoplaySetting' ).html( '(off)' );
    } else {
        localStorage.setItem( 'fullscreenAutoplay', 'true' );
        $( '#fullscreenAutoplaySetting' ).html( '(on)' );
    }
    $( '#fullscreenAutoplay' ).click( function ( event ) {
        if ( localStorage.getItem( 'fullscreenAutoplay' ) == 'false' ) {
            localStorage.setItem( 'fullscreenAutoplay', 'true' );
            $( '#fullscreenAutoplaySetting' ).html( '(on)' );
        } else {
            localStorage.setItem( 'fullscreenAutoplay', 'false' );
            $( '#fullscreenAutoplaySetting' ).html( '(off)' );
        }
    } )

    // ******************************************
    // activate all sections once on start on/off
    if ( localStorage.getItem( 'activateAllSectionsOnce' ) == undefined || localStorage.getItem( 'activateAllSectionsOnce' ) == 'false' ) {
        localStorage.setItem( 'activateAllSectionsOnce', 'false' );
        $( '#activateAllSectionsOnceSetting' ).html( '(off)' );
    } else {
        localStorage.setItem( 'activateAllSectionsOnce', 'true' );
        $( '#activateAllSectionsOnceSetting' ).html( '(on)' );
    }
    $( '#activateAllSectionsOnce' ).click( function ( event ) {
        if ( localStorage.getItem( 'activateAllSectionsOnce' ) == 'false' ) {
            localStorage.setItem( 'activateAllSectionsOnce', 'true' );
            $( '#activateAllSectionsOnceSetting' ).html( '(on)' );
        } else {
            localStorage.setItem( 'activateAllSectionsOnce', 'false' );
            $( '#activateAllSectionsOnceSetting' ).html( '(off)' );
        }
    } )

    function activateAllSectionsOnce() {
        mediaObjects = [];
        $( $( '.imageFilterBtn' ).get().reverse() ).each( function () {
            if ( !(/XXX/i.test( $( this ).attr( 'class' ) )) ) {
                mediaObjects.push( $( this ).attr( 'class' ) );
            }
        } );
        $( $( '.videoFilterBtn' ).get().reverse() ).each( function () {
            if ( !(/XXX/i.test( $( this ).attr( 'class' ) )) ) {
                mediaObjects.push( $( this ).attr( 'class' ) );
            }
        } );

        var delay = 0;
        $.each( mediaObjects, function ( x ) {
            setTimeout( function () {
                $( $( '.imageFilterBtn' ).get().reverse() ).each( function () {
                    if ( $( this ).attr( 'class' ) == mediaObjects[x] ) {
                        $( '#videos' ).hide();
                        $( '#images' ).show();
                        $( this ).trigger( 'click' );
                    }
                } );

                $( $( '.videoFilterBtn' ).get().reverse() ).each( function () {
                    if ( $( this ).attr( 'class' ) == mediaObjects[x] ) {
                        $( '#videos' ).show();
                        $( '#images' ).hide();
                        $( this ).trigger( 'click' );
                    }
                } );
            }, delay += 1000 );
        } );
    }

    // ***********************************
    // Video section
    var videoTagList = '';
    $( '.videoFilterBtn' ).click( function () {
        videoTagList = '';
        $( '.videoFilterBtn.videoFilterActive' ).each( function () {
            activeFilter = $( this ).attr( 'id' );
            $( this ).toggleClass( 'videoFilterActive' );
        } );

        $( 'html, body' ).animate( {scrollTop: 0}, 'fast' );
        $( '.videoContainer' ).each( function () {
            $( this ).hide();
        } );
        $( this ).toggleClass( 'videoFilterActive' );

        $( '.videoFilterBtn.videoFilterActive' ).each( function () {
            videoTagList += '.' + $( this ).text().trim();
        } );

        $( videoTagList ).each( function () {
            if ( $( this ).hasClass( 'videoContainer' ) ) {
                $( this ).show();
            }
        } );

        if ( videoTagList == '' ) {
            $( '.videoContainer' ).each( function () {
                $( this ).show();
            } );
        }
    } );

    // reload videos if double click on video tags
    $( '.videoFilterBtn' ).dblclick( function () {
        $( videoTagList ).each( function () {
            $( this ).find( '.videoFrame' ).attr( 'src', $( this ).find( '.videoFrame' ).attr( 'src' ) );
        } );
    } );

    // Youtube iFrame fullscreen button overlay
    $( '.videoMenuOverlayMinimized, .videoMenuOverlayMinimized2' ).hover( function ( event ) {
        $( event.target ).find( '.enableVideoFullscreenIcon' ).show();
    }, function () {
        $( '.enableVideoFullscreenIcon' ).hide();
    } );
    $( '.videoMenuOverlayFullscreen, .videoMenuOverlayFullscreen2' ).hover( function ( event ) {
        $( event.target ).find( '.disableVideoFullscreenIcon' ).show();
        $( '.videoMenuOverlay' ).show();
    }, function () {
        $( '.disableVideoFullscreenIcon' ).hide();
        $( '.videoMenuOverlay' ).hide();
    } );
    $( '.videoMenuOverlayMinimized, .videoMenuOverlayMinimized2' ).click( function ( event ) {
        const container = $( this ).closest( '.videoContainer' )[0];
        const fullscreenApi = container.requestFullscreen
                || container.webkitRequestFullScreen
                || container.mozRequestFullScreen
                || container.msRequestFullscreen;
        fullscreenApi.call( container );
        $( '.videoMenuOverlayMinimized, .videoMenuOverlayMinimized2' ).hide();
        $( '.videoMenuOverlayFullscreen, .videoMenuOverlayFullscreen2' ).show();

        if ( localStorage.getItem( 'fullscreenAutoplay' ) == 'true' ) {
            // autostart local video
            if ( $( this ).siblings( 'video' )[0] != undefined ) {
                $( this ).siblings( 'video' )[0].play();
            }
            // autostart youtube video
            if ( $( this ).siblings( 'iframe' )[0] != undefined ) {
                $( this ).siblings( 'iframe' )[0].src = $( this ).siblings( 'iframe' )[0].src.replace( /&autoplay=1/g, '' );
                $( this ).siblings( 'iframe' )[0].src += '&autoplay=1';
            }
        }
    } );
    $( '.videoMenuOverlayFullscreen, .videoMenuOverlayFullscreen2' ).click( function ( event ) {
        const container = $( this ).closest( '.videoContainer' )[0];
        const fullscreenApi = container.requestFullscreen
                || container.webkitRequestFullScreen
                || container.mozRequestFullScreen
                || container.msRequestFullscreen;
        fullscreenApi.call( container );
        document.exitFullscreen();

        $( '.videoMenuOverlayMinimized, .videoMenuOverlayMinimized2' ).show();
        $( '.videoMenuOverlayFullscreen, .videoMenuOverlayFullscreen2' ).hide();

        /*        if ( localStorage.getItem( 'fullscreenAutoplay' ) == 'true' ) {
                    // autostop local video
                    if ( $( this ).siblings( 'video' )[0] != undefined ) {
                        $( this ).siblings( 'video' )[0].pause();
                    }
                    // autostop youtube video
                    if ( $( this ).siblings( 'iframe' )[0] != undefined ) {
                        $( this ).siblings( 'iframe' )[0].src = $( this ).siblings( 'iframe' )[0].src.replace( /&autoplay=1/g, '' );
                    }
                }*/
    } );

    // Reset settings if user disengaged fullscreen via ESC or other means...
    var intervalId = window.setInterval( function () {
        if ( window.innerHeight != screen.height ) {
            $( '.videoMenuOverlayMinimized, .videoMenuOverlayMinimized2' ).show();
        } else {
        }
    }, 1000 );

    $( '.videoFrame' ).click( function ( event ) {
        this.paused ? this.play() : this.pause();
    } );

    // XXX section within video
    $( '.searchLink' ).click( function ( event ) {
        event.preventDefault();
        event.stopPropagation();
        var win = window.open( $( this ).attr( 'href' ) + $( '#searchInput' ).val(), '_blank' );
    } );
    $( '.searchLink' ).on( 'mousedown', document, function ( e ) {
        if ( $( e.target ).hasClass( 'searchLink' ) ) {
            e.preventDefault();
            e.stopPropagation();
            var win = window.open( $( e.target ).attr( 'href' ) + $( '#searchInput' ).val(), '_blank' );
        }
    } );

    // END Video section
    // ******************************************

    // ******************************************
    // Image section
    var numberOfImagesWithTag = {};
    $.each( config['images'], function ( index, val ) {
        if ( numberOfImagesWithTag[val['tags']] == undefined ) {
            numberOfImagesWithTag[val['tags']] = 1;
        } else {
            numberOfImagesWithTag[val['tags']]++;
        }
    } );

    var imageTagList = '';
    var lastActiveTag = '';
    $( '.imageFilterBtn' ).click( function () {
        imageTagList = '';
        $( '.imageFilterBtn.imageFilterActive' ).each( function () {
            $( this ).toggleClass( 'imageFilterActive' );
        } );

        $( 'html, body' ).animate( {scrollTop: 0}, 'fast' );
        $( '.fullscreenImage' ).each( function () {
            $( this ).hide();
        } );
        $( this ).toggleClass( 'imageFilterActive' );

        $( '.imageFilterBtn.imageFilterActive' ).each( function () {
            imageTagList += '.' + $( this ).text().trim();
            lastActiveTag = $( this ).text().trim();
        } );

        $( imageTagList ).each( function () {
            if ( $( this ).hasClass( 'fullscreenImage' ) ) {
                $( this ).show();
            }
        } );

        if ( imageTagList == '' ) {
            $( '.fullscreenImage' ).each( function () {
                $( this ).show();
            } );
        }
    } );
    Intense( document.querySelectorAll( '.fullscreenImage' ) );

    $( '.fullscreenImage' ).click( function ( event ) {
        var clickedImageSrc = $( this ).attr( 'src' );
        lastDisplayedImage = clickedImageSrc;
        if ( !isFullScreen ) {
            enableFullscreen();
        }
    } );

    // Show timer in image when moving mouse
    var moveTimer;
    $( document ).mousemove( function () {
        $( '.displayedFullscreenImage' ).on( 'mousemove', function () {
            if ( !slideshowJustStarted ) {
                clearTimeout( moveTimer );
                clearInterval( imageSlideshowInterval );
                moveTimer = setTimeout( function () {
                    $( '.videoMenuOverlay' ).hide();
                }, 1500 );
                $( '.videoMenuOverlay' ).show();
            }
        } );

        $( '.imageSlideshowControls' ).on( 'mousemove', function () {
            clearTimeout( moveTimer );
        } );
    } );

    // Image selection via mouse wheel
    $( window ).on( 'wheel', function ( event ) {
        if ( $( 'body figure' ).length == 1 ) {
            event.preventDefault();
            event.stopPropagation();
            clearInterval( imageSlideshowInterval );
            document.body.style.overflow = 'auto';

            for ( var i in config['images'] ) {
                nextImageIndex = 1;
                if ( config['images'][i]['image'] == lastDisplayedImage ) {
                    if ( event.originalEvent.deltaY > 0 ) { // going down
                        nextImageIndex = parseInt( i, 10 ) + 1;
                        if ( nextImageIndex > config['images'].length - 1 ) {
                            nextImageIndex = 0;
                        }
                        if ( imageTagList != '' ) {
                            while ( '.' + config['images'][nextImageIndex]['tags'] != imageTagList ) {
                                nextImageIndex += 1;
                                if ( nextImageIndex > config['images'].length - 1 ) {
                                    nextImageIndex = 0;
                                }
                            }
                        }
                    } else { // going up
                        nextImageIndex = parseInt( i, 10 ) - 1;
                        if ( nextImageIndex < 0 ) {
                            nextImageIndex = config['images'].length - 1;
                        }
                        if ( imageTagList != '' ) {
                            while ( '.' + config['images'][nextImageIndex]['tags'] != imageTagList ) {
                                nextImageIndex -= 1;
                                if ( nextImageIndex < 0 ) {
                                    nextImageIndex = config['images'].length - 1;
                                }
                            }
                        }
                    }
                    break;
                }
            }
            lastDisplayedImage = config['images'][nextImageIndex]['image'];
            $( 'img[src$=\'' + lastDisplayedImage + '\']' ).trigger( 'click' )
            $( 'body figure' ).remove();
        }
    } );

    // Start slideshow
    if ( localStorage.getItem( 'imageSlideshowIntervalLength' ) != undefined ) {
        $( '#slideshowInterval' ).val( localStorage.getItem( 'imageSlideshowIntervalLength' ) / 1000 );
    } else {
        localStorage.setItem( 'imageSlideshowIntervalLength', $( '#slideshowInterval' ).val() * 1000 );
    }

    var shownImages = [];
    $( '#startSlideshow' ).click( function ( event ) {
        slideshowJustStarted = true;
        setTimeout( function () {
            slideshowJustStarted = false;
        }, 2000 );

        $( '.videoMenuOverlay' ).hide();
        shownImages = [];
        imageSlideshowInterval = window.setInterval( function () {
            nextRandomImageInSlideshow()
        }, localStorage.getItem( 'imageSlideshowIntervalLength' ) );
    } );

    $( '#slideshowInterval' ).keypress( function ( event ) {
        event.preventDefault();
    } );
    $( '#slideshowInterval' ).change( function ( event ) {
        localStorage.setItem( 'imageSlideshowIntervalLength', $( '#slideshowInterval' ).val() * 1000 );
    } );

    function nextRandomImageInSlideshow() {
        currentImageIndex = 0;
        for ( var i in config['images'] ) {
            if ( config['images'][i]['image'] == lastDisplayedImage ) {
                currentImageIndex = i;
                break;
            }
        }

        if ( numberOfImagesWithTag[lastActiveTag] == shownImages.length ) {
            shownImages = [];
        }

        potentialNextImageIndex = Math.floor( (Math.random() * config['images'].length) );
        while ( potentialNextImageIndex == currentImageIndex
        || '.' + config['images'][potentialNextImageIndex]['tags'] != imageTagList
        || jQuery.inArray( potentialNextImageIndex, shownImages ) !== -1 ) {
            potentialNextImageIndex = Math.floor( (Math.random() * config['images'].length) );
        }

        shownImages.push( potentialNextImageIndex );
        lastDisplayedImage = config['images'][potentialNextImageIndex]['image'];
        $( 'img[src$=\'' + lastDisplayedImage + '\']' ).trigger( 'click' )
        $( 'body figure' ).remove();
    }

    $( '#MageAIExternalPage' ).mousemove( function ( event ) {
        $( '#mainMenu' ).attr( 'style', 'opacity:0' );
        $( '#imageTags' ).hide();
    } );

    $( '.MageAIFavorites' ).click( function () {
        $( '.MageAIfilter' ).trigger( 'click' );
        $( '.MageAIfilter' ).removeClass( 'imageFilterActive' );
        $( this ).addClass( 'imageFilterActive' );
        $( '#MageAIExternalPage' ).attr( 'src', config['mageAIFavoritesLink'] );
    } );

    $( '.MageAIfilter' ).click( function () {
        defaultTarget = 'https://www.mage.space/explore?q=psychedelic';
        /*        if ( xxxVisible ) {*/
        defaultTarget = defaultTarget + '&nsfw=t';
        /*        }*/
        $( '#MageAIExternalPage' ).attr( 'src', defaultTarget );
    } );

    // END Image section
    // ******************************************

    // ******************************************
    // Music section
    // if oAuth Spotify Info is not found in optional config, we hide all player functionality and show the simple embedded player instead
    // Work in progress - oAuth Spotify Player - Needs credentials
    // If you know how to get client id and secret and also how to setup a debug user -> go for it (https://developer.spotify.com/dashboard/).
    // oAuth Spotify Player
    if ( config['oAuthSpotify'] != undefined && config['oAuthSpotify'][0]['client_id'] != '' ) {
        $( '#iFrameSpotifyPlayerContainer' ).remove();

        redirect_uri = config['oAuthSpotify'][0]['redirect_uri'];
        client_id = config['oAuthSpotify'][0]['client_id'];
        client_secret = config['oAuthSpotify'][0]['client_secret'];
        spotifyInitOnPageLoad();

        $( '#stopMusic' ).click( function () {
            refreshAccessToken();
            pause();
            $( this ).attr( 'src', './assets/pause.png' );
        } );

        $( '#playlists' ).change( function () {
            refreshAccessToken();
            setDefaultOutputDevice();
            setTimeout( function () {
                shuffle();
            }, 20 );
            setTimeout( function () {
                play( $( '#playlists' ).find( ':selected' ).val() );
            }, 20 );
            setTimeout( function () {
                next();
            }, 20 );
        } );

        $( document ).on( 'mousedown', document, function ( e ) {
            // on middle mouse button play next track
            if (
                    e.which == 2 &&
                    !$( event.target ).hasClass( 'xxxLink' ) &&
                    !$( event.target ).hasClass( 'searchLink' ) &&
                    !$( event.target ).hasClass( 'externalVideoPreview' )
            ) {
                e.preventDefault();
                setDefaultOutputDevice();
                setTimeout( function () {
                    next();
                }, 20 );
            }
        } );
        $( '#next' ).click( function () {
            refreshAccessToken();
            setDefaultOutputDevice();
            setTimeout( function () {
                next();
            }, 20 );
        } );
        $( '#refresh' ).click( function () {
            refreshAccessToken();
            refreshDevices();
        } );
        $( '#menuClose' ).click( function () {
            refreshDevices();
        } );
        $( '#devices' ).change( function () {
            refreshAccessToken();
            transfer( $( '#devices' ).find( ':selected' ).val() );
            $( '#menuClose' ).trigger( 'click' );
            setTimeout( function () {
                next();
            }, 200 );
        } );

        function setDefaultOutputDevice() {
            if ( $( '#devices' ).find( ':selected' ).val() == 'undefined' ) {
                transfer( $( '#devices option:contains("DESKTOP")' ).val() );
            }
        }

    } else {
        // Stand alone iFrame Spotify Player
        $( '#oAuthPlayerControl' ).remove();
        $( '#devices' ).css( 'visibility', 'hidden' );
        $( '#refresh' ).css( 'visibility', 'hidden' );
        $( '#pizzaTimerContainer' ).remove();

        window.onSpotifyIframeApiReady = ( IFrameAPI ) => {
            let element = document.getElementById( 'iFrameSpotifyPlayer' );
            let options = {
                uri: 'spotify:playlist:4ILChY5F4Hn08ikt0rfHhW'
            };
            let callback = ( EmbedController ) => {
                document.querySelectorAll( '#playlists' ).forEach(
                        episode => {
                            episode.addEventListener( 'change', () => {
                                EmbedController.loadUri( episode.value )
                                EmbedController.play();
                            } );
                        } )
            };
            IFrameAPI.createController( element, options, callback );
        };
    }

    // END Music section
    // ******************************************

    // ******************************************
    // Disco section
    var showParticles = true;
    renderDiscoSection( showParticles );

    $( '#discoParticlesSwitch' ).click( function ( event ) {
        showParticles = !showParticles;
        renderDiscoSection( showParticles );
    } );

    $( '.discoSetBGColor' ).click( function ( event ) {
        $( '#particles-js' ).css( 'background-color', $( this ).css( 'backgroundColor' ) );
    } );
    document.getElementById( 'discoBGColorPicker' ).addEventListener( 'input', function () {
        $( '#particles-js' ).css( 'background-color', $( '#discoBGColorPicker' ).val() );
    } );

    var stroboBGWhite = true;
    document.getElementById( 'discoStroboSpeed' ).addEventListener( 'input', function () {
        if ( stroboBGWhite ) {
            $( '#particles-js' ).css( 'animation', 'strobo2 ' + $( '#discoStroboSpeed' ).val() + 'ms steps(1,end) infinite' );
        } else {
            $( '#particles-js' ).css( 'animation', 'strobo1 ' + $( '#discoStroboSpeed' ).val() + 'ms steps(1,end) infinite' );
        }
    } );

    $( '#discoToggleBWStrobo' ).click( function ( event ) {
        if ( stroboBGWhite ) {
            stroboBGWhite = false;
            $( '#particles-js' ).css( 'animation', 'strobo1 ' + $( '#discoStroboSpeed' ).val() + 'ms steps(1,end) infinite' );
        } else {
            stroboBGWhite = true;
            $( '#particles-js' ).css( 'animation', 'strobo2 ' + $( '#discoStroboSpeed' ).val() + 'ms steps(1,end) infinite' );
        }
    } );

    $( '#disco' ).mousemove( function ( event ) {
        if ( event.pageY < 20 ) {
            $( '#mainMenu' ).show();
        }
    } );
    $( '#discoSettingsContainer' ).hover(
            function () {
                $( '#mainMenu' ).show();
            }, function () {
                if ( $( '#disco' ).is( ':visible' ) ) {
                    $( '#mainMenu' ).hide();
                }
            }
    );
    $( '#mainMenu' ).hover(
            function () {
                $( '#mainMenu' ).show();
            }, function () {
                if ( $( '#disco' ).is( ':visible' ) ) {
                    $( '#mainMenu' ).hide();
                }
            }
    );

    function renderDiscoSection( showParticles ) {
        // reset strobo to default
        stroboBGWhite = true;
        $( '#particles-js' ).css( 'animation', 'strobo2 0ms steps(1,end) infinite' );
        $( '#discoStroboSpeed' ).val( 0 );
        $( '.particles-js-canvas-el' ).remove();
        particlesInit( showParticles );
    }

    // END Disco section
    // ******************************************

    // ******************************************
    // Game section
    $( '#gamesFrame' ).mousemove( function ( event ) {
        $( '#mainMenu' ).attr( 'style', 'opacity:0' );
        $( '#gamesLinks' ).hide();
    } );

    $( '.gameLink' ).click( function ( event ) {
        if ( $( this ).hasClass( 'VRGamesBtn' ) ) {
            $( '.VRGames' ).show();
            $( '#gamesFrame' ).hide();
            refreshGradientBackground();
        } else {
            $( '.VRGames' ).hide();
            $( '#gamesFrame' ).show();
        }

        enableFullscreen();
        $( '#gamesFrame' ).attr( 'src', $( this ).attr( 'data' ) );

        $( '.gameLink.gameLinkActive' ).each( function () {
            $( this ).toggleClass( 'gameLinkActive' );
        } );

        $( this ).addClass( 'gameLinkActive' );
    } );

    $( '.VRGameLink' ).click( function ( event ) {
        disableFullscreen();
    } );


    // END Disco section
    // ******************************************

    // ******************************************
    // init initial view
    $( '#videos' ).show();
    $( '#images' ).hide();
    $( '#disco' ).hide();
    $( '#games' ).hide();
} );