$( document ).ready( function () {
    // ***********************************
    // Globals
    var isFullScreen = false;
    var lastDisplayedImage = config['images'][0]['image'];

    Object.assign( config, optionalConfig );

    // If debug mode is active, remove all but one video from youtube videos (speeds up load time)
    if ( localStorage.getItem( 'debugModeSetting' ) == 'true' ) {
        $.each( config['videosYoutube'], function ( key, value ) {
            if ( key >= 10 ) {
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
    var keyCache = {};
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
        localStorage.setItem( 'doseUpReminderInMinutes', '' );
        enableFullscreen();
    } );
    $( '#liftOff' ).click( function ( e ) {
        timer = setInterval( upTimer, 1000 );
        start = new Date();
        $( '#preFlightChecklist' ).modal( 'hide' );
        $( '#launchText' ).hide();
        $( '#timerMinutes' ).show();
        $( '#progressGraphContainer' ).show();
    } );
    $( '#doseUpCheckbox' ).change( function () {
        if ( $( '#doseUpCheckbox' ).is( ':checked' ) ) {
            localStorage.setItem( 'doseUpReminderInMinutes', $( '#doseUpReminderInMinutes' ).val() );
        } else {
            localStorage.setItem( 'doseUpReminderInMinutes', '' );
        }
    } );
    $( '#doseUpReminderInMinutes' ).change( function () {
        if ( $( '#doseUpCheckbox' ).is( ':checked' ) ) {
            localStorage.setItem( 'doseUpReminderInMinutes', $( '#doseUpReminderInMinutes' ).val() );
        }
    } );

    // ******************************************
    // enable/disable screen
    $( '#turnScreenBlack' ).click( function ( e ) {
        enableFullscreen();
        e.stopPropagation();
        $( 'body' ).hide();
        $( 'html' ).attr( 'style', 'background-color:black;cursor:none;' );
    } );
    $( 'html' ).click( function () {
        $( 'body' ).show();
        $( 'html' ).attr( 'style', 'cursor:auto;' );
    } );

    // ******************************************
    // Timer && Graph
    var timer = '';
    var start = '';
    var currentState = 'ignition';
    var lastState = '';
    var recommendationsShown = false;

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

        // Timed Recommendations
        if ( localStorage.getItem( 'doseUpReminderInMinutes' ) > 0 && totalMins >= localStorage.getItem( 'doseUpReminderInMinutes' ) && recommendationsShown == false ) {
            recommendationsShown = true;

            if ( document.elementFromPoint( 40, 40 ).classList.contains( 'videoFrame' ) ) {
                disableFullscreen();
                $( '.enableVideoInFullScreen' ).show();
                $( '.disableVideoInFullScreen' ).hide();
            }

            if ( document.elementFromPoint( 0, 0 ).nodeName == 'IMG' ) {
                document.elementFromPoint( 0, 0 ).click();
            }

            $( '#timedRecommendation' ).modal( 'show' );
            $( '#doseUpRecommendation' ).show();

            console.info( 'Reminder shown' );
        }
        $( '#timedRecommendation' ).click( function ( event ) {
            $( '#timedRecommendation' ).modal( 'hide' );
        } );
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
        $( '#enableFullscreen' ).hide();
        $( '#disableFullscreen' ).show();
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
        $( '#enableFullscreen' ).show();
        $( '#disableFullscreen' ).hide();
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


    // ***********************************
    // Video section
    $( '.videoFilterBtn' ).click( function () {
        // Remove this block to reenable multi tag select!
        $( '.videoFilterBtn.filterActive' ).each( function () {
            $( this ).toggleClass( 'filterActive' );
        } );

        $( 'html, body' ).animate( {scrollTop: 0}, 'fast' );
        $( '.videoContainer' ).each( function () {
            $( this ).hide();
        } );
        $( this ).toggleClass( 'filterActive' );

        var tagList = '';
        var totalCount = 0;
        $( '.videoFilterBtn.filterActive' ).each( function () {
            totalCount++;
            tagList += '.' + $( this ).text().trim();

            $( '.videoLabel' ).show();
        } );

        $( tagList ).each( function () {
            $( this ).show();
        } );

        if ( totalCount == 0 ) {
            $( '.videoContainer' ).each( function () {
                $( this ).show();
            } );
        }
    } );

    // Make Playlist labels clickable to actually point to the whole playlits itself
    $( '.videoLabelLink' ).each( function () {
        var newLink = $( this ).attr( 'href' ).replace( 'embed/videoseries', 'playlist' );
        $( this ).attr( 'href', newLink )
    } );


    // Youtube iFrame fullscreen button overlay
    $('.videoMenuOverlayMinimized').hover(function(event) {
        $( event.target ).find( '.enableVideoFullscreenIcon' ).show();
    }, function(){
        $( '.enableVideoFullscreenIcon' ).hide();
    });
    $('.videoMenuOverlayFullscreen').hover(function(event) {
        $( event.target ).find( '.disableVideoFullscreenIcon' ).show();
    }, function(){
        $( '.disableVideoFullscreenIcon' ).hide();
    });
    $( '.videoMenuOverlayMinimized' ).click( function ( event ) {
        const container = $(this).closest(".videoContainer")[ 0 ];
        const fullscreenApi = container.requestFullscreen
                || container.webkitRequestFullScreen
                || container.mozRequestFullScreen
                || container.msRequestFullscreen;
        fullscreenApi.call( container );
        $( '.videoMenuOverlayMinimized' ).hide();
        $( '.videoMenuOverlayFullscreen' ).show();
    } );
    $( '.videoMenuOverlayFullscreen' ).click( function ( event ) {
        const container = $(this).closest(".videoContainer")[ 0 ];
        const fullscreenApi = container.requestFullscreen
                || container.webkitRequestFullScreen
                || container.mozRequestFullScreen
                || container.msRequestFullscreen;
        fullscreenApi.call( container );
        document.exitFullscreen();

        $( '.videoMenuOverlayMinimized' ).show();
        $( '.videoMenuOverlayFullscreen' ).hide();
    } );

    // Reset settings if user disengaged fullscreen via ESC or other means...
    var intervalId = window.setInterval(function(){
        if ( window.innerHeight != screen.height ) {
            $( '.videoMenuOverlayMinimized' ).show();
        } else {
        }
    }, 1000);




    // ******************************************
    // Image section
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
                        } else { // going up
                            nextImageIndex = parseInt( i, 10 ) - 1;
                            if ( nextImageIndex < 0 ) {
                                nextImageIndex = config['images'].length - 1;
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
        $( '#devices' ).remove();
        $( '#refresh' ).remove();

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

