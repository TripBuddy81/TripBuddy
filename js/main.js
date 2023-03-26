$( document ).ready( function () {
    // ***********************************
    // Globals
    var isFullScreen = false;
    var lastDisplayedImage = config['images'][0]['image'];

    var minutesTillNextThought = 0;
    var minutesCountAtLastDisplayedThought = 0;
    var allGuidedThoughts = [];
    var guidedThoughtsNext = 0;

    var keyCache = {};

    var timer = '';
    var start = '';
    var currentState = 'ignition';
    var lastState = '';
    var recommendationsShown = false;

    Object.assign( config, optionalConfig );

    // If debug mode is active, remove all but one video from youtube videos (speeds up load time)
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
        }
    };

    // Firefox does not want to play along
    userAgentString = navigator.userAgent;
    if ( userAgentString.indexOf( 'Firefox' ) > -1 ) {
        $( '#launchText' ).html( 'Start!' );
    }


    // ***********************************
    // Main Menu
    $( '#showVideoSection' ).click( function () {
        $( '#videos' ).show();
        $( '#images' ).hide();
        $( '#disco' ).hide();
        $( '#misc' ).hide();


        mainMenuToStatic( false );
        enableFullscreen();
    } );
    $( '#showImageSection' ).click( function () {
        $( '#videos' ).hide();
        $( '#images' ).show();
        $( '#disco' ).hide();
        $( '#misc' ).hide();


        mainMenuToStatic( false );
        enableFullscreen();
    } );
    $( '#showDiscoSection' ).click( function () {
        $( '#videos' ).hide();
        $( '#images' ).hide();
        $( '#disco' ).show();
        $( '#misc' ).hide();

        renderDiscoSection( showParticles );
        mainMenuToStatic( false );
        enableFullscreen();
    } );
    $( '#showMiscSection' ).click( function () {
        $( '#videos' ).hide();
        $( '#images' ).hide();
        $( '#disco' ).hide();
        $( '#misc' ).show();

        mainMenuToStatic( false );
        enableFullscreen();
    } );

    function mainMenuToStatic( setStatic ) {
        if ( setStatic ) {
            $( '#mainMenu' ).addClass( 'sticky' );
        } else {
            $( '#mainMenu' ).removeClass( 'sticky' );
        }
    }

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
        }
    } );
    $( document ).keyup( function ( e ) {
        delete keyCache[e.which];
    } );

    // ******************************************
    // Start button & preFlightChecklist & Reminders
    $( '#launchText' ).click( function ( e ) {
        localStorage.setItem( 'topupReminderInMinutes', '' );
        enableFullscreen();
    } );
    $( '#liftOff' ).click( function ( e ) {
        timer = setInterval( upTimer, 1000 );
        start = new Date();

        minutesTillNextThought = randomIntFromInterval( localStorage.getItem( 'guidedThoughtMinMinutes' ), localStorage.getItem( 'guidedThoughtMaxMinutes' ) );

        $( '#preFlightChecklist' ).modal( 'hide' );
        $( '#launchText' ).hide();
        $( '#timerMinutes' ).show();
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
        if ( allGuidedThoughts.length > 0 ) {
            $( '.deactivateGuidedThoughts' ).show();
        }

    } );
    // Top up Reminder
    $( '#topupCheckbox' ).change( function () {
        if ( $( '#topupCheckbox' ).is( ':checked' ) ) {
            localStorage.setItem( 'topupReminderInMinutes', $( '#topupReminderInMinutes' ).val() );
        } else {
            localStorage.setItem( 'topupReminderInMinutes', '' );
        }
    } );
    $( '#topupReminderInMinutes' ).change( function () {
        if ( $( '#topupCheckbox' ).is( ':checked' ) ) {
            localStorage.setItem( 'topupReminderInMinutes', $( '#topupReminderInMinutes' ).val() );
        }
    } );
    // Guided Thoughts Display
    localStorage.setItem( 'guidedThought1', '' );
    localStorage.setItem( 'guidedThought2', '' );
    localStorage.setItem( 'guidedThought3', '' );
    localStorage.setItem( 'guidedThoughtMinMinutes', $( '#guidedThoughtMinMinutes' ).val() );
    localStorage.setItem( 'guidedThoughtMaxMinutes', $( '#guidedThoughtMaxMinutes' ).val() );
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
    // Timer && Graph && Time dependent actions
    function upTimer() {
        var now = new Date();
        var diffMs = (now - start);
        var diffHrs = displayHour = Math.floor( diffMs / 3600000 );
        var diffMins = displayMinute = Math.floor( diffMs / 60000 ) % 60;
        var totalMins = Math.floor( diffMs / 60000 );

        if ( diffMins <= 9 ) {
            displayMinute = '0' + diffMins;
        }
        if ( diffHrs <= 9 ) {
            displayHour = '0' + diffHrs;
        }
        document.getElementById( 'timerMinutes' ).innerHTML = displayHour + ':' + displayMinute;

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
            $( '#timerMinutes' ).css( 'color', color );
        } else if ( currentState == 'onset' ) {
            color = '#ffd97d';
            updateprogressGraphColor( color );
            $( '#timerMinutes' ).css( 'color', color );
        } else if ( currentState == 'peak' ) {
            color = '#ee6055';
            updateprogressGraphColor( color );
            $( '#timerMinutes' ).css( 'color', color );
        } else {
            color = '#aaf683';
            updateprogressGraphColor( color );
            $( '#timerMinutes' ).css( 'color', color );
        }

        // Reminder Display (Top up)
        if ( localStorage.getItem( 'topupReminderInMinutes' ) > 0 && totalMins >= localStorage.getItem( 'topupReminderInMinutes' ) && recommendationsShown == false ) {
            recommendationsShown = true;

            if ( document.elementFromPoint( 40, 40 ).classList.contains( 'videoFrame' ) ) {
                disableFullscreen();
                $( '.videoMenuOverlayMinimized, .videoMenuOverlayMinimized2' ).show();
                $( '.videoMenuOverlayFullscreen, .videoMenuOverlayFullscreen2' ).hide();
            }

            if ( document.elementFromPoint( 0, 0 ).nodeName == 'IMG' ) {
                document.elementFromPoint( 0, 0 ).click();
            }

            $( '#timedRecommendation' ).modal( 'show' );
            $( '#topupRecommendation' ).show();
        }
        $( '#timedRecommendation' ).click( function ( event ) {
            $( '#timedRecommendation' ).modal( 'hide' );
        } );

        // Guided Thoughts
        if ( allGuidedThoughts[guidedThoughtsNext] != undefined && totalMins == minutesTillNextThought + minutesCountAtLastDisplayedThought ) {
            minutesCountAtLastDisplayedThought = totalMins;
            minutesTillNextThought = randomIntFromInterval( localStorage.getItem( 'guidedThoughtMinMinutes' ), localStorage.getItem( 'guidedThoughtMaxMinutes' ) );
            $( '.guidedThoughtsText' ).html( allGuidedThoughts[guidedThoughtsNext] );
            $( '.guidedThoughtsContainer' ).show();
            $( '.guidedThoughtsContainer' ).delay( 20000 ).fadeOut( 'slow' );
            guidedThoughtsNext += 1;
            guidedThoughtsNext = guidedThoughtsNext % allGuidedThoughts.length;
        }
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
    // Fullscreen
    $( '.toggleFullscreen' ).click( function ( event ) {
        toggleFullScreen( event );
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
        if ( document.documentElement.requestFullscreen ) {
            document.documentElement.requestFullscreen();
        } else if ( document.documentElement.webkitRequestFullscreen ) { /* Safari */
            document.documentElement.webkitRequestFullscreen();
        } else if ( document.documentElement.msRequestFullscreen ) { /* IE11 */
            document.documentElement.msRequestFullscreen();
        }
    }

    function disableFullscreen() {
        isFullScreen = false;
        if ( document.exitFullscreen ) {
            document.exitFullscreen();
        } else if ( document.webkitExitFullscreen ) { /* Safari */
            document.webkitExitFullscreen();
        } else if ( document.msExitFullscreen ) { /* IE11 */
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
    // Info Tag toggle
    $( '#toggleInfo' ).click( function ( event ) {
        $( '.videoInfo' ).toggle();
    } )

    // ******************************************
    // debugMode toggle
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
    } )

    // ******************************************
    // Toggling fullscreen autoplay toggle
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
    var videoTagList = '';
    $( '.videoFilterBtn' ).click( function () {
        videoTagList = '';
        // Remove this block to reenable multi tag select!
        $( '.videoFilterBtn.filterActive' ).each( function () {
            $( this ).toggleClass( 'filterActive' );
        } );

        $( 'html, body' ).animate( {scrollTop: 0}, 'fast' );
        $( '.videoContainer' ).each( function () {
            $( this ).hide();
        } );
        $( this ).toggleClass( 'filterActive' );


        $( '.videoFilterBtn.filterActive' ).each( function () {
            videoTagList += '.' + $( this ).text().trim();
        } );

        $( videoTagList ).each( function () {
            $( this ).show();
        } );

        if ( videoTagList == '' ) {
            $( '.videoContainer' ).each( function () {
                $( this ).show();
            } );
        }
    } );

    // Youtube iFrame fullscreen button overlay
    $( '.videoMenuOverlayMinimized, .videoMenuOverlayMinimized2' ).hover( function ( event ) {
        $( event.target ).find( '.enableVideoFullscreenIcon' ).show();
    }, function () {
        $( '.enableVideoFullscreenIcon' ).hide();
    } );
    $( '.videoMenuOverlayFullscreen, .videoMenuOverlayFullscreen2' ).hover( function ( event ) {
        $( event.target ).find( '.disableVideoFullscreenIcon' ).show();
    }, function () {
        $( '.disableVideoFullscreenIcon' ).hide();
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

        if ( localStorage.getItem( 'fullscreenAutoplay' ) == 'true' ) {
            // autostop local video
            if ( $( this ).siblings( 'video' )[0] != undefined ) {
                $( this ).siblings( 'video' )[0].pause();
            }
            // autostop youtube video
            if ( $( this ).siblings( 'iframe' )[0] != undefined ) {
                $( this ).siblings( 'iframe' )[0].src = $( this ).siblings( 'iframe' )[0].src.replace( /&autoplay=1/g, '' );
            }
        }
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


    // ******************************************
    // Image section
    var imageTagList = '';
    $( '.imageFilterBtn' ).click( function () {
        imageTagList = '';
        // Remove this block to reenable multi tag select!
        $( '.imageFilterBtn.filterActive' ).each( function () {
            $( this ).toggleClass( 'filterActive' );
        } );

        $( 'html, body' ).animate( {scrollTop: 0}, 'fast' );
        $( '.fullscreenImage' ).each( function () {
            $( this ).hide();
        } );
        $( this ).toggleClass( 'filterActive' );

        $( '.imageFilterBtn.filterActive' ).each( function () {
            imageTagList += '.' + $( this ).text().trim();
        } );

        $( imageTagList ).each( function () {
            $( this ).show();
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

    // Image selection via mouse wheel
    if ( $( '#images' ).is( ':visible' ) ) {
        $( window ).on( 'wheel', function ( event ) {
            if ( $( 'body figure' ).length == 1 ) {
                event.preventDefault();
                event.stopPropagation();

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
    }

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

        var currentlyPlaying = false;
        $( '#startStop' ).click( function () {
            if ( currentlyPlaying ) {
                pause();
                currentlyPlaying = false;
                $( this ).attr( 'src', './assets/play.png' );
            } else {
                next();
                currentlyPlaying = true;
                $( this ).attr( 'src', './assets/pause.png' );
            }
        } );

        $( '#playlists' ).change( function () {
            shuffle();
            play( $( '#playlists' ).find( ':selected' ).val() );
            currentlyPlaying = true;
            $( '#startStop' ).attr( 'src', './assets/pause.png' );
        } );

        $( '#next' ).click( function () {
            next();
            currentlyPlaying = true;
            $( '#startStop' ).attr( 'src', './assets/pause.png' );
        } );
        $( '#refresh' ).click( function () {
            refreshDevices();
        } );
        $( '#devices' ).change( function () {
            transfer( $( '#devices' ).find( ':selected' ).val() );
            $( '#menuClose' ).trigger( 'click' );
        } );

    } else {
        // Stand alone iFrame Spotify Player
        $( '#oAuthPlayerControl' ).remove();
        $( '#devices' ).css( 'visibility', 'hidden' );
        $( '#refresh' ).css( 'visibility', 'hidden' );

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

    function renderDiscoSection( showParticles ) {
        // reset strobo to default
        stroboBGWhite = true;
        $( '#particles-js' ).css( 'animation', 'strobo2 0ms steps(1,end) infinite' );
        $( '#discoStroboSpeed' ).val( 0 );
        $( '.particles-js-canvas-el' ).remove();
        particlesInit( showParticles );
    }

    $( '#disco' ).mousemove( function ( event ) {
        if ( event.pageY < 20 ) {
            $( '#mainMenu' ).show();
        }
    } );

    // ******************************************
    // init initial view
    $( '#videos' ).show();
    $( '#images' ).hide();
    $( '#disco' ).hide();
    $( '#misc' ).hide();


} )
;

