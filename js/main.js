$( document ).ready( function () {
    // ***********************************
    // Globals
    var pizzaTimerMinutesTillReady = 18;
    var minutesCountAtLastDisplayedThought = 0;
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
    var textShrinkFrameSeed = 1;
    var spotifyOpened = false;
    var lastDisplayedAbsoluteTruthIndex = 0;
    var stroboBGWhite = false;
    var absoluteTruthsTimer = undefined;
    var absoluteTruthsTimerDuration = 14000;
    var videoTagList = '';
    var maxYoutubeSearchResults = 50;
    var youtubeApiKeyInUse = 1;
    var youtubeCurrentQueue = [];
    var youtubePlayerState = 'undefined';
    var youtubeIntitalSearchTerm = 'Psybass';

    Object.assign( config, optionalConfig );

    // Disable right click context menu
    $( document ).bind( 'contextmenu', function ( e ) {
        if ( $( e.target ).attr( 'type' ) != 'text' ) {
            return false;
        }
    } );

    // Handlebar renderer - takes config within config/config.js
    $( 'body' ).html(
            Handlebars.compile( $( '#mainTemplate' ).html() )( config )
    );

    // provide credentials for prod enviroment -  yes... hacky... I know... needs some love in the future
    if ( window.location.origin == 'https://psychictripbuddy.netlify.app' ) {
        config['oAuthSpotify'][0]['redirect_uri'] = 'https://psychictripbuddy.netlify.app/';
        config['oAuthSpotify'][0]['client_id'] = '0b24d45f4c4e42b3832bbe69f9ab70f4';
        config['oAuthSpotify'][0]['client_secret'] = 'f8264dee44854a8db43f297156d33668';
    }

    // Init fastmode to true if not specifid otherwise
    if ( localStorage.getItem( 'fastModeSetting' ) == undefined ) {
        localStorage.setItem( 'fastModeSetting', 'true' );
    }

    // If fast mode is inactive, enable all vidoes
    if ( localStorage.getItem( 'fastModeSetting' ) != 'true' ) {
        $( '.videoSource' ).each( function () {
            if ( typeof $( this ).attr( 'src' ) != 'undefined' ) {
                $( this ).attr( 'src', $( this ).attr( 'src' ).replace( /NOLOAD/, '' ) );
            }
        } );
        $( '.localVideo' ).each( function () {
            this.load();
        } );
    }

    // Check if loading is complete
    document.onreadystatechange = function () {
        if ( document.readyState !== 'complete' ) {
        } else {
            $( '#launchText' ).html( 'Start!' );
        }
    };

    // Firefox does not want to play along
    userAgentString = navigator.userAgent;
    if ( userAgentString.indexOf( 'Firefox' ) > -1 ) {
        $( '#launchText' ).html( 'Start!' );
    }

    // Show VRGames Tag if configured
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
        $( '#shrine' ).hide();
        $( '#games' ).hide();
        $( '#search' ).hide();

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
        $( '#shrine' ).hide();
        $( '#games' ).hide();
        $( '#search' ).hide();

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
    $( '#showShrineSection' ).click( function () {
        $( '#videos' ).hide();
        $( '#images' ).hide();
        $( '#shrine' ).show();
        $( '#games' ).hide();
        $( '#search' ).hide();

        $( '.mainSectionActive' ).each( function () {
            $( this ).toggleClass( 'mainSectionActive' );
        } );
        $( this ).toggleClass( 'mainSectionActive' );

        renderShrineSection( showParticles );
        enableFullscreen();
        refreshGradientBackground();

        if ( typeof absoluteTruthsTimer !== 'undefined' ) {
            clearInterval( absoluteTruthsTimer );
        }
        absoluteTruthsTimer = setInterval( absoluteTruthsUpdate, absoluteTruthsTimerDuration );

        absoluteTruthsUpdate( true );
    } );
    $( '#showGamesSection' ).click( function () {
        $( '#videos' ).hide();
        $( '#images' ).hide();
        $( '#shrine' ).hide();
        $( '#games' ).show();
        $( '#search' ).hide();

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
    $( '#searchSymbol' ).click( function () {
        $( '#videos' ).hide();
        $( '#images' ).hide();
        $( '#shrine' ).hide();
        $( '#games' ).hide();
        $( '#search' ).show();

        $( '.mainSectionActive' ).each( function () {
            $( this ).toggleClass( 'mainSectionActive' );
        } );

        $( '#mainSearchInput' ).focus().val( '' );

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
            toggleXXXVisible();
        }
    } );
    $( document ).keyup( function ( e ) {
        delete keyCache[e.which];
    } );

    var rightMouseClicked = false;
    $( '#activateHiddenMenue' ).mousedown( function ( event ) {
        switch ( event.which ) {
            case 1:
                if ( rightMouseClicked ) {
                    toggleXXXVisible();
                }
                break;
            case 3:
                rightMouseClicked = true;
                break;
        }
    } );

    $( '#activateHiddenMenue' ).mouseout( function ( event ) {
        rightMouseClicked = false;
    } );

    function toggleXXXVisible() {
        xxxVisible = !xxxVisible;
        $( '.XXX' ).toggle();

        if ( videoTagList == '' ) {
            $( '.videoContainer' ).each( function () {
                $( this ).hide();
            } );
        } else if ( videoTagList != '.XXX' ) {
            $( '.videoFilterBtn.videoFilterActive' ).each( function () {
                $( this ).trigger( 'click' );
            } );
        }

        if ( xxxVisible ) {
            $( '#spotifyIcon' ).attr( 'src', './assets/spotifyDevil.png' );
        } else {
            $( '#spotifyIcon' ).attr( 'src', './assets/spotify.png' );
        }
    }

    // ******************************************
    // Start button & preFlightChecklist & Reminders
    $( '#launchText' ).click( function ( e ) {
        localStorage.setItem( 'topupReminderInMinutes1', '' );
        localStorage.setItem( 'topupReminderInMinutes2', '' );
        localStorage.setItem( 'orderPizzaReminderInMinutes', '' );
        enableFullscreen();

        loadAllVideos();
    } );

    // Lift off - initialize a lot of stuff
    $( '#liftOff' ).click( function ( e ) {
        timer = setInterval( tripTimer, 1000 );
        start = new Date();
        setTimeout( function () {
            $( '#timerMinutes' ).show();
            $( '#notesSymbol' ).show();
            $( '#launchText' ).hide();
            $( '#progressGraphContainer' ).show();
        }, 1000 );

        localStorage.setItem( 'pizzaTimerStartMinutes', '' );

        minutesTillNextThought = randomIntFromInterval( localStorage.getItem( 'guidedThoughtMinMinutes' ), localStorage.getItem( 'guidedThoughtMaxMinutes' ) );

        $( '#preFlightChecklist' ).modal( 'hide' );

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

        if ( allGuidedThoughts.length == 0 && localStorage.getItem( 'topupReminderInMinutes1' ) == '' && localStorage.getItem( 'topupReminderInMinutes2' ) == '' && localStorage.getItem( 'orderPizzaReminderInMinutes' ) == '' ) {
            $( '#disableAllReminders' ).hide();
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
    $( '.guidedThoughtsContainer' ).click( function () {
        $( '.guidedThoughtsContainer' ).hide();
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
        $( '#timerMinutes' ).hide();
        $( '#pizzaTimerContainer' ).show();
    } );
    $( '#pizzaTimerContainer' ).click( function ( e ) {
        $( '#pizzaTimerContainer' ).hide();
        $( '#timerMinutes' ).show();
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
    // Disable all future reminders and guided thoughts
    $( '#disableAllReminders' ).click( function ( e ) {
        $( '#disableAllReminders' ).hide();
        $( '.guidedThoughtsContainer' ).hide();

        localStorage.setItem( 'topupReminderInMinutes1', '' );
        localStorage.setItem( 'topupReminderInMinutes2', '' );
        localStorage.setItem( 'orderPizzaReminderInMinutes', '' );

        while ( allGuidedThoughts.length ) {
            allGuidedThoughts.pop();
        }
    } );

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
    // Show notes overlay
    $( '#notesSymbol' ).click( function () {
        enableFullscreen();
        $( '#notesOverlay' ).modal( 'show' );

        setTimeout( function () {
            $( '#notesTextarea' ).focus().val( '' ).val( localStorage.getItem( 'notes' ) );
        }, 500 );

        var textarea = document.getElementById( 'notesTextarea' );
        setTimeout( function () {
            textarea.scrollTop = textarea.scrollHeight;
        }, 500 );
    } );

    $( '#notesTextarea' ).on( 'blur', function () {
        localStorage.setItem( 'notes', $( '#notesTextarea' ).val() );
    } );

    // ******************************************
    // Info Tag toggle setting
    $( '#toggleInfo' ).click( function () {
        $( '.videoInfo' ).toggle();
    } )

    // ******************************************
    // fastMode toggle setting
    if ( localStorage.getItem( 'fastModeSetting' ) == undefined || localStorage.getItem( 'fastModeSetting' ) == 'false' ) {
        localStorage.setItem( 'fastModeSetting', 'false' );
        $( '#fastModeSetting' ).html( '(off)' );
    } else {
        localStorage.setItem( 'fastModeSetting', 'true' );
        $( '#fastModeSetting' ).html( '(on)' );
    }
    $( '#fastMode' ).click( function ( event ) {
        if ( localStorage.getItem( 'fastModeSetting' ) == 'false' ) {
            localStorage.setItem( 'fastModeSetting', 'true' );
            $( '#fastModeSetting' ).html( '(on)' );
        } else {
            localStorage.setItem( 'fastModeSetting', 'false' );
            $( '#fastModeSetting' ).html( '(off)' );
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

    // ***********************************
    // Video section
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

        var refreshLocalVideos = false;
        $( videoTagList ).each( function () {
            if ( typeof $( this ).find( '.videoSource' ).attr( 'src' ) != 'undefined' && $( this ).find( '.videoSource' ).attr( 'src' ).includes( 'NOLOAD' ) ) {
                $( this ).find( '.videoSource' ).attr( 'src', $( this ).find( '.videoSource' ).attr( 'src' ).replace( /NOLOAD/, '' ) );
                refreshLocalVideos = true;
            }
        } );
        if ( refreshLocalVideos ) {
            $( '.localVideo' ).each( function () {
                this.load();
            } );
        }
    } );

    // Double clicking videos main button loads all videos if in fast mode
    $( '#showVideoSection' ).dblclick( function () {
        loadAllVideos();
    } );

    function loadAllVideos() {
        if ( localStorage.getItem( 'fastModeSetting' ) == 'true' ) {
            $( '#showVideoSection' ).trigger( 'click' );

            $( '.videoFilterBtn.videoFilterActive' ).each( function () {
                $( this ).toggleClass( 'videoFilterActive' );
            } );

            $( '.videoContainer' ).each( function () {
                $( this ).show();
            } );
            if ( !xxxVisible ) {
                $( '.XXX' ).hide();
            }

            $( '.videoSource' ).each( function () {
                if ( typeof $( this ).attr( 'src' ) != 'undefined' ) {
                    $( this ).attr( 'src', $( this ).attr( 'src' ).replace( /NOLOAD/, '' ) );
                }
            } );
            $( '.localVideo' ).each( function () {
                this.load();
            } );
        }
    }

    // reload videos of given tag if double clicking on video tag
    $( '.videoFilterBtn' ).dblclick( function () {
        $( videoTagList ).each( function () {
            if ( typeof $( this ).find( '.videoSource' ).attr( 'src' ) != 'undefined' ) {
                $( this ).find( '.videoSource' ).attr( 'src', $( this ).find( '.videoSource' ).attr( 'src' ).replace( /NOLOAD/, '' ) );
            }
        } );
        $( '.localVideo' ).each( function () {
            this.load();
        } );
    } );

    // Youtube iFrame fullscreen button overlay
    $( '.videoMenuOverlayMinimized, .videoMenuOverlayMinimized2' ).hover( function ( event ) {
        $( event.target ).closest( '.iFrameContainer' ).find( '.enableVideoFullscreenIcon' ).show();
        $( event.target ).closest( '.iFrameContainer' ).find( '.enableVideoFullscreenIcon2' ).show();
    }, function () {
        $( '.enableVideoFullscreenIcon' ).hide();
        $( '.enableVideoFullscreenIcon2' ).hide();
    } );
    $( '.videoMenuOverlayFullscreen, .videoMenuOverlayFullscreen2' ).hover( function ( event ) {
        $( event.target ).closest( '.iFrameContainer' ).find( '.disableVideoFullscreenIcon' ).show();
        $( event.target ).closest( '.iFrameContainer' ).find( '.disableVideoFullscreenIcon2' ).show();
        $( '.videoMenuOverlay' ).show();
    }, function () {
        $( '.disableVideoFullscreenIcon' ).hide();
        $( '.disableVideoFullscreenIcon2' ).hide();
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

        // Code disabled - allows for automatically stopping videos if leaving fullscreen of video
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
            $( '.videoMenuOverlayFullscreen, .videoMenuOverlayFullscreen2' ).hide();
            isFullScreen = false;
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
        window.open( $( this ).attr( 'href' ) + $( '#searchInput' ).val(), '_blank' );
    } );
    $( '.searchLink' ).on( 'mousedown', document, function ( e ) {
        if ( $( e.target ).hasClass( 'searchLink' ) ) {
            e.preventDefault();
            e.stopPropagation();
            window.open( $( e.target ).attr( 'href' ) + $( '#searchInput' ).val(), '_blank' );
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
        defaultTarget = defaultTarget + '&nsfw=t';
        $( '#MageAIExternalPage' ).attr( 'src', defaultTarget );
    } );

    // END Image section
    // ******************************************

    // ******************************************
    // Shrine section
    var showParticles = true;
    renderShrineSection( showParticles );
    absoluteTruthsTimer = setInterval( absoluteTruthsUpdate, absoluteTruthsTimerDuration );

    $( '#shrineParticlesSwitch' ).click( function ( event ) {
        showParticles = !showParticles;
        $( '.particles-js-canvas-el' ).remove();
        particlesInit( showParticles );
    } );

    $( '.shrineSetBGColor' ).click( function ( event ) {
        $( '#shrine' ).css( 'background-color', $( this ).css( 'backgroundColor' ) );
        $( '#shrine' ).removeClass( 'shrineColorfulBackground' );
    } );
    document.getElementById( 'shrineBGColorPicker' ).addEventListener( 'input', function () {
        $( '#shrine' ).css( 'background-color', $( '#shrineBGColorPicker' ).val() );
        $( '#shrine' ).removeClass( 'shrineColorfulBackground' );
    } );
    $( '.shrineSetBGColorful' ).click( function ( event ) {
        $( '#shrine' ).addClass( 'shrineColorfulBackground' );
    } );

    document.getElementById( 'shrineStroboSpeed' ).addEventListener( 'input', function () {
        if ( stroboBGWhite ) {
            $( '#particles-js' ).css( 'animation', 'strobo2 ' + $( '#shrineStroboSpeed' ).val() + 'ms steps(1,end) infinite' );
        } else {
            $( '#particles-js' ).css( 'animation', 'strobo1 ' + $( '#shrineStroboSpeed' ).val() + 'ms steps(1,end) infinite' );
        }
        if ( $( '#shrineStroboSpeed' ).val() > 0 ) {
            $( '#ensoImageShrine' ).css( 'animation', 'stroboEnso 20ms steps(1,end) infinite' );
            $( '#absoluteTruthsOverlayText' ).css( 'animation', 'stroboEnso 55ms steps(1,end) infinite' );
        } else {
            $( '#ensoImageShrine' ).css( 'animation', 'stroboEnso 0ms steps(1,end) infinite' );
            $( '#absoluteTruthsOverlayText' ).css( 'animation', 'stroboEnso 0ms steps(1,end) infinite' );
        }
    } );

    $( '#shrineToggleBWStrobo' ).click( function ( event ) {
        if ( stroboBGWhite ) {
            stroboBGWhite = false;
            $( '#particles-js' ).css( 'animation', 'strobo1 ' + $( '#shrineStroboSpeed' ).val() + 'ms steps(1,end) infinite' );
        } else {
            stroboBGWhite = true;
            $( '#particles-js' ).css( 'animation', 'strobo2 ' + $( '#shrineStroboSpeed' ).val() + 'ms steps(1,end) infinite' );
        }
    } );

    $( '#shrine' ).mousemove( function ( event ) {
        if ( event.pageY < 20 ) {
            $( '#mainMenu' ).show();
        }
    } );
    $( '#shrineSettingsContainer' ).hover(
            function () {
                $( '#mainMenu' ).show();
            }, function () {
                if ( $( '#shrine' ).is( ':visible' ) ) {
                    $( '#mainMenu' ).hide();
                }
            }
    );
    $( '#mainMenu' ).hover(
            function () {
                $( '#mainMenu' ).show();
            }, function () {
                if ( $( '#shrine' ).is( ':visible' ) ) {
                    $( '#mainMenu' ).hide();
                }
            }
    );
    $( '#particles-js' ).click( function ( e ) {
        if ( isFullScreen ) {
            $( '#absoluteTruthsOverlay' ).toggle();
        }
        enableFullscreen();
    } );

    function renderShrineSection( showParticles ) {
        // reset strobo to default
        stroboBGWhite = false;
        $( '#particles-js' ).css( 'animation', 'strobo2 0ms steps(1,end) infinite' );
        $( '#ensoImageShrine' ).css( 'animation', 'stroboEnso 0ms steps(1,end) infinite' );
        $( '#absoluteTruthsOverlayText' ).css( 'animation', 'stroboEnso 0ms steps(1,end) infinite' );
        $( '#shrineStroboSpeed' ).val( 0 );
        $( '.particles-js-canvas-el' ).remove();
        particlesInit( showParticles );
    }

    function absoluteTruthsUpdate( quickSwap = false ) {
        fadeoutDuration = 1500;
        if ( quickSwap ) {
            $( '#absoluteTruthsOverlayText' ).html( '' );
        }

        random = Math.floor( Math.random() * config['absoluteTruths'].length );

        if ( config['absoluteTruths'][random]['text'] == config['absoluteTruths'][lastDisplayedAbsoluteTruthIndex]['text'] ) {
            absoluteTruthsUpdate( quickSwap );
        } else if ( config['absoluteTruths'][random]['tag'] == 'XXX' && !xxxVisible ) {
            absoluteTruthsUpdate( quickSwap );
        } else {
            lastDisplayedAbsoluteTruthIndex = random;

            $( '#absoluteTruthsOverlayText' ).fadeOut( fadeoutDuration, function () {
                $( '#absoluteTruthsOverlayText' ).html( config['absoluteTruths'][random]['text'] );

                length = config['absoluteTruths'][random]['text'].length;
                if ( length < 100 ) {
                    document.getElementById( 'absoluteTruthsOverlayText' ).style.fontSize = '110px';
                } else if ( length < 150 ) {
                    document.getElementById( 'absoluteTruthsOverlayText' ).style.fontSize = '100px';
                } else if ( length < 200 ) {
                    document.getElementById( 'absoluteTruthsOverlayText' ).style.fontSize = '90px';
                } else {
                    document.getElementById( 'absoluteTruthsOverlayText' ).style.fontSize = '50px';
                }

                $( '#absoluteTruthsOverlayText' ).fadeIn( 1500 );
                $( '#absoluteTruthsOverlayContainer' ).css( 'animation', 'textShrink' + textShrinkFrameSeed + ' ' + absoluteTruthsTimerDuration + 'ms linear infinite' );
                textShrinkFrameSeed = (textShrinkFrameSeed + 1) % 2;
            } );
        }
    }

    // END Shrine section
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

    // END Game section
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
        /*spotifyInitOnPageLoad();*/
        shuffle();
        repeat();
        refreshAccessToken();
        setInterval( refreshAccessToken, 60000 );
        currentlyPlaying();
        setInterval( currentlyPlaying, 3000 );
        refreshDevices();
        setInterval( refreshDevices, 3000 );

        $( '#stopMusic' ).click( function () {
            spotifyPause();
            youtubePlayer.stopVideo();
        } );

        $( '#playlists' ).change( function () {
            lastSelectedPlaylist = $( '#playlists' ).find( ':selected' ).val();
            $( '#playlists > option:first-child' ).text( '...' );
            $( '#playlists' ).prop( 'selectedIndex', 0 );
            openDesktopApp();
            shuffle();
            repeat();
            spotifyPlay( lastSelectedPlaylist );
            youtubePlayer.stopVideo();
        } );

        $( document ).on( 'mousedown', document, function ( e ) {
            // on middle mouse button play next track
            if (
                    e.which == 2 &&
                    !$( event.target ).hasClass( 'menuItem' ) &&
                    !$( event.target ).hasClass( 'xxxLink' ) &&
                    !$( event.target ).hasClass( 'searchLink' ) &&
                    !$( event.target ).hasClass( 'externalVideoPreview' )
            ) {
                e.preventDefault();
                openDesktopApp();
                shuffle();
                repeat();
                playNextYoutubeVideoOrSpotifyTrack();
            }
        } );
        $( '#next' ).click( function () {
            spotifyInitOnPageLoad();
            openDesktopApp();
            shuffle();
            repeat();
            playNextYoutubeVideoOrSpotifyTrack();
        } );
        $( '#switchDesktopPhone' ).click( function () {
            if ( $( '#devices' ).find( ':selected' ).text().toLowerCase().includes( 'desktop' ) && typeof $( '#devices option:contains("' + config['spotifyPhoneName'] + '")' ).val() != 'undefined' ) {
                transfer( $( '#devices option:contains("' + config['spotifyPhoneName'] + '")' ).val() );
            } else if ( !$( '#devices' ).find( ':selected' ).text().toLowerCase().includes( 'desktop' ) ) {
                openDesktopApp();
                transfer( $( '#devices option:contains("DESKTOP")' ).val() );
            }
        } );
        $( '#menuClose' ).click( function () {
            refreshAccessToken();
            refreshDevices();
        } );
        $( '#devices' ).change( function () {
            transfer( $( '#devices' ).find( ':selected' ).val() );
            $( '#menuClose' ).trigger( 'click' );
        } );

        $( '#spotifyIcon' ).click( function ( e ) {
            window.open( lastSelectedPlaylist, '_blank' );
        } );

        function openDesktopApp() {
            if ( typeof $( '#devices option:contains("DESKTOP")' ).val() == 'undefined' && spotifyOpened == false ) {
                window.open( lastSelectedPlaylist, '_blank' );
                spotifyOpened = true;
            }
        }

    } else {
        // Stand alone iFrame Spotify Player
        $( '#oAuthPlayerControl' ).remove();
        $( '#devices' ).css( 'visibility', 'hidden' );
        $( '#refresh' ).css( 'visibility', 'hidden' );

        $.getScript( 'https://open.spotify.com/embed-podcast/iframe-api/v1', function ( data, textStatus, jqxhr ) {
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
        } );
    }

    // END Music section
    // ******************************************

    // ******************************************
    // Search section
    displayYoutubeQueue();
    searchYoutube( youtubeIntitalSearchTerm );

    // Youtube Player API init
    var tag = document.createElement( 'script' );
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName( 'script' )[0];
    firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );
    var youtubePlayer;
    window.onYouTubePlayerAPIReady = function () {
        youtubePlayer = new YT.Player( 'mainSearchResultYoutubeIframe', {
            videoId   : 'TdU2Ab7y91w',
            playerVars: {
                rel           : 0,
                autoplay      : 0,
                controls      : 1,
                showinfo      : 0,
                modestbranding: 1,
                iv_load_policy: 3
            },
            events    : {
                'onStateChange': onPlayerStateChange
            }
        } );
    }

    function onPlayerStateChange( event ) {
        switch ( event.data ) {
            case YT.PlayerState.UNSTARTED:
                youtubePlayerState = 'unstarted';
                break;
            case YT.PlayerState.ENDED:
                youtubePlayerState = 'ended';
                playNextYoutubeVideoOrSpotifyTrack();
                break;
            case YT.PlayerState.PLAYING:
                youtubePlayerState = 'playing';
                spotifyPause();
                break;
            case YT.PlayerState.PAUSED:
                youtubePlayerState = 'paused';
                setTimeout( function () {
                    if ( youtubePlayerState == 'paused' ) {
                        if ( playingTrack ) {
                            spotifyNext();
                        } else {
                            spotifyPlay();
                        }
                    }
                }, 1000 );
                break;
            case YT.PlayerState.BUFFERING:
                youtubePlayerState = 'buffering';
                break;
            case YT.PlayerState.CUED:
                youtubePlayerState = 'video cued';
                break;
            default:
                youtubePlayerState = 'unknown (' + event.data + ')';
        }
    }

    $( '#mainSearchInput' ).click( function ( event ) {
        enableFullscreen();
    } );

    $( '#mainSearchInput' ).keyup( function ( event ) {
        if ( event.keyCode === 13 ) {
            searchYoutube( $( this ).val() );
        }
        enableFullscreen();
    } );

    $( '#clearMainSearchInput' ).click( function ( event ) {
        $( '#mainSearchInput' ).val( '' );
        $( '#mainSearchInput' ).focus();
    } );

    $( document ).on( 'click', '.youtubeQueueItemDeleteSymbol', function ( e ) {
        removeIdFromYoutubeQueue( $( this ).closest( '.youtubeQueueItem' ).find( '.youtubeQueueItemImage' ).attr( 'id' ) );
        displayYoutubeQueue();
    } );

    $( document ).on( 'click', '.youtubeQueueItemImage,.youtubeQueueItemDescription', function () {
        playSpecificYoutubeVideo( $( this ).closest( '.youtubeQueueItem' ).find( '.youtubeQueueItemImage' ).attr( 'id' ) );
        enableFullscreen();
    } );

    $( document ).on( 'click', '.youtubeResultItemImage,.youtubeResultItemDescription', function () {
        videoToQueue = {
            'id'         : $( this ).closest( '.youtubeResult' ).attr( 'id' ),
            'img'        : $( this ).closest( '.youtubeResult' ).find( '.youtubeResultItemImage' ).attr( 'src' ),
            'description': $( this ).closest( '.youtubeResult' ).find( '.youtubeResultItemDescription' ).text(),
            'duration'   : $( this ).closest( '.youtubeResult' ).find( '.youtubeItemDuration' ).text()
        };
        youtubeCurrentQueue.push( videoToQueue );
        if ( youtubePlayerState == 'video cued' || youtubePlayerState == 'undefined' ) {
            playNextYoutubeVideoOrSpotifyTrack();
        }
        displayYoutubeQueue();
        enableFullscreen();
    } );

    function searchYoutube( searchTerm, increaseApiKey = false ) {
        if ( increaseApiKey ) {
            youtubeApiKeyInUse += 1;
            if ( youtubeApiKeyInUse > 10 ) {
                return false;
            }
        }

        $.ajax( {
            type   : 'GET',
            url    : 'https://www.googleapis.com/youtube/v3/search',
            data   : {
                key            : config['youtubeApiKey' + youtubeApiKeyInUse],
                q              : searchTerm,
                part           : 'snippet',
                maxResults     : maxYoutubeSearchResults,
                type           : 'video',
                videoEmbeddable: true
            },
            success: function ( searchYoutubeResult ) {
                getVideoDurationsFromYoutube( searchYoutubeResult );
            },
            error  : function ( response ) {
                if ( response.responseJSON.error.errors[0].reason == 'quotaExceeded' ) {
                    searchYoutube( searchTerm, true );
                }
            }
        } );
    }

    function getVideoDurationsFromYoutube( searchYoutubeResult ) {
        listOfVideoIds = [];
        searchYoutubeResult.items.forEach( function ( item ) {
            listOfVideoIds.push( item.id.videoId );
        } );
        listOfVideoIds = listOfVideoIds.join( ',' );

        $.ajax( {
            type   : 'GET',
            url    : 'https://www.googleapis.com/youtube/v3/videos',
            data   : {
                key : config['youtubeApiKey' + youtubeApiKeyInUse],
                part: 'contentDetails',
                id  : listOfVideoIds
            },
            success: function ( getVideoDurationsFromYoutubeResult ) {
                displayYoutubeSearchResults( searchYoutubeResult, getVideoDurationsFromYoutubeResult );
            },
            error  : function ( response ) {
                displayYoutubeSearchResults( searchYoutubeResult );
            }
        } );
    }

    function displayYoutubeQueue() {
        $( '#currentYoutubeQueue' ).empty();

        if ( youtubeCurrentQueue.length == 0 ) {
            let youtubeQueueItem = document.createElement( 'div' );
            youtubeQueueItem.classList.add( 'youtubeQueueEmpty' );
            youtubeQueueItem.innerHTML = '';
            document.getElementById( 'currentYoutubeQueue' ).appendChild( youtubeQueueItem );
        } else {
            youtubeCurrentQueue.forEach( function ( item ) {
                let youtubeQueueItemContainer = document.createElement( 'span' );
                youtubeQueueItemContainer.classList.add( 'youtubeQueueItem' );
                document.getElementById( 'currentYoutubeQueue' ).appendChild( youtubeQueueItemContainer );

                let youtubeQueueItem = document.createElement( 'img' );
                youtubeQueueItem.id = item.id;
                youtubeQueueItem.src = item.img;
                youtubeQueueItem.classList.add( 'youtubeQueueItemImage' );
                youtubeQueueItemContainer.appendChild( youtubeQueueItem );

                let youtubeQueueItemDeleteSymbol = document.createElement( 'span' );
                youtubeQueueItemDeleteSymbol.classList.add( 'youtubeQueueItemDeleteSymbol' );
                youtubeQueueItemContainer.appendChild( youtubeQueueItemDeleteSymbol );

                let youtubeQueueItemDescription = document.createElement( 'span' );
                youtubeQueueItemDescription.innerHTML = item.description;
                youtubeQueueItemDescription.classList.add( 'youtubeQueueItemDescription' );
                youtubeQueueItemContainer.appendChild( youtubeQueueItemDescription );

                let youtubeVideoDuration = document.createElement( 'span' );
                youtubeVideoDuration.innerHTML = item.duration;
                youtubeVideoDuration.classList.add( 'youtubeItemDuration' );
                youtubeQueueItemContainer.appendChild( youtubeVideoDuration );
            } );
        }
    }

    function displayYoutubeSearchResults( searchYoutubeResult, getVideoDurationsFromYoutubeResult = '' ) {
        $( '#youtubeResults' ).empty();

        searchYoutubeResult.items.forEach( function ( item ) {
            let youtubeResult = document.createElement( 'span' );
            youtubeResult.id = item.id.videoId;
            youtubeResult.classList.add( 'youtubeResult' );
            document.getElementById( 'youtubeResults' ).appendChild( youtubeResult );

            let youtubeResultItemImage = document.createElement( 'img' );
            youtubeResultItemImage.src = item.snippet.thumbnails.high.url;
            youtubeResultItemImage.classList.add( 'youtubeResultItemImage' );
            youtubeResult.appendChild( youtubeResultItemImage );

            let youtubeResultDescription = document.createElement( 'span' );
            youtubeResultDescription.innerHTML = item.snippet.title;
            youtubeResultDescription.classList.add( 'youtubeResultItemDescription' );
            youtubeResult.appendChild( youtubeResultDescription );
        } );

        if ( getVideoDurationsFromYoutubeResult != '' ) {
            getVideoDurationsFromYoutubeResult.items.forEach( function ( item ) {
                duration = convertYoutubeTime( item.contentDetails.duration );
                let videoDuration = document.createElement( 'span' );
                videoDuration.innerHTML = duration;
                videoDuration.classList.add( 'youtubeItemDuration' );
                document.getElementById( item.id ).appendChild( videoDuration );
            } );
        }
    }

    function playNextYoutubeVideoOrSpotifyTrack() {
        if ( youtubeCurrentQueue.length == 0 ) {
            try {
                youtubePlayer.stopVideo();
            } catch ( e ) {
            }

            if ( playingTrack ) {
                spotifyNext();
            } else {
                spotifyPlay();
            }
        } else {
            spotifyPause();
            youtubePlayer.loadVideoById( youtubeCurrentQueue.shift().id );
            displayYoutubeQueue();
        }
    }

    function playSpecificYoutubeVideo( videoId ) {
        spotifyPause();
        youtubePlayer.loadVideoById( videoId );
        removeIdFromYoutubeQueue( videoId );
        displayYoutubeQueue();
    }

    function removeIdFromYoutubeQueue( videoId ) {
        tempYoutubeCurrentQueue = [];
        $.each( youtubeCurrentQueue, function ( key, value ) {
            if ( value.id != videoId ) {
                tempYoutubeCurrentQueue.push( {
                    'id'         : value.id,
                    'img'        : value.img,
                    'description': value.description,
                    'duration'   : value.duration
                } );
            }
        } );
        youtubeCurrentQueue = tempYoutubeCurrentQueue;
    }

    function convertYoutubeTime( duration ) {
        var a = duration.match( /\d+/g );
        if ( duration.indexOf( 'M' ) >= 0 && duration.indexOf( 'H' ) == -1 && duration.indexOf( 'S' ) == -1 ) {
            a = [0, a[0], 0];
        }
        if ( duration.indexOf( 'H' ) >= 0 && duration.indexOf( 'M' ) == -1 ) {
            a = [a[0], 0, a[1]];
        }
        if ( duration.indexOf( 'H' ) >= 0 && duration.indexOf( 'M' ) == -1 && duration.indexOf( 'S' ) == -1 ) {
            a = [a[0], 0, 0];
        }

        duration = 0;
        if ( a.length == 3 ) {
            duration = duration + parseInt( a[0] ) * 3600;
            duration = duration + parseInt( a[1] ) * 60;
            duration = duration + parseInt( a[2] );
        }
        if ( a.length == 2 ) {
            duration = duration + parseInt( a[0] ) * 60;
            duration = duration + parseInt( a[1] );
        }
        if ( a.length == 1 ) {
            duration = duration + parseInt( a[0] );
        }
        var h = Math.floor( duration / 3600 );
        var m = Math.floor( duration % 3600 / 60 );
        var s = Math.floor( duration % 3600 % 60 );

        duration = ((h > 0 ? h + ':' + (m < 10 ? '0' : '') : '') + m + ':' + (s < 10 ? '0' : '') + s);
        if ( duration == '0:00' ) {
            duration = 'stream';
        }
        return duration;
    }

    // END Search section
    // ******************************************

    // ******************************************
    // init initial view
    /*  if ( localStorage.getItem( 'fastModeSetting' ) != 'true' ) {
          $( '#videos' ).show();
          $( '#images' ).hide();
          $( '#shrine' ).hide();
          $( '#games' ).hide();
          $( '#search' ).hide();
          isFullScreen = false;
      } else { // FAST MODE - loads videos later on demand
          $( '#videos' ).hide();
          $( '#images' ).hide();
          $( '#shrine' ).show();
          $( '#games' ).hide();
          $( '#search' ).hide();
          $( '#showShrineSection' ).trigger( 'click' );
          $( '.videoContainer' ).each( function () {
              $( this ).hide();
          } );
          $( '#mainMenu' ).hide();
          isFullScreen = false;
      }*/

    $( '#videos' ).hide();
    $( '#images' ).hide();
    $( '#shrine' ).hide();
    $( '#games' ).hide();
    $( '#search' ).show();
    $( '#mainMenu' ).show();

} );