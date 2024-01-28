$( document ).ready( function () {
            // ***********************************
            // Globals
            window.spotifyHasBeenPlayingBeforePause = false;
            window.spotifySongRadioQueue = '';
            window.stopAfterTrack = false;
            window.nextPlaylistToPlay = '';
            window.spotifyPreviousProgressMs
            window.mainSearchResultYoutubePlayer;
            window.mainSearchResultYoutubePlayerState = 'undefined';
            window.directYoutubePlayer;
            window.directYoutubePlayerState = 'undefined';
            window.playingSpotifyTrack = false;
            window.populateTrackSelectionInterval = '';
            window.videodromePlayInterval = '';
            window.populateTrackSelectionData = {};
            window.blockScreenSaver = false;
            var externalSoundTabOpened = false;
            var pizzaTimerStart = '';
            var isFullScreen = false;
            var lastDisplayedImage = config['images'][0]['image'];
            var minutesTillNextThought = 0;
            var showParticles = true;
            var allGuidedThoughts = [];
            var guidedThoughtsNext = 0;
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
            var privateVisible = false;
            var slideshowJustStarted = false;
            var lastActiveBackgroundGradientKeyFrame = 1;
            var textShrinkFrameSeed = 1;
            var spotifyOpened = false;
            var displayedAbsoluteTruthIndex = [];
            var stroboBGWhite = false;
            var stroboSpeed = 0;
            var preFlightCheckListAnimationTimer = undefined;
            var absoluteTruthsTimer = undefined;
            var absoluteTruthsTimerDuration = 20000;
            var videoTagList = '';
            var maxYoutubeSearchResults = 50;
            var youtubeApiKeyInUse = 1;
            var youtubeCurrentQueue = [];
            var youtubeIntitalSearchTerm = 'goa festival';
            var directYoutubePlayerLoaded = false;
            var lastPlayedDirectYoutubePlayerId = '';
            var lastPlayedDirectYoutubePlayerVideoIsWisdom = false;
            var lastSelectedAutocompleteItem = 0;
            var currentAutocompleteItem = 0;
            var allVideosLoaded = false;
            var mainYoutubePlayerIsActiveSoundSource = false;
            var screensaverSecondsIdle = 0;
            var screensaverStartAfterSeconds = 15;
            var screensaverActive = false;
            var documentReady = false;
            var searchEditClicked = false;
            var numberOfSelectableVideosVideodrome = 0;
            var alreadySelectedVideosVideodrome = [];
            var alreadySelectedColorsDisco = [];
            var shrineColorChangeTimer = '';
            var shrineStroboChangeTimer = '';
            var shrineDiscoActive = false;

            const urlParams = new URLSearchParams( window.location.search );

            Object.assign( config, optionalConfig );
            if ( optionalConfig['imagesXXX'] != undefined ) {
                config['images'] = config['images'].concat( optionalConfig['imagesXXX'] );
            }
            if ( optionalConfig['absoluteTruthsXXX'] != undefined ) {
                config['absoluteTruths'] = config['absoluteTruths'].concat( optionalConfig['absoluteTruthsXXX'] );
            }

            $( document ).bind( 'contextmenu', function ( e ) {
                // Disable right click context menu and show playlist selection instead
                if ( $( e.target ).attr( 'id' ) != 'activateHiddenMenue' && $( e.target ).attr( 'type' ) != 'text' ) {
                    if ( $( '#menuClose' ).prop( 'checked' ) || $( '#quickTrackSelectionMenu' ).hasClass( 'menuTransition' ) ||
                            $( '#videodrome' ).is( ':visible' ) ||
                            $( '#notesOverlay' ).is( ':visible' ) ||
                            $( '.videoMenuOverlayFullscreen' ).is( ':visible' ) ||
                            $( '#preFlightChecklist' ).is( ':visible' ) ||
                            $( '.displayedFullscreenImage' ).is( ':visible' ) ||
                            $( '.keyboard-cancel-button' ).is( ':visible' )
                    ) {
                        disableAllOverlaysAndFullscreenVideos();
                    } else {
                        $( '#spotifyPlaylistsMenu' ).toggleClass( 'menuTransition' );
                        $( '#spotifyPlaylistsMenu' ).animate( {scrollTop: 0}, 'fast' );
                        disableAllOverlaysAndFullscreenVideos( false );
                    }
                    $( '#mainMenu' ).show();
                    return false;
                } else if ( $( e.target ).attr( 'type' ) == 'text' ) { // paste text into text filed
                    navigator.clipboard.readText()
                    .then( text => {
                        $( e.target ).val( text );
                    } );
                    return false;
                } else { // block right click
                    return false;
                }
            } );

            // Handlebar renderer and helper functions - takes config within config/config.js
            Handlebars.registerHelper( 'if', function ( v1, v2, options ) {
                if ( v1 === v2 ) {
                    return options.fn( this );
                }
                return options.inverse( this );
            } );

            $( 'body' ).html(
                    Handlebars.compile( $( '#mainTemplate' ).html() )( config )
            );

            // Check if loading is complete
            document.onreadystatechange = function () {
                if ( document.readyState !== 'complete' ) {
                } else {
                    documentReady = true;
                    $( '#launchSymbol' ).fadeOut( 800, function () {
                        $( '#launchSymbol' ).attr( 'src', './assets/ufo.png' );
                        $( '#launchSymbol' ).delay( 200 ).fadeIn();
                    } );
                    $( '.iFrameContainer ' ).delay( 200 ).fadeIn();
                    hideScreensaverEnso();
                    if ( !allVideosLoaded ) {
                        loadAllVideos();
                    }
                }
            };

            // Show app after some time even if loading is not complete
            setTimeout( function () {
                if ( !documentReady ) {
                    $( '.iFrameContainer ' ).delay( 200 ).fadeIn();
                    hideScreensaverEnso();
                }
            }, 5000 );

            // Init screensaver
            setInterval( startScreensaver, 1000 );
            $( document ).on( 'click mousemove wheel', function ( e ) {
                stopScreensaver();
            } );

            // Firefox does not want to play along
            if ( navigator.userAgent.indexOf( 'Firefox' ) > -1 ) {
                documentReady = true;
                $( '#launchSymbol' ).attr( 'src', './assets/ufo.png' );
                $( '.iFrameContainer ' ).show();
                hideScreensaverEnso();
            }

            // Check if some settings are ovewritten in local config
            try {
                showParticles = config['localSettingsOverwrite']['showParticles'];
                if ( !config['localSettingsOverwrite']['showAbsoluteTruth'] ) {
                    $( '#absoluteTruthsOverlay' ).hide()
                }
            } catch ( e ) {
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
                if ( !searchEditClicked ) {
                    $( this ).parent().find( '.searchInput' ).val( '' );
                }
                searchEditClicked = false;
            } );

            $( '.searchEdit' ).click( function () {
                searchEditClicked = true;
                $( this ).parent().find( '.searchInput' ).trigger( 'click' );
            } );

            // Init number spinner ('.input-group') - https://www.jqueryscript.net/form/Input-Spinner-Plugin-Bootstrap-4.html
            $( '#pizzaTimerMinutes' ).inputSpinner();

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

            // Init global alarm sounds
            var alarmSound = document.getElementById( 'alarmSound' );

            // Init track progress bar
            $( '.trackProgress' ).hide();

            // ***********************************
            // Main Menu
            $( '.XXX' ).hide();
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
            } );
            $( '#showImageSection' ).click( function () {
                $( '#videos' ).hide();
                $( '#images' ).show();
                $( '#shrine' ).hide();
                $( '#games' ).hide();
                $( '#search' ).hide();

                if ( !imageSectionShown ) {
                    $( '.imageFilterBtn' ).each( function () {
                        $( this ).trigger( 'click' );
                        return false;
                    } );
                    imageSectionShown = true;
                }
            } );
            $( '#showShrineSection' ).click( function () {
                $( '#videos' ).hide();
                $( '#images' ).hide();
                $( '#shrine' ).show();
                $( '#games' ).hide();
                $( '#search' ).hide();

                $( '#shrineSettingsContainer' ).addClass( 'visible' );

                renderShrineSection( showParticles );

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

                if ( !gameSectionShown ) {
                    $( '.gameLink' ).each( function () {
                        if ( $( this ).is( ':visible' ) ) {
                            $( this ).trigger( 'click' );
                            return false;
                        }
                    } );
                    gameSectionShown = true;
                }
            } );
            $( '#showSearchSection' ).click( function () {
                $( '#videos' ).hide();
                $( '#images' ).hide();
                $( '#shrine' ).hide();
                $( '#games' ).hide();
                $( '#search' ).show();

                setTimeout( function () {
                    $( '#mainSearchInput' ).focus();
                }, 500 );
            } );

            $( '.mainSectionBtn' ).click( function () {
                $( '.mainSectionActive' ).each( function () {
                    $( this ).toggleClass( 'mainSectionActive' );
                } );
                $( this ).toggleClass( 'mainSectionActive' );

                disableAllOverlaysAndFullscreenVideos();
                checkPrivateVisible();
                enableFullscreen();
                hideScreensaverEnso();
                refreshGradientBackground();
            } );

            $( '.menuItem' ).click( function () {
                closeRightMenu();
            } );

            function closeRightMenu() {
                $( '#menuClose' ).prop( 'checked', false );
            }

            $( '#menuClose' ).click( function () {
                enableFullscreen();
                $( '#spotifyPlaylistsMenu' ).removeClass( 'menuTransition' );
                $( '#quickTrackSelectionMenu' ).removeClass( 'menuTransition' );
                hideScreensaverEnso();
            } );

            // Global key captures
            var rightMouseClicked = false;
            $( '#activateHiddenMenue' ).mousedown( function ( event ) {
                switch ( event.which ) {
                    case 1:
                        enableFullscreen();
                        if ( rightMouseClicked ) {
                            toggleXXXVisible();
                            if ( !allVideosLoaded ) {
                                loadAllVideos();
                            }
                        }
                        break;
                    case 3:
                        rightMouseClicked = true;
                        break;
                }
            } );

            $( '#displayedVideos, #displayedImages' ).click( function ( e ) {
                if ( !isFullScreen && !e.target.classList.contains( 'externalVideoPreview' ) ) {
                    enableFullscreen();
                }
            } );

            $( '#activateHiddenMenue' ).mouseout( function ( event ) {
                rightMouseClicked = false;
            } );

            function toggleXXXVisible() {
                enableFullscreen();
                xxxVisible = !xxxVisible;

                if ( xxxVisible ) {
                    $( '.XXX' ).show();
                    $( '#spotifyIcon' ).attr( 'src', './assets/spotifyDevil.png' );
                } else {
                    $( '.XXX' ).hide();
                    $( '#spotifyIcon' ).attr( 'src', './assets/spotify.png' );
                    privateVisible = false;
                }

                if ( videoTagList == '' ) {
                    $( '.videoContainer' ).each( function () {
                        $( this ).hide();
                    } );
                } else if ( videoTagList != '.XXX' ) {
                    $( '.videoFilterBtn.videoFilterActive' ).each( function () {
                        $( this ).trigger( 'click' );
                    } );
                }

                $( '.imageFilterBtn.imageFilterActive' ).each( function () {
                    $( this ).trigger( 'click' );
                } );

                displayedAbsoluteTruthIndex = [];
                absoluteTruthsUpdate( true );
                checkPrivateVisible();
            }

            function checkPrivateVisible() {
                if ( !xxxVisible || !privateVisible ) {
                    $( '.private' ).hide();
                    $( '.privatefilter' ).hide();
                }
                if ( !xxxVisible ) {
                    $( '#showPrivateContent' ).hide();
                    $( '#hidePrivateContent' ).hide();
                    $( '.XXX' ).hide();
                }
                if ( privateVisible ) {
                    $( '.private' ).hide();
                    if ( $( '#videos' ).is( ':visible' ) ) {
                        if ( videoTagList == '.XXX' ) {
                            $( '.private' ).show();
                        } else {
                            $( '.private' ).hide();
                        }
                    }
                    if ( $( '#images' ).is( ':visible' ) ) {
                        if ( imageTagList == '.private' ) {
                            $( '.private' ).show();
                        } else {
                            $( '.private' ).hide();
                        }
                    }
                    $( '.privatefilter' ).show();
                    $( '#hidePrivateContent' ).show();
                    $( '#showPrivateContent' ).hide();
                } else {
                    $( '.private' ).hide();
                    if ( xxxVisible ) {
                        $( '#showPrivateContent' ).show();
                    }
                }
            }

            $( '#showPrivateContent' ).click( function ( e ) {
                privateVisible = true;
                checkPrivateVisible();
            } );

            $( '#hidePrivateContent' ).click( function ( e ) {
                privateVisible = false;
                checkPrivateVisible();
            } );

            // Start button & preFlightChecklist & Reminders
            $( '#launchText' ).click( function ( e ) {
                if ( $( '#topupCheckbox1' ).is( ':checked' ) ) {
                    localStorage.setItem( 'topupReminderInMinutes1', $( '#topupReminderInMinutes1' ).val() );
                } else {
                    localStorage.setItem( 'topupReminderInMinutes1', '' );
                }
                if ( $( '#topupCheckbox2' ).is( ':checked' ) ) {
                    localStorage.setItem( 'topupReminderInMinutes2', $( '#topupReminderInMinutes2' ).val() );
                } else {
                    localStorage.setItem( 'topupReminderInMinutes2', '' );
                }
                if ( $( '#orderPizzaCheckbox' ).is( ':checked' ) ) {
                    localStorage.setItem( 'orderPizzaReminderInMinutes', $( '#orderPizzaReminderInMinutes' ).val() );
                } else {
                    localStorage.setItem( 'orderPizzaReminderInMinutes', '' );
                }
                enableFullscreen();

                if ( !allVideosLoaded ) {
                    loadAllVideos();
                }

                preFlightCheckListAnimationTimer = setInterval( preFlightCheckListAnimation, 1500 );
                preFlightCheckListAnimation();
            } );

            function preFlightCheckListAnimation() {
                var highlightedFound = false;
                var isLastElement = false;
                $( '.checkListItem' ).each( function ( index, value ) {
                    if ( highlightedFound ) {
                        $( this ).addClass( 'checkListItemHighlighted' );
                        return false;
                    }

                    if ( $( this ).hasClass( 'checkListItemHighlighted' ) ) {
                        $( this ).removeClass( 'checkListItemHighlighted' );
                        highlightedFound = true;
                    }
                    if ( index == $( '.checkListItem' ).length - 1 ) {
                        isLastElement = true;
                    }

                } );
                if ( !highlightedFound || isLastElement ) {
                    $( '.checkListItem' ).each( function () {
                        $( this ).addClass( 'checkListItemHighlighted' );
                        return false;
                    } );
                }
            }

            // Lift off - initialize a lot of stuff
            $( '.liftOff' ).click( function ( e ) {
                $( '#menuSettingsSection' ).remove();

                timer = setInterval( tripTimer, 1000 );
                start = new Date();
                setTimeout( function () {
                    if ( !$( '#pizzaTimerContainer' ).is( ':visible' ) ) {
                        $( '#timerMinutes' ).show();
                    }
                    $( '#notesSymbol1' ).show();
                    $( '#launchText' ).hide();
                    $( '#progressGraphContainer' ).show();
                }, 1000 );

                clearInterval( preFlightCheckListAnimationTimer );

                if ( $( this ).attr( 'id' ) == 'shroomsAndWeedLiftOff' ) {
                    $( '#WeedOnlyProgressGraph' ).remove();
                } else {
                    $( '#timerMinutes' ).addClass( 'timerMinutesWeedOnly' );
                    $( '#shroomsPlusWeedProgressGraph' ).remove();
                }

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
                displayedAbsoluteTruthIndex = [];

                $( '.menuvisibleAfterStarted' ).show();

                if ( allGuidedThoughts.length == 0 && localStorage.getItem( 'topupReminderInMinutes1' ) == '' && localStorage.getItem( 'topupReminderInMinutes2' ) == '' && localStorage.getItem( 'orderPizzaReminderInMinutes' ) == '' ) {
                    $( '#disableAllReminders' ).hide();
                }

                // some settings get different start values after liftof
                screensaverStartAfterSeconds = 60;
            } );

            $( '#preFlightChecklist' ).on( 'hide.bs.modal', function () {
                clearInterval( preFlightCheckListAnimationTimer );
            } );

            $( '#timedRecommendation' ).click( function ( event ) {
                $( '#timedRecommendation' ).modal( 'hide' );
                alarmSound.pause();
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
                $( '#topupCheckbox1' ).prop( 'checked', true );
                localStorage.setItem( 'topupReminderInMinutes1', $( '#topupReminderInMinutes1' ).val() );
            } );
            $( '#topupCheckbox2' ).change( function () {
                if ( $( '#topupCheckbox2' ).is( ':checked' ) ) {
                    localStorage.setItem( 'topupReminderInMinutes2', $( '#topupReminderInMinutes2' ).val() );
                } else {
                    localStorage.setItem( 'topupReminderInMinutes2', '' );
                }
            } );
            $( '#topupReminderInMinutes2' ).change( function () {
                $( '#topupCheckbox2' ).prop( 'checked', true );
                localStorage.setItem( 'topupReminderInMinutes2', $( '#topupReminderInMinutes2' ).val() );
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
                $( '#orderPizzaCheckbox' ).prop( 'checked', true );
                localStorage.setItem( 'orderPizzaReminderInMinutes', $( '#orderPizzaReminderInMinutes' ).val() );
            } );

            // Guided Thoughts Config
            localStorage.setItem( 'guidedThought1', '' );
            localStorage.setItem( 'guidedThought2', '' );
            localStorage.setItem( 'guidedThought3', '' );
            localStorage.setItem( 'guidedThoughtMinMinutes', $( '#guidedThoughtMinMinutes' ).val() );
            localStorage.setItem( 'guidedThoughtMaxMinutes', $( '#guidedThoughtMaxMinutes' ).val() );
            localStorage.setItem( 'minutesCountAtLastDisplayedThought', 999999 );
            $( '.guidedThoughtsContainer' ).click( function () {
                $( '.guidedThoughtsContainer' ).hide();
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

            $( '#guidedThoughtsShrineSectionOnly' ).change( function () {
                $( '#guidedThoughtTimingContainer' ).toggle();
                if ( $( '#guidedThoughtTimingContainer' ).is( ':visible' ) ) {
                    localStorage.setItem( 'minutesCountAtLastDisplayedThought', jQuery.trim( $( '#firstGuidedThoughtMin' ).val() ) );
                } else {
                    localStorage.setItem( 'minutesCountAtLastDisplayedThought', 999999 );
                }
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

            // Pizza timer
            localStorage.setItem( 'pizzaTimerMinutesTillReady', $( '#pizzaTimerMinutes' ).val() );

            $( '#pizzaTimerMinutes' ).change( function ( event ) {
                localStorage.setItem( 'pizzaTimerMinutesTillReady', $( '#pizzaTimerMinutes' ).val() );
            } );

            $( '#startPizzaTimer' ).click( function ( e ) {
                $( '#timerMinutes' ).hide();
                $( '#pizzaTimerContainer' ).show();
                if ( timer == '' ) {
                    $( '#launchText' ).attr( 'style', 'opacity:0' );
                } else {
                    $( '#launchText' ).hide();
                }
                pizzaTimerShown = false;
                pizzaTimerStart = new Date();
                setInterval( pizzaTimer, 1000 );
            } );
            $( '#pizzaTimerContainer' ).click( function ( e ) {
                $( '#pizzaTimerContainer' ).hide();
                pizzaTimerStart = '';
                if ( timer != '' ) {
                    $( '#timerMinutes' ).show();
                    $( '#launchText' ).hide();
                } else {
                    $( '#launchText' ).attr( 'style', 'opacity:1' );
                    $( '#launchText' ).show();
                }
            } );

            function pizzaTimer() {
                var totalMinsPizzaTimerPassed = Math.floor( (new Date() - pizzaTimerStart) / 60000 );

                if ( pizzaTimerStart != '' ) {
                    if ( totalMinsPizzaTimerPassed <= 9 ) {
                        $( '#pizzaTimerProgress' ).html( '0' + totalMinsPizzaTimerPassed );
                    } else {
                        $( '#pizzaTimerProgress' ).html( totalMinsPizzaTimerPassed );
                    }
                }
                if ( pizzaTimerStart != '' && totalMinsPizzaTimerPassed >= parseInt( localStorage.getItem( 'pizzaTimerMinutesTillReady' ) ) && pizzaTimerShown == false ) {
                    pizzaTimerShown = true;
                    showTimedRecommendation( 'Pizza is ready!!!' );
                    /* alarmSound.play();*/
                }
            }

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
                displayedAbsoluteTruthIndex = [];
            } );

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

                // Guided Thoughts
                if ( !$( '#showShrineSection' ).hasClass( 'mainSectionActive' ) && allGuidedThoughts[guidedThoughtsNext] != undefined && ((totalMins == minutesTillNextThought + parseInt( localStorage.getItem( 'minutesCountAtLastDisplayedThought' ) )) || (totalMins == parseInt( localStorage.getItem( 'minutesCountAtLastDisplayedThought' ) ) && veryFirstThoughtDisplayed != true)) ) {
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
                disableAllOverlaysAndFullscreenVideos();

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

            function disableAllOverlaysAndFullscreenVideos( hidePlaylistSelection = true, quickTrackSelection = true ) {
                if ( hidePlaylistSelection ) {
                    $( '#spotifyPlaylistsMenu' ).removeClass( 'menuTransition' );
                }
                if ( quickTrackSelection ) {
                    $( '#quickTrackSelectionMenu' ).removeClass( 'menuTransition' );
                }
                $( '.spotifyTrackContainer' ).show();

                closeRightMenu();

                try {
                    $( '.keyboard-cancel-button' ).trigger( 'click' );
                } catch ( e ) {
                }

                $( '#directYoutubePlayer' ).hide();

                $( '.localVideo' ).each( function () {
                    try {
                        $( this ).removeAttr( 'controls' );
                        $( this ).get( 0 ).pause();
                    } catch ( e ) {
                    }
                } );

                // Main Youtube search player
                if ( $( '#mainSearchResultYoutubeContainer' ).hasClass( 'videoContainerFullscreen' ) ) {

                } else { // Direct youtube player
                    try {
                        directYoutubePlayer.pauseVideo();
                    } catch ( e ) {
                    }
                }

                $( '.videoContainerFullscreen' ).each( function () {
                    $( this ).removeClass( 'videoContainerFullscreen' );
                } );

                if ( document.elementFromPoint( 0, 0 ).nodeName == 'IMG' ) {
                    document.elementFromPoint( 0, 0 ).click();
                }

                blockScreenSaver = false;
                screensaverSecondsIdle = 0;
                renderShrineSection( showParticles );
                stopPlaybackVideodrome();
                $( '#preFlightChecklist' ).modal( 'hide' );
                $( '#notesOverlay' ).modal( 'hide' );
                $( '#directYoutubePlayer' ).hide();
                $( '.videoMenuOverlay' ).hide();
                $( '.miscVideoOverlay' ).show();
                $( '.localVideoOverlay' ).show();
                $( '.mainSearchResultVideoOverlay' ).show();
                $( '.videoMenuOverlayFullscreen, .videoMenuOverlayFullscreen2' ).hide();
                if ( mainYoutubePlayerIsActiveSoundSource ) {
                    $( '#mainYoutubePlayerActiveSoundBorder' ).addClass( 'colorfulBorder' );
                }
                clearInterval( preFlightCheckListAnimationTimer );
                hideScreensaverEnso();
                stopScreensaver();
            }

            // Toggle Fullscreen button
            $( '.toggleFullscreen' ).click( function ( event ) {
                toggleFullScreen( event );
            } );

            function toggleFullScreen( event ) {
                event.preventDefault();
                event.stopPropagation();
                clearSelection();
                if ( !isFullScreen ) {
                    enableFullscreen();
                    isFullScreen = true;
                } else {
                    disableFullscreen();
                    isFullScreen = false;
                }
            }

            function enableFullscreen() {
                isFullScreen = true;
                try {
                    document.documentElement.webkitRequestFullscreen();
                } catch ( e ) {
                    try {
                        document.documentElement.msRequestFullscreen();
                    } catch ( e ) {
                        try {
                            document.documentElement.requestFullscreen();
                        } catch ( e ) {
                        }
                    }
                }
            }

            function disableFullscreen() {
                isFullScreen = false;
                try {
                    if ( document.exitFullscreen ) {
                        document.exitFullscreen();
                    } else if ( document.webkitExitFullscreen ) {
                        document.webkitExitFullscreen();
                    } else if ( document.msExitFullscreen ) {
                        document.msExitFullscreen();
                    }
                } catch ( e ) {
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

            // Show notes overlay
            $( '#notesSymbol1,#notesSymbol2' ).click( function () {
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

            // Info Tag toggle setting
            $( '#toggleInfo' ).click( function () {
                $( '.videoInfo' ).toggle();
            } )

            // ***********************************
            // Video section
            // Youtube Player API init
            var tag = document.createElement( 'script' );
            tag.src = 'https://www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName( 'script' )[0];
            firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );

            window.onYouTubePlayerAPIReady = function () {
                // Direct youtube player (for clicked preview images in video section)
                directYoutubePlayer = new YT.Player( 'directYoutubePlayer', {
                    videoId   : '',
                    playerVars: {
                        rel           : 0,
                        autoplay      : 0,
                        controls      : 1,
                        showinfo      : 0,
                        modestbranding: 1,
                        iv_load_policy: 3,
                        cc_load_policy: 0,
                        fs            : 0
                    },
                    events    : {
                        'onStateChange': onDirectYoutubePlayerStateChange
                    }
                } );

                // Search section youtube player
                mainSearchResultYoutubePlayer = new YT.Player( 'mainSearchResultYoutubeIframe', {
                    videoId   : 'TdU2Ab7y91w',
                    playerVars: {
                        rel           : 0,
                        autoplay      : 0,
                        controls      : 1,
                        showinfo      : 0,
                        modestbranding: 1,
                        iv_load_policy: 3,
                        cc_load_policy: 0,
                        fs            : 0
                    },
                    events    : {
                        'onStateChange': onMainSearchResultPlayerStateChange
                    }
                } );
            }

            function onDirectYoutubePlayerStateChange( event ) {
                // Always force CC off!
                directYoutubePlayer.unloadModule( 'captions' );
                directYoutubePlayer.unloadModule( 'cc' );
                switch ( event.data ) {
                    case YT.PlayerState.UNSTARTED:
                        directYoutubePlayerState = 'unstarted';
                        break;
                    case YT.PlayerState.ENDED:
                        directYoutubePlayerState = 'ended';
                        if ( !lastPlayedDirectYoutubePlayerVideoIsWisdom ) {
                            directYoutubePlayer.playVideo();
                        }
                        break;
                    case YT.PlayerState.PLAYING:
                        directYoutubePlayerState = 'playing';
                        break;
                    case YT.PlayerState.PAUSED:
                        directYoutubePlayerState = 'paused';
                        break;
                    case YT.PlayerState.BUFFERING:
                        directYoutubePlayerState = 'buffering';
                        break;
                    case YT.PlayerState.CUED:
                        directYoutubePlayerState = 'video cued';
                        break;
                    default:
                        directYoutubePlayerState = 'unknown (' + event.data + ')';
                }
            }

            $( '.videoFilterBtn' ).click( function () {
                enableFullscreen();
                $( 'html, body' ).animate( {scrollTop: 0}, 'fast' );
                videoTagList = '';
                $( '.videoFilterBtn.videoFilterActive' ).each( function () {
                    activeFilter = $( this ).attr( 'id' );
                    $( this ).toggleClass( 'videoFilterActive' );
                } );

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

                checkPrivateVisible();
            } );

            // Double clicking videos main button loads all videos if in fast mode
            $( '#showVideoSection' ).dblclick( function ( e ) {
                loadAllVideos();
            } );

            // reload videos of given tag if double clicking on video tag
            $( '.videoFilterBtn' ).dblclick( function ( e ) {
                $( videoTagList ).each( function () {
                    if ( typeof $( this ).find( '.videoSource' ).attr( 'src' ) != 'undefined' ) {
                        $( this ).find( '.videoSource' ).attr( 'src', $( this ).find( '.videoSource' ).attr( 'src' ).replace( /NOLOAD/, '' ) );
                    }
                } );
                $( '.localVideo' ).each( function () {
                    this.load();
                } );
            } );

            function loadAllVideos() {
                $( '.videoSource' ).each( function () {
                    if ( typeof $( this ).attr( 'src' ) != 'undefined' ) {
                        $( this ).attr( 'src', $( this ).attr( 'src' ).replace( /NOLOAD/, '' ) );
                    }
                } );
                $( '.localVideo' ).each( function () {
                    this.load();
                } );

                allVideosLoaded = true;
            }

            // Youtube video minimized overlay
            $( '.youtubeVideo' ).click( function ( event ) {
                playYoutubeVideo( this );

                $( '.lastPlayedVideo' ).each( function () {
                    $( this ).remove();
                } );
                colorfulBorder = document.createElement( 'div' );
                colorfulBorder.classList.add( 'colorfulBorder' );
                colorfulBorder.classList.add( 'lastPlayedVideo' );
                $( this ).closest( '.videoContainer ' )[0].appendChild( colorfulBorder );
            } );
            $( '.videoHasSound' ).click( function ( event ) {
                playYoutubeVideo( $( this ).closest( '.iFrameContainer' ).find( '.youtubeVideo ' ), true );
            } );

            function playYoutubeVideo( clickedElement, unmuted = false ) {
                if ( !directYoutubePlayerLoaded ) {
                    try {
                        directYoutubePlayer.mute();
                        directYoutubePlayerLoaded = true;
                    } catch ( e ) {
                        directYoutubePlayerLoaded = false;
                    }
                }

                if ( directYoutubePlayerLoaded ) {
                    blockScreenSaver = true;
                    enableFullscreen();

                    $( '#directYoutubePlayer' ).show();
                    $( '.videoMenuOverlayFullscreen, .videoMenuOverlayFullscreen2' ).show();

                    var startSeconds = 0;
                    if ( $( clickedElement ).attr( 'startSeconds' ) != '' ) {
                        startSeconds = $( clickedElement ).attr( 'startSeconds' );
                    }

                    if ( lastPlayedDirectYoutubePlayerId != $( clickedElement ).attr( 'videoId' ) ) {
                        directYoutubePlayer.loadVideoById( $( clickedElement ).attr( 'videoId' ), startSeconds );
                    }
                    lastPlayedDirectYoutubePlayerId = $( clickedElement ).attr( 'videoId' );

                    if ( $( clickedElement ).closest( '.videoContainer' ).hasClass( 'wisdom' ) ) {
                        lastPlayedDirectYoutubePlayerVideoIsWisdom = true;
                    } else {
                        lastPlayedDirectYoutubePlayerVideoIsWisdom = false;
                    }

                    directYoutubePlayer.playVideo();

                    if ( $( clickedElement ).attr( 'mute' ) == 'false' ) { // Videos where sound is important, wisdom e.g.
                        spotifyPause();
                        directYoutubePlayer.unMute();
                        directYoutubePlayer.setVolume( 100 );
                    } else if ( $( clickedElement ).attr( 'mute' ) == 'mixed' && unmuted ) { // Videos with optional sound, e.g. some river or rain video
                        directYoutubePlayer.unMute();
                        directYoutubePlayer.setVolume( 100 );
                    } else {
                        directYoutubePlayer.mute();
                    }

                    if ( $( clickedElement ).attr( 'playbackrate' ) != '' ) {
                        directYoutubePlayer.setPlaybackRate( parseInt( $( clickedElement ).attr( 'playbackrate' ) ) );
                    } else {
                        directYoutubePlayer.setPlaybackRate( 1 );
                    }
                }
            }

            // Local Video minimized iFrame overlay
            $( document ).on( 'click', '.localVideoOverlay', function ( event ) {
                blockScreenSaver = true;
                enableFullscreen();
                $( this ).closest( '.iFrameContainer' ).addClass( 'videoContainerFullscreen' );

                try {
                    $( this ).closest( '.iFrameContainer' ).find( '.localVideo' )[0].play();
                    $( this ).closest( '.iFrameContainer' ).find( '.localVideo' ).prop( 'controls', 'controls' );
                } catch ( e ) {
                }
                $( '.localVideoOverlay' ).hide();
                $( '.videoMenuOverlayFullscreen, .videoMenuOverlayFullscreen2' ).show();

                $( '.lastPlayedVideo' ).each( function () {
                    $( this ).remove();
                } );
                colorfulBorder = document.createElement( 'div' );
                colorfulBorder.classList.add( 'colorfulBorder' );
                colorfulBorder.classList.add( 'lastPlayedVideo' );
                $( this ).closest( '.videoContainer ' )[0].appendChild( colorfulBorder );
            } );

            $( '.videoMenuOverlayFullscreen' ).on( 'wheel', function ( event ) {
                event.preventDefault();
                if ( event.originalEvent.deltaY > 0 ) { // going down
                    $( this ).closest( '.iFrameContainer' ).find( '.videoFrame' )[0].currentTime = $( this ).closest( '.iFrameContainer' ).find( '.videoFrame' )[0].currentTime - 10;
                } else { // going up
                    $( this ).closest( '.iFrameContainer' ).find( '.videoFrame' )[0].currentTime = $( this ).closest( '.iFrameContainer' ).find( '.videoFrame' )[0].currentTime + 10;
                }
            } );

            // Misc Video minimized iFrame overlay
            $( '.miscVideoOverlay' ).click( function ( event ) {
                blockScreenSaver = true;
                enableFullscreen();
                $( this ).closest( '.iFrameContainer' ).addClass( 'videoContainerFullscreen' );

                $( '.miscVideoOverlay' ).hide();
                $( '.videoMenuOverlayFullscreen, .videoMenuOverlayFullscreen2' ).show();

                $( '.lastPlayedVideo' ).each( function () {
                    $( this ).remove();
                } );
                colorfulBorder = document.createElement( 'div' );
                colorfulBorder.classList.add( 'colorfulBorder' );
                colorfulBorder.classList.add( 'lastPlayedVideo' );
                $( this ).closest( '.videoContainer ' )[0].appendChild( colorfulBorder );
            } );

            // mainSearchResultYoutube Video iFrame fullscreen button overlay
            $( '.mainSearchResultVideoOverlay' ).click( function ( event ) {
                blockScreenSaver = true;
                enableFullscreen();
                mainSearchResultYoutubePlayer.playVideo();
                $( this ).closest( '#mainSearchResultYoutubeContainer' ).addClass( 'videoContainerFullscreen' );

                $( '.mainSearchResultVideoOverlay' ).hide();
                $( '.videoMenuOverlayFullscreen, .videoMenuOverlayFullscreen2' ).show();
                $( '#mainYoutubePlayerActiveSoundBorder' ).removeClass( 'colorfulBorder' );
            } );

            $( '.videoMenuOverlayFullscreen, .videoMenuOverlayFullscreen2' ).click( function ( event ) {
                disableAllOverlaysAndFullscreenVideos();
            } );

            // Show cursor when moving mouse
            var moveTimerFullscreenVideoOverlay;
            $( '.videoMenuOverlayFullscreen' ).on( 'mousemove', function () {
                clearTimeout( moveTimerFullscreenVideoOverlay );
                moveTimerFullscreenVideoOverlay = setTimeout( function () {
                    $( '.videoMenuOverlayFullscreen' ).css( 'cursor', 'none' );
                    $( '.videoMenuOverlay' ).hide();
                }, 1000 );
                $( '.videoMenuOverlayFullscreen' ).css( 'cursor', 'url(\'../assets/rainbow-gradient-pointer-32x32.png\'), auto' );
                $( '.videoMenuOverlay' ).show();
            } );

            // Reset settings if user disengaged fullscreen via ESC or other means...
            document.addEventListener( 'fullscreenchange', exitHandler, false );
            document.addEventListener( 'mozfullscreenchange', exitHandler, false );
            document.addEventListener( 'MSFullscreenChange', exitHandler, false );
            document.addEventListener( 'webkitfullscreenchange', exitHandler, false );

            function exitHandler() {
                if ( !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement ) {
                    isFullScreen = false;
                    disableAllOverlaysAndFullscreenVideos();
                }
            }

            $( '.videoFrame' ).click( function ( event ) {
                this.paused ? this.play() : this.pause();
            } );

            // XXX section within video
            $( '.searchLink' ).on( 'mousedown', document, function ( e ) {
                e.preventDefault();
                e.stopPropagation();
                if ( $( this ).parent().find( '.searchInput' ).val() != '' ) {
                    window.open( $( e.target ).attr( 'searchLink' ).replace( /##searchTerm##/, $( this ).parent().find( '.searchInput' ).val() ), '_blank' );
                } else {
                    window.open( $( e.target ).attr( 'href' ), '_blank' );
                }
            } );

            // only show misc video section if there are videos configured
            if ( config['videosMisc'] == undefined ) {
                $( '#videosMiscSection' ).remove();
            }

            // Video section screensaver
            function startScreensaver( force = false ) {
                screensaverSecondsIdle++;
                $( '.mainSectionActive' ).each( function () {
                    if ( $( this ).attr( 'data-target' ) == 'videos' || $( this ).attr( 'data-target' ) == 'images' ) {
                        if ( !$( '#spotifyPlaylistsMenu' ).hasClass( 'menuTransition' ) &&
                                !$( '#quickTrackSelectionMenu' ).hasClass( 'menuTransition' ) &&
                                $( '.MageAIfilter.imageFilterActive' ).length == 0 &&
                                $( '.MageAIFavorites.imageFilterActive' ).length == 0 &&
                                (screensaverSecondsIdle >= screensaverStartAfterSeconds || force) &&
                                !screensaverActive && !blockScreenSaver &&
                                !$( '#menuClose' ).prop( 'checked' ) ) {
                            screensaverActive = true;
                            showScreensaverEnso();
                            $( 'body,#menu,.videoSource,.XXXfilter,.fullscreenImage,#switchDesktopPhone,.youtubeVideo,.spotifyPlaylistItem,#spotifyPlaylists,#launchSymbol,#fullscreenIcon,#burgerContainer,.mainSectionBtn,#menuClose,.videoFilterBtn,.playerIcon,#menu,#devices' ).each( function () {
                                $( this ).addClass( 'cursorNone' );
                            } );
                            $( '#spotifyPlaylistsMenu' ).addClass( 'invisible' );
                            $( '#menu' ).addClass( 'invisible' );
                        }
                    }
                } );
            }

            function showScreensaverEnso() {
                $( '.mainSectionActive' ).each( function () {
                    if ( $( this ).attr( 'data-target' ) == 'videos' || $( this ).attr( 'data-target' ) == 'images' ) {
                        $( '#' + $( this ).attr( 'data-target' ) ).addClass( 'invisible' );
                        $( '#globalEnsoContainer' ).removeClass( 'globalEnsoContainerHidden' );
                        $( '.videoFilterBtn' ).addClass( 'hiddenAndUnclickable' );
                        $( '.imageFilterBtn' ).addClass( 'hiddenAndUnclickable' );
                    }
                } );
            }

            function stopScreensaver() {
                if ( screensaverActive ) {
                    screensaverActive = false;
                    hideScreensaverEnso();
                    $( 'body,#menu,.XXXfilter,.videoSource,.fullscreenImage,#switchDesktopPhone,.youtubeVideo,.spotifyPlaylistItem,#spotifyPlaylists,#launchSymbol,#fullscreenIcon,#burgerContainer,.mainSectionBtn,#menuClose,.videoFilterBtn,.playerIcon,#menu,#devices' ).each( function () {
                        $( this ).removeClass( 'cursorNone' );
                    } );
                    $( '#spotifyPlaylistsMenu' ).removeClass( 'invisible' );
                    $( '#menu' ).removeClass( 'invisible' );
                }
                screensaverSecondsIdle = 0;
            }

            function hideScreensaverEnso() {
                $( '.mainSectionActive' ).each( function () {
                    $( '#' + $( this ).attr( 'data-target' ) ).removeClass( 'invisible' );
                    $( '#globalEnsoContainer' ).addClass( 'globalEnsoContainerHidden' );
                    $( '.videoFilterBtn' ).removeClass( 'hiddenAndUnclickable' );
                    $( '.imageFilterBtn' ).removeClass( 'hiddenAndUnclickable' );
                } );
            }

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
                enableFullscreen();
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
                enableFullscreen();
                blockScreenSaver = true;
            } );

            // Show timer in image when moving mouse
            var moveTimerFullscreenSlideshow;
            $( document ).mousemove( function () {
                $( '.displayedFullscreenImage' ).on( 'mousemove', function () {
                    if ( !slideshowJustStarted ) {
                        clearTimeout( moveTimerFullscreenSlideshow );
                        clearInterval( imageSlideshowInterval );
                        moveTimerFullscreenSlideshow = setTimeout( function () {
                            $( '.videoMenuOverlay' ).hide();
                            $( '.displayedFullscreenImage' ).css( 'cursor', 'none' );
                        }, 1500 );
                        $( '.videoMenuOverlay' ).show();
                        $( '.displayedFullscreenImage' ).css( 'cursor', 'url(\'../assets/rainbow-gradient-pointer-32x32.png\'), auto' );
                    }
                } );

                $( '.imageSlideshowControls' ).on( 'mousemove', function () {
                    clearTimeout( moveTimerFullscreenSlideshow );
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
                }, 3000 );

                $( '.videoMenuOverlay' ).hide();
                $( '.displayedFullscreenImage' ).css( 'cursor', 'none' );
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

            $( '#shrineStroboSpeed' ).click( function ( event ) {
                if ( stroboSpeed == 0 ) {
                    stroboSpeed = 15;
                } else if ( stroboSpeed == 15 ) {
                    stroboSpeed = 20;
                } else {
                    stroboSpeed = 0;
                }
                changeStroboSpeed( stroboSpeed );
            } );

            function changeStroboSpeed( stroboSpeed ) {
                if ( stroboBGWhite ) {
                    $( '#particles-js' ).css( 'animation', 'strobo2 ' + stroboSpeed + 'ms steps(1,end) infinite' );
                } else {
                    $( '#particles-js' ).css( 'animation', 'strobo1 ' + stroboSpeed + 'ms steps(1,end) infinite' );
                }
                if ( stroboSpeed > 0 ) {
                    $( '#ensoImageShrine' ).css( 'animation', 'stroboEnso 20ms steps(1,end) infinite' );
                    $( '#absoluteTruthsOverlayText' ).css( 'animation', 'stroboEnso 55ms steps(1,end) infinite' );
                } else {
                    $( '#ensoImageShrine' ).css( 'animation', 'stroboEnso 0ms steps(1,end) infinite' );
                    $( '#absoluteTruthsOverlayText' ).css( 'animation', 'stroboEnso 0ms steps(1,end) infinite' );
                }
            }

            $( '#shrineToggleBWStrobo' ).click( function ( event ) {
                if ( stroboBGWhite ) {
                    stroboBGWhite = false;
                    $( '#particles-js' ).css( 'animation', 'strobo1 ' + stroboSpeed + 'ms steps(1,end) infinite' );
                } else {
                    stroboBGWhite = true;
                    $( '#particles-js' ).css( 'animation', 'strobo2 ' + stroboSpeed + 'ms steps(1,end) infinite' );
                }
            } );

            $( '#shrine' ).mousemove( function ( event ) {
                if ( event.pageY < 75 ) {
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
                        if ( $( '#shrine' ).is( ':visible' ) ) {
                            $( '#shrineSettingsContainer' ).addClass( 'visible' );
                        }
                    }, function () {
                        if ( $( '#shrine' ).is( ':visible' ) ) {
                            $( '#mainMenu' ).hide();
                        }
                        $( '#shrineSettingsContainer' ).removeClass( 'visible' );
                    }
            );

            // Show cursor when moving mouse
            var moveTimerShrine;
            $( '#particles-js' ).on( 'mousemove', function () {
                clearTimeout( moveTimerShrine );
                moveTimerShrine = setTimeout( function () {
                    $( '#particles-js' ).css( 'cursor', 'none' );
                }, 1000 );
                $( '#particles-js' ).css( 'cursor', 'url(\'../assets/rainbow-gradient-cursor-1-32x32.png\'), auto' );
            } );

            $( '#particles-js' ).click( function ( e ) {
                enableFullscreen();
            } );

            $( '#toggleAbsoluteThruth' ).click( function ( e ) {
                $( '#absoluteTruthsOverlay' ).toggle();
                enableFullscreen();
            } );

            $( window ).on( 'wheel', function ( event ) {
                stopScreensaver();
                enableFullscreen();
                clearInterval( absoluteTruthsTimer );
                absoluteTruthsTimer = setInterval( absoluteTruthsUpdate, absoluteTruthsTimerDuration );
                absoluteTruthsUpdate( true );
            } );

            $( '#shrineDiscoMode' ).click( function ( event ) {
                if ( shrineDiscoActive ) {
                    stopShrineDisco();
                } else {
                    shrineDiscoActive = true;
                    switchDiscoColor();
                    triggerStrobo();
                }
            } );

            function stopShrineDisco() {
                shrineDiscoActive = false;
                clearTimeout( shrineColorChangeTimer );
                clearTimeout(shrineStroboChangeTimer);
                changeStroboSpeed( 0 );
            }

            function triggerStrobo() {
                stroboSpeeds = [15,20];
                stroboSpeedToSelect = Math.floor( Math.random() * (1 - 0 + 1) + 0 );
                changeStroboSpeed( stroboSpeeds[stroboSpeedToSelect]);

                max = 4;
                min = 1;
                nextStroboChange = Math.floor( Math.random() * (max - min + 1) + min );
                shrineStroboChangeTimer = setTimeout( triggerStrobo, nextStroboChange * 1000 );
            }

            function switchDiscoColor() {
                randomNumber = Math.floor( Math.random() * (parseInt( config['shrineColors'].length + 1 ) - parseInt( 0 )) + parseInt( 0 ) ) + 1;
                while ( alreadySelectedColorsDisco.indexOf( randomNumber ) !== -1 ) {
                    randomNumber = Math.floor( Math.random() * (parseInt( config['shrineColors'].length + 1 ) - parseInt( 0 )) + parseInt( 0 ) ) + 1;
                    if ( alreadySelectedColorsDisco.length >= config['shrineColors'].length ) {
                        alreadySelectedColorsDisco = [];
                    }
                }
                alreadySelectedColorsDisco.push( randomNumber );
                counter = 1;
                $( '.shrineDiscoColor' ).each( function () {
                    if ( counter == randomNumber ) {
                        $( this ).trigger( 'click' );
                    }
                    counter++;
                } );

                max = 4;
                min = 1;
                nextColorRefresh = Math.floor( Math.random() * (max - min + 1) + min );
                shrineColorChangeTimer = setTimeout( switchDiscoColor, nextColorRefresh * 1000 );
            }

            function renderShrineSection( showParticles ) {
                stopShrineDisco();
                // reset strobo to default
                stroboBGWhite = false;
                $( '#particles-js' ).css( 'animation', 'strobo2 0ms steps(1,end) infinite' );
                $( '#ensoImageShrine' ).css( 'animation', 'stroboEnso 0ms steps(1,end) infinite' );
                $( '#absoluteTruthsOverlayText' ).css( 'animation', 'stroboEnso 0ms steps(1,end) infinite' );
                $( '.particles-js-canvas-el' ).remove();
                particlesInit( showParticles );
            }

            function absoluteTruthsUpdate( quickSwap = false ) {
                fadeoutDuration = 1500;

                if ( quickSwap ) {
                    $( '#absoluteTruthsOverlayText' ).html( '' );
                }

                if ( displayedAbsoluteTruthIndex.length <= 0 ) {
                    if ( allGuidedThoughts.length > 0 ) {
                        allGuidedThoughts.forEach( function ( item ) {
                            tempItem = [];
                            tempItem['text'] = item;
                            tempItem['tag'] = 'guided';
                            displayedAbsoluteTruthIndex.push( tempItem );
                        } );
                    } else {
                        config['absoluteTruths'].forEach( function ( item ) {
                            displayedAbsoluteTruthIndex.push( item );
                        } );
                    }
                    shuffleArray( displayedAbsoluteTruthIndex );
                }
                nextTruth = displayedAbsoluteTruthIndex.pop();

                if ( nextTruth['tag'] != 'XXX' && xxxVisible && nextTruth['tag'] != 'guided' ) {
                    absoluteTruthsUpdate( quickSwap );
                } else if ( nextTruth['tag'] == 'XXX' && !xxxVisible && nextTruth['tag'] != 'guided' ) {
                    absoluteTruthsUpdate( quickSwap );
                } else {
                    $( '#absoluteTruthsOverlayText' ).fadeOut( fadeoutDuration, function () {
                        $( '#absoluteTruthsOverlayText' ).html( nextTruth['text'] );

                        length = nextTruth['text'].length;
                        if ( length < 100 ) {
                            document.getElementById( 'absoluteTruthsOverlayText' ).style.fontSize = '110px';
                        } else if ( length < 200 ) {
                            document.getElementById( 'absoluteTruthsOverlayText' ).style.fontSize = '95px';
                        } else if ( length < 300 ) {
                            document.getElementById( 'absoluteTruthsOverlayText' ).style.fontSize = '82px';
                        } else {
                            document.getElementById( 'absoluteTruthsOverlayText' ).style.fontSize = '67px';
                        }

                        $( '#absoluteTruthsOverlayText' ).fadeIn( 1500 );
                        $( '#absoluteTruthsOverlayContainer' ).css( 'animation', 'textShrink' + textShrinkFrameSeed + ' ' + absoluteTruthsTimerDuration + 'ms linear infinite' );
                        textShrinkFrameSeed = (textShrinkFrameSeed + 1) % 2;
                    } );
                }
            }

            function shuffleArray( array ) {
                let currentIndex = array.length, randomIndex;
                while ( currentIndex > 0 ) {
                    randomIndex = Math.floor( Math.random() * currentIndex );
                    currentIndex--;
                    [array[currentIndex], array[randomIndex]] = [
                        array[randomIndex], array[currentIndex]];
                }
                return array;
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

                $( '#gamesFrame' ).attr( 'class', '' );
                $( '#gamesFrame' ).attr( 'src', $( this ).attr( 'data' ) );
                $( '#gamesFrame' ).addClass( $( this ).attr( 'iframeClass' ) );

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
            redirect_uri = config['oAuthSpotify'][0]['redirect_uri'];
            client_id = config['oAuthSpotify'][0]['client_id'];
            client_secret = config['oAuthSpotify'][0]['client_secret'];

            $( '#openAddToQueueMenu' ).click( function () {
                disableAllOverlaysAndFullscreenVideos( true, false );
                $( '#quickTrackSelectionMenu' ).toggleClass( 'menuTransition' );
                $( '#quickTrackSelectionMenu' ).animate( {scrollTop: 0}, 'fast' );
            } );

            $( '#spotifyPlaylists' ).click( function () {
                $( '#spotifyPlaylistsMenu' ).toggleClass( 'menuTransition' );
                $( '#spotifyPlaylistsMenu' ).animate( {scrollTop: 0}, 'fast' );
                disableAllOverlaysAndFullscreenVideos( false );
            } );

            $( '.spotifyPlaylistItem,.currentTrackAction' ).click( function () {
                $( '#spotifyPlaylistsMenu' ).removeClass( 'menuTransition' );
                $( '#quickTrackSelectionMenu' ).removeClass( 'menuTransition' );
            } );

            $( '#spotifyLogin' ).click( function ( e ) {
                requestAuthorization();
            } );
            $( '#spotifyLogout' ).click( function ( e ) {
                logoutSpotify();
            } );

            if ( urlParams.get( 'code' ) != undefined ) {
                handleRedirect( urlParams.get( 'code' ) );
                setTimeout( function () {
                    location.reload();
                }, 3000 );
            }

            $( '.noisegeneratorLink' ).on( 'mousedown', document, function ( e ) {
                // on middle mouse button just open in new tab
                if ( e.which == 2 ) {
                    window.open( $( this ).attr( 'href' ), '_blank' );
                    $( '#spotifyPlaylistsMenu' ).removeClass( 'menuTransition' );
                }
                if ( e.which == 1 ) {
                    try {
                        mainSearchResultYoutubePlayer.pauseVideo();
                        spotifyPause();
                    } catch ( e ) {
                    }
                    spotifyHasBeenPlayingBeforePause = false;
                    externalSoundTabOpened = true;
                    window.open( $( this ).attr( 'href' ), 'externalSoundTab' );
                    $( '#spotifyPlaylistsMenu' ).removeClass( 'menuTransition' );
                }
            } );

            $( document ).on( 'mousedown', document, function ( e ) {
                // on middle mouse button play next track
                if (
                        e.which == 2 &&
                        !$( event.target ).hasClass( 'menuItem' ) &&
                        !$( event.target ).hasClass( 'xxxLink' ) &&
                        !$( event.target ).hasClass( 'searchLink' ) &&
                        !$( event.target ).hasClass( 'noisegeneratorLink' ) &&
                        !$( event.target ).hasClass( 'spotifyPlaylistItem' ) &&
                        !$( event.target ).hasClass( 'externalVideoPreview' )
                ) {
                    e.preventDefault();
                    openDesktopApp();
                    playNextYoutubeVideoOrSpotifyTrack();
                }
            } );

            function openDesktopApp() {
                if ( config['spotifyMainPlayerName'] != '' &&
                        config['spotifyMainPlayerName'].indexOf( 'DESKTOP' ) >= 0 &&
                        localStorage.getItem( 'access_token' ) != null &&
                        typeof $( '#devices option:contains("' + config['spotifyMainPlayerName'] + '")' ).val() == 'undefined' &&
                        spotifyOpened == false ) {
                    window.open( lastSelectedPlaylist, '_blank' );
                    spotifyOpened = true;
                } else if ( config['spotifyMainPlayerName'] != '' &&
                        config['spotifyMainPlayerName'].indexOf( 'Web Player' ) >= 0 &&
                        localStorage.getItem( 'access_token' ) != null &&
                        typeof $( '#devices option:contains("' + config['spotifyMainPlayerName'] + '")' ).val() == 'undefined' &&
                        spotifyOpened == false ) {
                    window.open( 'https://open.spotify.com/', 'spotifyWebPlayer' );
                    spotifyOpened = true;
                }
            }

            // integrated Spotify player if succesfully logged in
            if ( localStorage.getItem( 'access_token' ) != null ) {
                refreshAccessToken();
                shuffle();
                repeat();
                setInterval( refreshAccessToken, 60000 );
                setInterval( refreshDevices, 3000 );
                setInterval( currentlyPlaying, 1000 );
                populateTrackSelectionInterval = setInterval( populateTrackSelectionMenu, 1000 );

                $( '#spotifyLogin' ).hide();

                $( document ).on( 'click', '.spotifyTrackContainer', function ( e ) {
                    spotifyAddToQueue( $( this ).attr( 'id' ) );
                    $( this ).hide();
                } );

                $( '.spotifyPlaylistItem' ).on( 'mousedown', document, function ( e ) {
                    // on middle mouse button put playlist into queue
                    if ( e.which == 2 ) {
                        e.preventDefault();
                        nextPlaylistToPlay = $( this ).attr( 'data-spotify-id' );
                        $( '#spotifyPlaylistsMenu' ).removeClass( 'menuTransition' );
                    } else if ( e.which == 1 ) {
                        $( '#spotifyPlaylists' ).html( '...' );
                        openDesktopApp();
                        markYoutubeAsActiveAudioSource( false );
                        try {
                            mainSearchResultYoutubePlayer.mute();
                        } catch ( e ) {
                        }

                        // Playlist Selection
                        if ( $( this ).hasClass( 'spotifyPlaylist' ) ) {
                            if ( $( this ).attr( 'shuffle' ) == 'false' ) {
                                shuffle( false, false );
                            } else {
                                shuffle();
                            }
                            if ( $( this ).attr( 'repeat' ) == 'false' ) {
                                repeat( 'off' );
                            } else {
                                repeat();
                            }
                        } else { // Single Track Selection
                            repeat( 'off' );
                            spotifyHasBeenPlayingBeforePause = false;
                        }

                        spotifyPlay( $( this ).attr( 'data-spotify-id' ) );

                        if ( externalSoundTabOpened ) {
                            externalSoundTabOpened = false;
                            window.open( './tabCloser.html', 'externalSoundTab' );
                        }
                    }
                } );

                $( '#stopMusic' ).click( function () {
                    spotifyHasBeenPlayingBeforePause = false;
                    spotifyPause();
                    try {
                        mainSearchResultYoutubePlayer.pauseVideo();
                    } catch ( e ) {
                    }
                    markYoutubeAsActiveAudioSource( false );

                    if ( externalSoundTabOpened ) {
                        externalSoundTabOpened = false;
                        window.open( './tabCloser.html', 'externalSoundTab' );
                    }
                } );

                $( '#next' ).click( function () {
                    openDesktopApp();
                    playNextYoutubeVideoOrSpotifyTrack();
                } );
                $( '#switchDesktopPhone' ).click( function () {
                    if ( $( '#devices' ).find( ':selected' ).text().toLowerCase().includes( config['spotifyMainPlayerName'].toLowerCase() ) && typeof $( '#devices option:contains("' + config['spotifyPhoneName'] + '")' ).val() != 'undefined' ) {
                        transfer( $( '#devices option:contains("' + config['spotifyPhoneName'] + '")' ).val() );
                    } else if ( config['spotifyMainPlayerName'] != '' && !$( '#devices' ).find( ':selected' ).text().toLowerCase().includes( config['spotifyMainPlayerName'].toLowerCase() ) ) {
                        openDesktopApp();
                        transfer( $( '#devices option:contains("' + config['spotifyMainPlayerName'] + '")' ).val() );
                    }
                } );
                $( '#devices' ).change( function () {
                    transfer( $( '#devices' ).find( ':selected' ).val() );
                    closeRightMenu();
                } );

                $( '#spotifyIcon' ).click( function ( e ) {
                    window.open( lastSelectedPlaylist, '_blank' );
                } );

                $( '.addToFavorites' ).click( function ( e ) {
                    addTrackToPlaylist( config['spotifySaveToPlaylistId'], $( '.spotifyCurrentlyPlayingTrack' ).attr( 'data-spotify-id' ) );
                } );

                if ( config['spotifySaveToPlaylistId'] == undefined && config['spotifySaveToPlaylistId'] != '' ) {
                    $( '.addToFavorites' ).hide();
                }

                $( '.createSongRadio' ).click( function ( e ) {
                    createSongRadio( $( '.spotifyCurrentlyPlayingTrack' ).attr( 'data-spotify-id' ) );
                } );

                $( '.stopAfterTrack' ).click( function ( e ) {
                    stopAfterTrack = true;
                } );

                // Transfer sound into bedroom and disable fullscreen
                $( '#sleep' ).click( function () {
                    transfer( $( '#devices option:contains("' + config['spotifyBedroomName'] + '")' ).val() );
                    disableFullscreen();
                } );

                function populateTrackSelectionMenu() {
                    config['trackSelectionPlaylists'].forEach( function ( item ) {
                        getPlaylistContent( item['playlistId'] );
                    } );
                    if ( Object.keys( populateTrackSelectionData ).length == config['trackSelectionPlaylists'].length ) {
                        clearInterval( populateTrackSelectionInterval );
                        $.each( populateTrackSelectionData, function ( key, value ) {
                            insertTracksIntoTrackSelectionMenu( value )
                        } );
                    }
                }

            } else {
                // Stand alone iFrame Spotify Player
                $( '#oAuthPlayerControl' ).remove();
                $( '#devices' ).attr( 'style', 'visibility:hidden' );
                $( '#spotifyLogout' ).hide();

                $.getScript( 'https://open.spotify.com/embed-podcast/iframe-api/v1', function ( data, textStatus, jqxhr ) {
                    window.onSpotifyIframeApiReady = ( IFrameAPI ) => {
                        let element = document.getElementById( 'iFrameSpotifyPlayer' );
                        let options = {
                            uri: 'spotify:playlist:4ILChY5F4Hn08ikt0rfHhW'
                        };
                        let callback = ( EmbedController ) => {
                            document.querySelectorAll( '.spotifyPlaylistItem' ).forEach(
                                    episode => {
                                        episode.addEventListener( 'click', () => {
                                            EmbedController.loadUri( episode.getAttribute( 'data-spotify-id' ) );
                                            $( '#spotifyPlaylists' ).html( episode.innerHTML );

                                            setTimeout( function () {
                                                EmbedController.play();
                                            }, 1500 );

                                            markYoutubeAsActiveAudioSource( false );
                                            mainSearchResultYoutubePlayer.mute();

                                            if ( externalSoundTabOpened ) {
                                                externalSoundTabOpened = false;
                                                window.open( './tabCloser.html', 'externalSoundTab' );
                                            }
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
            // Search Youtube section
            displayYoutubeQueue();
            searchYoutube( youtubeIntitalSearchTerm );

            function onMainSearchResultPlayerStateChange( event ) {
                // Always force CC off!
                mainSearchResultYoutubePlayer.unloadModule( 'captions' );
                mainSearchResultYoutubePlayer.unloadModule( 'cc' );
                switch ( event.data ) {
                    case YT.PlayerState.UNSTARTED:
                        mainSearchResultYoutubePlayerState = 'unstarted';
                        break;
                    case YT.PlayerState.ENDED:
                        mainSearchResultYoutubePlayerState = 'ended';
                        playNextYoutubeVideoOrSpotifyTrack();
                        break;
                    case YT.PlayerState.PLAYING:
                        mainSearchResultYoutubePlayerState = 'playing';
                        if ( !mainSearchResultYoutubePlayer.isMuted() ) {
                            markYoutubeAsActiveAudioSource( true );
                            spotifyPause();
                        }
                        break;
                    case YT.PlayerState.PAUSED:
                        mainSearchResultYoutubePlayerState = 'paused';
                        setTimeout( function () {
                            if ( mainSearchResultYoutubePlayerState == 'paused' ) {
                                markYoutubeAsActiveAudioSource( false );
                                if ( spotifyHasBeenPlayingBeforePause ) {
                                    spotifyPlay();
                                }
                            }
                        }, 1000 );
                        break;
                    case YT.PlayerState.BUFFERING:
                        mainSearchResultYoutubePlayerState = 'buffering';
                        break;
                    case YT.PlayerState.CUED:
                        mainSearchResultYoutubePlayerState = 'video cued';
                        break;
                    default:
                        mainSearchResultYoutubePlayerState = 'unknown (' + event.data + ')';
                }
            }

            $( '#mainSearchInput' ).click( function ( event ) {
                enableFullscreen();
            } );

            $( '.addVideoToQueue' ).click( function ( event ) {
                $( this ).addClass( 'addVideoToQueueClicked' );
                addToQueueElement = this;
                setTimeout( function () {
                    $( addToQueueElement ).removeClass( 'addVideoToQueueClicked' );
                }, 150 );

                var videoId = $( this ).attr( 'videoId' );
                var description = searchYoutubeSpecificVideoId( videoId );

                videoToQueue = {
                    'id'         : videoId,
                    'img'        : 'https://img.youtube.com/vi/' + videoId + '/0.jpg',
                    'description': description,
                    'duration'   : ''
                };

                youtubeCurrentQueue.push( videoToQueue );
                displayYoutubeQueue();
            } );

            $( document ).on( 'click', '.youtubeAutocompleteItem', function ( e ) {
                $( '#mainSearchInput' ).val( $( this ).html() );
                searchYoutube( $( this ).html() );
                searchYoutubeAutocomplete( $( this ).html() );
            } );

            $( '#mainSearchInput' ).keydown( function ( event ) {
                enableFullscreen();

                if ( event.keyCode === 13 || event.keyCode === 9 ) { // Enter or Tab
                    event.stopPropagation();
                    event.preventDefault();

                    currentAutocompleteItem = 0;
                    lastSelectedAutocompleteItem = 0;
                    searchYoutube( $( this ).val() );
                    searchYoutubeAutocomplete( $( this ).val() );
                } else if ( event.keyCode === 38 ) { // Up
                    event.stopPropagation();
                    event.preventDefault();

                    currentAutocompleteItem = 0;
                    if ( lastSelectedAutocompleteItem <= 1 ) {
                        lastSelectedAutocompleteItem = 1;
                        return false;
                    }
                    $( '.youtubeAutocompleteItem' ).each( function () {
                        $( this ).removeClass( 'autocompleteSelected' );
                        if ( currentAutocompleteItem == lastSelectedAutocompleteItem - 2 ) {
                            $( this ).addClass( 'autocompleteSelected' );
                            lastSelectedAutocompleteItem = lastSelectedAutocompleteItem - 1;
                            $( '#mainSearchInput' ).val( $( this ).html() );
                        }
                        currentAutocompleteItem++;
                    } );
                    return;
                } else if ( event.keyCode === 40 ) { // Down
                    event.stopPropagation();
                    event.preventDefault();

                    if ( lastSelectedAutocompleteItem >= 6 ) {
                        lastSelectedAutocompleteItem = 6;
                        return false;
                    }

                    currentAutocompleteItem = 0;
                    $( '.youtubeAutocompleteItem' ).each( function () {
                        $( this ).removeClass( 'autocompleteSelected' );
                        if ( currentAutocompleteItem == lastSelectedAutocompleteItem ) {
                            $( this ).addClass( 'autocompleteSelected' );
                            lastSelectedAutocompleteItem = currentAutocompleteItem + 1;
                            $( '#mainSearchInput' ).val( $( this ).html() );
                            return false;
                        }
                        currentAutocompleteItem++;
                    } );
                    return;
                } else {
                    currentAutocompleteItem = 0;
                    lastSelectedAutocompleteItem = 0;
                    searchYoutubeAutocomplete( $( this ).val() );
                }
            } );

            $( '#clearMainSearchInput' ).click( function ( event ) {
                $( '#mainSearchInput' ).val( '' );
                $( '#mainSearchInput' ).focus();
                searchYoutubeAutocomplete( $( this ).val() );
            } );

            $( '#switchAudioSource' ).click( function ( event ) {
                if ( mainSearchResultYoutubePlayer.isMuted() || mainSearchResultYoutubePlayerState != 'playing' ) {
                    markYoutubeAsActiveAudioSource( true );
                    spotifyPause();
                    mainSearchResultYoutubePlayer.unMute();
                    mainSearchResultYoutubePlayer.playVideo();
                } else {
                    markYoutubeAsActiveAudioSource( false );
                    mainSearchResultYoutubePlayer.mute();
                    spotifyPlay();
                }
                if ( externalSoundTabOpened ) {
                    externalSoundTabOpened = false;
                    window.open( './tabCloser.html', 'externalSoundTab' );
                }
            } );

            $( '#showYoutubePlayedHistory' ).click( function ( event ) {
                var history = {'items': []};
                history['items'] = JSON.parse( localStorage.getItem( 'youtubeHistory' ) ) || [];
                displayYoutubeSearchResultsOrHistory( history );
                searchYoutubeAutocomplete( '' );
            } )

            $( '#clearYoutubePlayedHistory' ).click( function ( event ) {
                localStorage.setItem( 'youtubeHistory', JSON.stringify( '' ) );
                event.stopPropagation();
            } )

            $( document ).on( 'click', '.youtubeQueueItemDeleteSymbol', function ( e ) {
                removeIdFromYoutubeQueue( $( this ).closest( '.youtubeQueueItem' ).find( '.youtubeQueueItemImage' ).attr( 'id' ) );
                displayYoutubeQueue();
            } );

            $( document ).on( 'click', '.youtubeQueueItemImage,.youtubeQueueItemDescription', function () {
                var videoItem = {};
                videoItem.id = $( this ).closest( '.youtubeQueueItem' ).find( '.youtubeQueueItemImage' ).attr( 'id' );
                videoItem.description = $( this ).closest( '.youtubeQueueItem' ).find( '.youtubeQueueItemDescription' ).html();
                videoItem.img = $( this ).closest( '.youtubeQueueItem' ).find( '.youtubeQueueItemImage' ).attr( 'src' );
                videoItem.duration = $( this ).closest( '.youtubeQueueItem' ).find( '.youtubeItemDuration' ).html();
                playSpecificYoutubeVideo( videoItem );
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
                addVideoToHistory( videoToQueue );
                if ( mainSearchResultYoutubePlayerState == 'video cued' || mainSearchResultYoutubePlayerState == 'undefined' || mainSearchResultYoutubePlayerState == 'paused' ) {
                    playNextYoutubeVideoOrSpotifyTrack();
                }
                displayYoutubeQueue();
                enableFullscreen();
            } );

            function markYoutubeAsActiveAudioSource( youtubeIsActiveAudioSource = false ) {
                if ( youtubeIsActiveAudioSource ) {
                    $( '#mainYoutubePlayerActiveSoundBorder' ).addClass( 'colorfulBorder' );
                    mainYoutubePlayerIsActiveSoundSource = true;
                } else {
                    $( '#mainYoutubePlayerActiveSoundBorder' ).removeClass( 'colorfulBorder' );
                    mainYoutubePlayerIsActiveSoundSource = false;
                }
            }

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

            function searchYoutubeSpecificVideoId( videoId, increaseApiKey = false ) {
                if ( increaseApiKey ) {
                    youtubeApiKeyInUse += 1;
                    if ( youtubeApiKeyInUse > 10 ) {
                        return false;
                    }
                }

                var description = '';

                $.ajax( {
                    type   : 'GET',
                    async  : false,
                    url    : 'https://www.googleapis.com/youtube/v3/videos',
                    data   : {
                        key : config['youtubeApiKey' + youtubeApiKeyInUse],
                        id  : videoId,
                        part: 'snippet'
                    },
                    success: function ( searchYoutubeResult ) {
                        description = searchYoutubeResult.items[0].snippet.title;
                    },
                    error  : function ( response ) {
                        if ( response.responseJSON.error.errors[0].reason == 'quotaExceeded' ) {
                            searchYoutube( videoId, true );
                        }
                    }
                } );

                return description;
            }

            function getVideoDurationsFromYoutube( searchYoutubeResult ) {
                listOfVideoIds = [];
                index = 1;
                searchYoutubeResult.items.forEach( function ( item ) {
                    if ( index <= 50 ) {
                        listOfVideoIds.push( item.id.videoId );
                    }
                    index++;
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
                        displayYoutubeSearchResultsOrHistory( searchYoutubeResult, getVideoDurationsFromYoutubeResult );
                    },
                    error  : function ( response ) {
                        displayYoutubeSearchResultsOrHistory( searchYoutubeResult );
                    }
                } );
            }

            function searchYoutubeAutocomplete( searchTerm ) {
                $.ajax( {
                    type    : 'GET',
                    url     : 'https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=' + searchTerm,
                    dataType: 'jsonp',
                    success : function ( data ) {
                        displayYoutubeAutocompleteSuggestions( data );
                    },
                    error   : function ( data ) {
                    }
                } );
            }

            function displayYoutubeAutocompleteSuggestions( data ) {
                $( '#mainSearchAutocompleteSuggestions' ).empty();
                index = 1;
                data[1].forEach( function ( item ) {
                    if ( index <= 6 ) {
                        let youtubeAutocompleteItem = document.createElement( 'div' );
                        youtubeAutocompleteItem.classList.add( 'youtubeAutocompleteItem' );
                        youtubeAutocompleteItem.innerHTML = item[0];
                        document.getElementById( 'mainSearchAutocompleteSuggestions' ).appendChild( youtubeAutocompleteItem );
                        index++;
                    } else {
                        return false;
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
                        youtubeQueueItemContainer.classList.add( 'float-end' );
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

            function displayYoutubeSearchResultsOrHistory( searchYoutubeResult, getVideoDurationsFromYoutubeResult = '' ) {
                $( '#youtubeResults' ).empty();

                var tempDuplicateDump = {};
                searchYoutubeResult.items.forEach( function ( item ) {
                    if ( !tempDuplicateDump[item.id.videoId] || !tempDuplicateDump[item.id] ) {
                        tempDuplicateDump[item.id.videoId] = true;
                        tempDuplicateDump[item.id] = true;

                        let youtubeResult = document.createElement( 'span' );
                        youtubeResult.id = typeof item.id == 'string' ? item.id : item.id.videoId;
                        youtubeResult.classList.add( 'youtubeResult' );
                        document.getElementById( 'youtubeResults' ).appendChild( youtubeResult );

                        let youtubeResultItemImage = document.createElement( 'img' );
                        youtubeResultItemImage.src = typeof item.img !== 'undefined' ? item.img : item.snippet.thumbnails.high.url;
                        youtubeResultItemImage.classList.add( 'youtubeResultItemImage' );
                        youtubeResult.appendChild( youtubeResultItemImage );

                        let youtubeResultDescription = document.createElement( 'span' );
                        youtubeResultDescription.innerHTML = typeof item.description !== 'undefined' ? item.description : item.snippet.title;
                        youtubeResultDescription.classList.add( 'youtubeResultItemDescription' );
                        youtubeResult.appendChild( youtubeResultDescription );

                        if ( typeof item.duration !== 'undefined' ) {
                            duration = convertYoutubeTime( item.duration );
                            let videoDuration = document.createElement( 'span' );
                            videoDuration.innerHTML = duration;
                            videoDuration.classList.add( 'youtubeItemDuration' );
                            document.getElementById( item.id ).appendChild( videoDuration );
                        }
                    }
                } );

                if ( getVideoDurationsFromYoutubeResult != '' ) {
                    getVideoDurationsFromYoutubeResult.items.forEach( function ( item ) {
                        duration = convertYoutubeTime( item.contentDetails.duration );
                        let videoDuration = document.createElement( 'span' );
                        videoDuration.innerHTML = duration;
                        videoDuration.classList.add( 'youtubeItemDuration' );
                        if ( document.getElementById( item.id ) !== null ) {
                            document.getElementById( item.id ).appendChild( videoDuration );
                        }
                    } );
                }

                $( '#youtubeResults' ).animate( {scrollTop: 0}, 'fast' );
            }

            function playNextYoutubeVideoOrSpotifyTrack() {
                if ( youtubeCurrentQueue.length == 0 || externalSoundTabOpened ) {
                    spotifyHasBeenPlayingBeforePause = true;
                    markYoutubeAsActiveAudioSource( false );

                    try {
                        mainSearchResultYoutubePlayer.mute();
                    } catch ( e ) {
                    }

                    if ( spotifySongRadioQueue != '' ) {
                        spotifyPlay( spotifySongRadioQueue );
                        spotifySongRadioQueue = '';
                    } else if ( playingSpotifyTrack ) {
                        spotifyNext();
                    } else {
                        spotifyPlay();
                    }
                } else {
                    videoItem = youtubeCurrentQueue.shift();

                    if ( !mainSearchResultYoutubePlayer.isMuted() || mainYoutubePlayerIsActiveSoundSource ) {
                        markYoutubeAsActiveAudioSource( true );
                        spotifyPause();
                    }
                    mainSearchResultYoutubePlayer.loadVideoById( videoItem.id );
                    displayYoutubeQueue();
                }

                if ( externalSoundTabOpened ) {
                    externalSoundTabOpened = false;
                    window.open( './tabCloser.html', 'externalSoundTab' );
                }
            }

            function playSpecificYoutubeVideo( videoItem ) {
                if ( !mainSearchResultYoutubePlayer.isMuted() ) {
                    markYoutubeAsActiveAudioSource( true );
                    spotifyPause();
                }
                mainSearchResultYoutubePlayer.loadVideoById( videoItem.id );
                removeIdFromYoutubeQueue( videoItem.id );
                displayYoutubeQueue();
            }

            function removeIdFromYoutubeQueue( videoId ) {
                tempYoutubeCurrentQueue = [];
                var videoIdCount = 0;
                $.each( youtubeCurrentQueue, function ( key, value ) {
                    if ( value.id != videoId || videoIdCount > 0 ) {
                        tempYoutubeCurrentQueue.push( {
                            'id'         : value.id,
                            'img'        : value.img,
                            'description': value.description,
                            'duration'   : value.duration
                        } );
                    } else {
                        videoIdCount++;
                    }
                } );
                youtubeCurrentQueue = tempYoutubeCurrentQueue;
            }

            function convertYoutubeTime( duration ) {
                if ( duration == '0:00' || duration == 'stream' || duration == 'P0D' ) {
                    duration = 'stream';
                } else {
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
                }
                return duration;
            }

            function addVideoToHistory( videoItem ) {
                var youtubeHistory = {
                    'items': []
                };

                youtubeHistory['items'] = JSON.parse( localStorage.getItem( 'youtubeHistory' ) ) || [];
                youtubeHistory['items'].unshift( {
                    'id'         : videoItem.id,
                    'description': videoItem.description,
                    'img'        : videoItem.img,
                    'duration'   : videoItem.duration
                } );
                localStorage.setItem( 'youtubeHistory', JSON.stringify( youtubeHistory['items'] ) );
            }

            // END Search section
            // ******************************************


            // ******************************************
            // Videodrome section
            if ( config['localSettingsOverwrite'] != undefined && config['localSettingsOverwrite']['showVideodrome'] != undefined && config['localSettingsOverwrite']['showVideodrome'] ) {
                initVideodrome();
            } else {
                $( '#showVideodrome' ).remove();
                $( '.startVideoDrome' ).hide();
            }
            var moveTimerVideodrome;
            $( '.videodromeVideoContainer' ).on( 'mousemove', function () {
                clearTimeout( moveTimerVideodrome );
                moveTimerVideodrome = setTimeout( function () {
                    $( '.videodromeVideoContainer' ).css( 'cursor', 'none' );
                    $( '.videoMenuOverlay' ).hide();
                }, 1000 );
                $( '.videodromeVideoContainer' ).css( 'cursor', 'url(\'../assets/rainbow-gradient-pointer-32x32.png\'), auto' );
                $( '.videoMenuOverlay' ).show();
            } );

            $( '#showVideodrome,.startVideoDrome' ).click( function () {
                enableFullscreen();
                blockScreenSaver = true;
                $( '#videodrome' ).show();
                startPlaybackVideodrome();
                /*videodromePlayInterval = setInterval( startPlaybackVideodrome, 1000 );*/
            } );

            $( document ).on( 'click', '.videodromeVideoContainer', function ( event ) {
                $( this ).toggleClass( 'videodromeFullscreen' );
            } );

            $( '.videodromeVideoContainer' ).on( 'wheel', function ( event ) {
                event.preventDefault();
                if ( event.originalEvent.deltaY > 0 ) { // going down
                    $( this ).find( '.videoFrame' )[0].currentTime = $( this ).find( '.videoFrame' )[0].currentTime - 10;
                } else { // going up
                    $( this ).find( '.videoFrame' )[0].currentTime = $( this ).find( '.videoFrame' )[0].currentTime + 10;
                }
            } );

            $( '.videodromeRefreshVideo' ).click( function () {
                target = $( this ).attr( 'target' );

                $( '#videodromeContainer .videoFrame' ).each( function () {
                    $( this )[0].pause();
                } );

                $( '.' + target ).find( '.videoFrame' ).find( '.videoSource' ).attr( 'src', '' );
                $( '.' + target ).find( '.videoFrame' ).get( 0 ).load();

                videodromeVideoContainer = $( '.' + target );

                randomNumber = Math.floor( Math.random() * (parseInt( numberOfSelectableVideosVideodrome ) - parseInt( 0 )) + parseInt( 0 ) );
                while ( alreadySelectedVideosVideodrome.indexOf( randomNumber ) !== -1 ) {
                    randomNumber = Math.floor( Math.random() * (parseInt( numberOfSelectableVideosVideodrome ) - parseInt( 0 )) + parseInt( 0 ) );
                    if ( alreadySelectedVideosVideodrome.length == numberOfSelectableVideosVideodrome - 1 ) {
                        alreadySelectedVideosVideodrome = [];
                    }
                }
                alreadySelectedVideosVideodrome.push( randomNumber );

                counter = 0;
                $( '.videoContainer.XXX' ).each( function () {
                    if ( typeof $( this ).find( '.localVideo' ).find( '.videoSource' ).attr( 'src' ) != 'undefined' ) {
                        if ( randomNumber == counter ) {
                            $( '.' + target ).find( '.videoSource' ).attr( 'src', $( this ).find( '.videoSource' ).attr( 'src' ) );
                            $( '.' + target ).find( '.videoFrame' ).get( 0 ).load();
                        }
                        counter++;
                    }
                } );
                $( '#videodromeContainer .videoFrame' ).each( function () {
                    $( this )[0].play();
                } );
            } );

            function startPlaybackVideodrome() {
                $( '#videodromeContainer .videoFrame' ).each( function () {
                    $( this )[0].play();
                } );
            }

            function stopPlaybackVideodrome() {
                $( '#videodrome' ).hide();
                clearInterval( videodromePlayInterval );
                $( '#videodromeContainer .videoFrame' ).each( function () {
                    $( this )[0].pause();
                } );
            }

            function initVideodrome() {
                $( '.videoContainer.XXX' ).each( function () {
                    if ( typeof $( this ).find( '.localVideo' ).find( '.videoSource' ).attr( 'src' ) != 'undefined' ) {
                        numberOfSelectableVideosVideodrome++;
                    }
                } );

                var videosToShow = [];
                while ( videosToShow.length < 4 ) {
                    randomNumber = Math.floor( Math.random() * (parseInt( numberOfSelectableVideosVideodrome ) - parseInt( 0 )) + parseInt( 0 ) );
                    if ( videosToShow.indexOf( randomNumber ) == -1 ) {
                        videosToShow.push( randomNumber );
                    }
                }

                counter = 0;
                videodromeFrameCounter = 0;
                $( '.videoContainer.XXX' ).each( function () {
                    if ( typeof $( this ).find( '.localVideo' ).find( '.videoSource' ).attr( 'src' ) != 'undefined' ) {
                        if ( videosToShow.indexOf( counter ) > -1 ) {
                            videodromeFrameCounter++;
                            var videodromeVideoContainer = $( '<div>', {'class': 'videodromeVideoContainer videoDromeVideo' + videodromeFrameCounter} );
                            $( '#videodromeContainer' ).append( videodromeVideoContainer );
                            $( this ).find( '.localVideo' ).clone().appendTo( videodromeVideoContainer );
                        }
                        counter++;
                    }
                } );
            }

            // END Videodrome section
            // ******************************************


            // ******************************************
            // init initial view
            if ( urlParams.get( 'section' ) != undefined && urlParams.get( 'section' ) == 'shrine' ) {
                $( '#meditativefilter' ).trigger( 'click' );
                $( '#showShrineSection' ).trigger( 'click' );
                $( '#mainMenu' ).hide();
                $( '#shrineSettingsContainer' ).removeClass( 'visible' );
            } else {
                $( '#showVideoSection' ).trigger( 'click' );
                if ( urlParams.get( 'tab' ) != undefined ) {
                    $( '#' + urlParams.get( 'tab' ) + 'filter' ).trigger( 'click' );
                } else {
                    $( '#meditativefilter' ).trigger( 'click' );
                }
                showScreensaverEnso();
            }
        }
);