$( document ).ready( function () {
            // Index:
            // #0.0 - global init section
            // #0.1 - Global key bindings, Global misc functionalities
            // #0.2 - Main Menues
            // #0.3 - Start Menu & preFlightChecklist & Reminders
            // #0.4 - Hidden Section config
            // #1 - Video section
            // #2 - Image section
            // #3 - Shrine section
            // #4 - Game section
            // #5 - Music section
            // #6 - Search Youtube section
            // #7 - Videodrome section
            // #8 - Private Picture Slideshow section
            // #9 - Music Video Section
            // #15 - Mind Journey Section
            // #20 - initial init section

            // ***********************************
            // #0.0 - global init section
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
            window.populateTrackSelectionData = {};
            window.blockScreenSaver = false;
            window.moveTimerShrine = '';
            window.externalSoundTabOpened = false;
            window.pizzaTimerStart = '';
            window.isFullScreen = false;
            window.lastDisplayedImage = config['images'][0]['image'];
            window.minutesTillNextThought = 0;
            window.showParticles = false;
            window.activeParticlesConfig = 0;
            window.guidedThoughtsActive = true;
            window.allGuidedThoughts = [];
            window.guidedThoughtsNext = 0;
            window.guidedThoughtPrefilTarget = 1;
            window.activeTruthTagLabel = '';
            window.timer = '';
            window.imageSlideshowInterval = undefined;
            window.imageSlideshowIntervalLength = 1000;
            window.videodromePlayInterval = '';
            window.start = '';
            window.currentState = 'ignition';
            window.lastState = '';
            window.topUpReminderShown1 = false;
            window.topUpReminderShown2 = false;
            window.topUpReminderShown3 = false;
            window.orderPizzaReminderShown = false;
            window.pizzaTimerShown = false;
            window.imageSectionShown = false;
            window.gameSectionShown = false;
            window.totalMins = 0;
            window.veryFirstThoughtDisplayed = false;
            window.xxxVisible = false;
            window.externalPornDirs = {};
            window.externalPornFiles = [];
            window.externalPornFilesTemp = [];
            window.slideshowJustStarted = false;
            window.lastActiveBackgroundGradientKeyFrame = 1;
            window.textShrinkFrameSeed = 1;
            window.spotifyOpened = false;
            window.displayedAbsoluteTruthIndex = [];
            window.stroboSpeed = 0;
            window.preFlightCheckListAnimationTimer = undefined;
            window.absoluteTruthsTimer = undefined;
            window.absoluteTruthsTimerDuration = 20000;
            window.videoTagList = '';
            window.maxYoutubeSearchResults = 50;
            window.youtubeApiKeyInUse = 1;
            window.youtubeCurrentQueue = [];
            window.youtubeIntitalSearchTerm = 'goa festival';
            window.directYoutubePlayerLoaded = false;
            window.lastPlayedDirectYoutubePlayerId = '';
            window.lastPlayedDirectYoutubePlayerVideoIsKnowledge = false;
            window.lastSelectedAutocompleteItem = 0;
            window.currentAutocompleteItem = 0;
            window.allVideosLoaded = false;
            window.guidedThoughtsActiveOnLoadSettingApplied = true;
            window.videodromeFavorites = {'items': []};
            window.mainYoutubePlayerIsActiveSoundSource = false;
            window.screensaverSecondsIdle = 0;
            window.screensaverStartAfterSeconds = 15;
            window.screensaverActive = false;
            window.documentReady = false;
            window.searchEditClicked = false;
            window.selectableVideodromeFilesFromTagAndFolders = [];
            window.selectableVideodromeFilesFromFolders = [];
            window.selectableVideodromeFilesFromTags = [];
            window.alreadySelectedVideosVideodrome = [];
            window.alreadySelectedColorsDisco = [];
            window.shrineColorChangeTimer = '';
            window.shrineStroboChangeTimer = '';
            window.shrineDiscoActive = false;
            window.playingRandomVideoFromCategory = false;
            window.selectedVideoStreamService = 'XV';
            window.videodromeFullscreenMenuHideInterval = '';
            window.videodromeVideoJSControlbarHideInterval = '';
            window.videoJSHubUrls = [];
            window.videoJSSingleVideoUrls = [];
            window.activeVideoJSPlayer = 'videoJSPlayer1';
            window.allowedVideoFileExtensions = ['mkv', 'mp4', 'mov', 'm4v'];
            window.allowedImageFileExtensions = ['jpeg', 'jpg'];
            window.videoJSPlayer = '';
            window.activePageCrawls = 0;
            window.superShuffleModeActive = true;
            window.videodromeLoadMode = '1';
            window.videoJSLoadAfterFind = true;
            window.lastUsedVideoStreamSearchUrl = createSearchUrl();
            window.rightMouseButtonClickCounter = 0;
            window.mouseDisabled = false;
            window.mouseDisabledDuration = 20000;
            window.rightMouseButtonClickCounterInterval = '';
            window.mouseDisabledInterval = '';
            window.showVideostreamFavoriteItemDeleteSymbol = false;
            window.externalPrivatePictureDirs = {};
            window.getAllExternalPrivatePictureDirsThreadStarted = 0;
            window.getAllExternalPrivatePictureDirsThreadEnded = 0;
            window.alreadySelectedPrivatePictureDir = [];
            window.totalNumberOfPrivatePictureDirs = 0;
            window.privatePictureSlideshowInitiated = false;
            window.privatePictureDirContainer = {};
            window.privatePictureSlideshowTimer = '';
            window.privatePictureSlideshowImagesToShowPerFolder = 10;
            window.privatePictureSlideshowDurationPerImage = 8000;
            window.privatePictureSlideshowEnabled = false;
            window.privatePictureSlideshowNextDirActiveThread = false;
            window.externalMusicVideos = {};
            window.alreadySelectedMusicVideos = [];
            window.moveTimerMusicVideoOverlay = '';
            window.spotifyHistory = {'items': []};
            window.alreadySelectedMeditationSymbols = [];
            window.mindJourneyCharActive = '';
            window.mindJourneyCharNumberActive = '';
            window.videoTaggingCache = {'items': []};
            window.videodromeTaggingSaveInterval = '';
            window.videodromeTaggingAppliedTags = '';
            window.videodromeTaggingVideo = '';
            window.videodromeLoadModeRandom = false;
            window.mindJourneyIncantationNumberActive = 0;
            window.videoSeekFullscreenInterval = '';
            window.videoSeekFullscreenDuration = 1500;
            window.videoDromeDirectorInterval = '';
            window.videoDromeDirectorDurationMinDefault = 1500;
            window.videoDromeDirectorDurationMaxDefault = 25000;
            window.videoDromeDirectorDurationMin = videoDromeDirectorDurationMinDefault;
            window.videoDromeDirectorDurationMax = videoDromeDirectorDurationMaxDefault;
            window.videoDromeDirectorDuration = '';
            window.videoDromeDirectorModeActive = false;
            window.moveTimerVideodrome = '';
            window.videoDromeDirectorLastDisplayedTarget = '';
            window.directorModeTemporaryPause = false;
            window.directorModeTemporaryPauseInterval = '';

            window.videodromeLoadModeMapping = {
                '2': {
                    'videoDromeVideo1': 'videoDromeVideo4',
                    'videoDromeVideo2': 'videoDromeVideo3',
                    'videoDromeVideo3': 'videoDromeVideo2',
                    'videoDromeVideo4': 'videoDromeVideo1'
                },
                '3': {
                    'videoDromeVideo1': 'videoDromeVideo3',
                    'videoDromeVideo2': 'videoDromeVideo4',
                    'videoDromeVideo3': 'videoDromeVideo1',
                    'videoDromeVideo4': 'videoDromeVideo2'
                },
                '4': {
                    'videoDromeVideo1': 'videoDromeVideo2',
                    'videoDromeVideo2': 'videoDromeVideo1',
                    'videoDromeVideo3': 'videoDromeVideo4',
                    'videoDromeVideo4': 'videoDromeVideo3'
                }
            }

            spotifyHistory['items'] = JSON.parse( localStorage.getItem( 'spotifyHistory' ) ) || [];
            videoTaggingCache['items'] = JSON.parse( localStorage.getItem( 'videoTaggingCache' ) ) || [];

            const urlParams = new URLSearchParams( window.location.search );

            // Merge optionalConfig with global config
            if ( typeof optionalConfig !== 'undefined' ) {
                Object.assign( config, optionalConfig );
                if ( optionalConfig['imagesXXX'] != undefined ) {
                    config['images'] = config['images'].concat( optionalConfig['imagesXXX'] );
                }
                if ( optionalConfig['absoluteTruthsXXX'] != undefined ) {
                    config['absoluteTruths'] = config['absoluteTruths'].concat( optionalConfig['absoluteTruthsXXX'] );
                }
            }

            // Handlebar renderer and helper functions - takes combined config within config/config.js
            Handlebars.registerHelper( 'if', function ( v1, v2, options ) {
                if ( v1 === v2 ) {
                    return options.fn( this );
                }
                return options.inverse( this );
            } );

            $( 'body' ).html(
                    Handlebars.compile( $( '#mainTemplate' ).html() )( config )
            );

            // If a JS error is detected display a warning in place of the playlist selector
            window.onerror = function ( errorMessage, url, lineNumber ) {
                if ( config['localSettingsOverwrite'] != undefined && config['localSettingsOverwrite']['debugMode'] != undefined && config['localSettingsOverwrite']['debugMode'] ) {
                    $( '#spotifyPlaylists' ).html( 'JS error detected!' );
                    $( '#spotifyPlaylists' ).attr( 'id', 'errorDetectedMessage' );
                }
            };

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
                }
            };

            // Show app after some time even if loading is not complete
            setTimeout( function () {
                if ( !documentReady ) {
                    $( '.iFrameContainer ' ).delay( 200 ).fadeIn();
                    hideScreensaverEnso();
                }
            }, 1000 );

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
            } else {
                $( '.firefoxScrollbar' ).each( function () {
                    $( this ).removeClass( 'firefoxScrollbar' );
                } );
            }

            // The pornzapper is only available if CORS has been disabled in client browser and the client therefore can load content from pornhub
            $.ajax( {
                type   : 'GET',
                url    : 'https://www.pornhub.com',
                success: function () {
                    if ( config['localSettingsOverwrite'] != undefined && config['localSettingsOverwrite']['showPornZapperOnlyInPrivateMode'] != undefined && config['localSettingsOverwrite']['showPornZapperOnlyInPrivateMode'] ) {
                        if ( xxxVisible ) {
                            $( '#showPornZapper' ).show();
                        } else {
                            $( '#showPornZapper' ).hide();
                        }
                    } else {
                        $( '#showPornZapper' ).show();
                        initVideodrome();
                    }
                    $( '.enablePornContent' ).hide();
                },
                error  : function () {
                }
            } );

            // Show or hide some sections depending on local settings
            $( '#quickSelectGlobalMenuPlaylistSectionIcon' ).show();
            $( '#quickSelectGlobalMenuMindJourneySectionIcon' ).show();
            if ( config['localSettingsOverwrite'] != undefined && config['localSettingsOverwrite']['globalMenuIncantationSection'] != undefined && config['localSettingsOverwrite']['globalMenuIncantationSection'] ) {
                $( '#quickSelectGlobalMenuIncantationSectionIcon' ).show();
            }
            if ( config['relationships'] == undefined ) {
                $( '#toggleRelationships' ).remove();
                $( '#toggleRelationshipsWhite' ).remove();
            }

            // Save stream favorites to a downloadable text file
            $( '#saveStreamFavoritesToFile' ).click( function () {
                var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent( localStorage.getItem( 'videodromeFavorites' ) );
                var downloadAnchorNode = document.createElement( 'a' );
                downloadAnchorNode.setAttribute( 'href', dataStr );
                downloadAnchorNode.setAttribute( 'download', 'videodromeFavorites.txt' );
                document.body.appendChild( downloadAnchorNode );
                downloadAnchorNode.click();
                downloadAnchorNode.remove();
            } );

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
                specifiedFieldsOnly: true,
                allowEnterAccept   : false
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

            $( document ).on( 'click', '.keyboard-accept-button', function ( event ) {
                setTimeout( function () {
                    getNextVideoStreamUrl( true, createSearchUrl( $( '.searchInput' ).val() ) );
                }, 500 );

                if ( $( '.searchInput' ).val() != '' ) {
                    tmpCounter = 0;
                    $( '.lastSearchTerm' ).each( function () {
                        tmpCounter++;
                        if ( tmpCounter >= 3 ) {
                            $( this ).remove();
                        }
                    } );

                    newSearchTerm = $( '<div/>' ).addClass( 'lastSearchTerm' ).html( $( '.searchInput' ).val() );
                    $( '#videodromeFullscreenLastSearches' ).prepend( newSearchTerm );
                }
            } );

            $( document ).on( 'click', '.lastSearchTerm', function ( event ) {
                $( '.searchInput' ).val( $( this ).html() );
                getNextVideoStreamUrl( true, createSearchUrl( $( this ).html() ) );
            } );

            $( document ).on( 'keydown', function ( event ) {
                if ( event.keyCode === 13 && $( '.keyboard-accept-button' ).is( ':visible' ) ) {
                    $( '.keyboard-accept-button' ).trigger( 'click' );
                }
            } );

            // Init number spinner ('.input-group') - https://www.jqueryscript.net/form/Input-Spinner-Plugin-Bootstrap-4.html
            $( '#pizzaTimerMinutes' ).inputSpinner();

            // Init gradient background
            refreshGradientBackground();

            // Prefill guided thoughts
            if ( localStorage.getItem( 'guidedThought1' ) != '' && localStorage.getItem( 'guidedThought1' ) != null ) {
                allGuidedThoughts.push( localStorage.getItem( 'guidedThought1' ) );
            } else {
                localStorage.setItem( 'guidedThought1', '' );
            }
            if ( localStorage.getItem( 'guidedThought2' ) != '' && localStorage.getItem( 'guidedThought2' ) != null ) {
                allGuidedThoughts.push( localStorage.getItem( 'guidedThought2' ) );
            } else {
                localStorage.setItem( 'guidedThought2', '' );
            }
            if ( localStorage.getItem( 'guidedThought3' ) != '' && localStorage.getItem( 'guidedThought3' ) != null ) {
                allGuidedThoughts.push( localStorage.getItem( 'guidedThought3' ) );
            } else {
                localStorage.setItem( 'guidedThought3', '' );
            }

            function refreshGradientBackground() {
                lastActiveBackgroundGradientKeyFrame = (lastActiveBackgroundGradientKeyFrame + 1) % 2;

                /*https://cssgradient.io/*/

                multiple = new Multiple( {
                    selector  : '.sharedBackground',
                    background: 'linear-gradient(-45deg, rgba(245,255,115,1) 0%, rgba(155,255,107,1) 26%, rgba(72,205,255,1) 71%, rgba(144,107,255,1) 100%);background-size: 400% 400%;animation: backgroundgradient' + lastActiveBackgroundGradientKeyFrame + ' 10s ease infinite;'
                } );
            }

            // Init track progress bar
            $( '.trackProgress' ).hide();

            // ***********************************
            // #0.1 - Global key bindings, Global misc functionalities

            // Right click / right mouse button click config
            $( document ).bind( 'contextmenu', function ( e ) {
                e.preventDefault();
                e.stopPropagation();

                if ( mouseDisabled ) {
                    return;
                }

                rightMouseButtonClickCounter++;
                clearTimeout( rightMouseButtonClickCounterInterval );
                rightMouseButtonClickCounterInterval = setTimeout( function () {
                    rightMouseButtonClickCounter = 0;
                }, 1000 );

                // After clicking the right mouse button 5 times in sequence the mouse is deactivated for a certain time
                if ( rightMouseButtonClickCounter >= 5 ) {
                    disableMouseActions();
                    return;
                }

                // Stop current action or show playlist selection if nothing else is going on right now
                // e.which == 0 => this is the semi functional right button on an air mouse... This does not provide the correct target.
                if ( $( '.videodromeFullscreenTemp' )[0] ) {
                    $( '.videodromeFullscreenTemp' ).removeClass( 'videodromeFullscreenTemp' );
                    $( '.videoDromeFrame' ).removeAttr( 'controls' );
                } else if ( $( '.modal' ).is( ':visible' ) ) {
                    $( '.modal' ).modal( 'hide' );
                } else if ( $( '#videodrome' ).is( ':visible' ) && $( '#meditationSymbol' ).is( ':visible' ) ) {
                    $( '#meditationSymbol' ).hide();
                    $( '.meditationSymbolInfoContainer' ).hide();
                } else if ( $( '#videodrome' ).is( ':visible' ) && shrineDiscoActive ) {
                    stopShrineDisco();
                    $( '#meditationSymbol' ).hide();
                    $( '.meditationSymbolInfoContainer' ).hide();
                } else if ( ($( '#videodrome' ).is( ':visible' ) && $( '#quickSelectGlobalMenuContainer' ).hasClass( 'menuTransition' )) || $( '#videodromeLeftToolbar' ).is( ':visible' ) ) {
                    $( '#quickSelectGlobalMenuContainer' ).removeClass( 'menuTransition' );
                    $( '#videodromeGlobalActionContainer' ).css( 'opacity', '' );
                    $( '#videodromeGlobalActionContainer' ).css( 'z-index', '75' );
                    $( '#videodromeLeftToolbar' ).hide();
                } else if ( videoDromeDirectorModeActive ) {
                    stopDirectorMode();
                } else if ( $( '#showShrineSection' ).hasClass( 'mainSectionActive' ) && ($( '#quickSelectGlobalMenuContainer' ).hasClass( 'menuTransition' ) || $( '#quickTrackSelectionMenu' ).hasClass( 'menuTransition' )) ) {
                    $( '#quickSelectGlobalMenuContainer' ).removeClass( 'menuTransition' );
                    $( '#quickTrackSelectionMenu' ).removeClass( 'menuTransition' );
                    $( '#mainMenu' ).attr( 'style', 'opacity:0' );
                    $( '#shrineSettingsContainer' ).removeClass( 'visible' );
                } else if ( ($( e.target ).attr( 'id' ) != 'activateHiddenMenue' && $( e.target ).attr( 'type' ) != 'text' && !$( e.target ).parent().hasClass( 'videodromeFullscreen' ) && !$( '.videodromeFullscreenMenuContainer' ).is( ':visible' ) && !$( '#privatePictureSlideshow' ).is( ':visible' ) && !$( '#musicVideos' ).is( ':visible' )) || e.which == 0 ) {
                    if ( $( '#menuClose' ).prop( 'checked' ) ||
                            $( '#quickTrackSelectionMenu' ).hasClass( 'menuTransition' ) ||
                            $( '#applicationSettingsMenu' ).hasClass( 'menuTransition' ) ||
                            !$( '#shrine' ).hasClass( 'shrineColorfulBackground' ) ||
                            $( '#videodrome' ).is( ':visible' ) ||
                            $( '#notesOverlay' ).is( ':visible' ) ||
                            $( '.videoMenuOverlayFullscreen' ).is( ':visible' ) ||
                            $( '#preFlightChecklist' ).is( ':visible' ) ||
                            $( '.displayedFullscreenImage' ).is( ':visible' ) ||
                            $( '.keyboard-cancel-button' ).is( ':visible' ) ||
                            $( '#absoluteTruthsOverlay' ).is( ':visible' ) ||
                            $( '#relationships' ).is( ':visible' ) ||
                            $( '#OuijaYesNo' ).is( ':visible' ) ||
                            $( '#meditationSymbol' ).is( ':visible' ) ||
                            shrineDiscoActive ||
                            stroboSpeed > 0 ||
                            showParticles
                    ) {
                        stopAllActions();
                    } else {
                        $( '#quickSelectGlobalMenuContainer' ).toggleClass( 'menuTransition' );
                        $( '#quickSelectGlobalMenuContainer' ).animate( {scrollTop: 0}, 'fast' );

                        if ( $( '#quickSelectGlobalMenuContainer' ).hasClass( 'menuTransition' ) ) {
                            $( '#mainMenu' ).css( 'opacity', '1' );
                        }

                        stopAllActions( false );
                    }
                    return false;
                } else if ( $( e.target ).attr( 'type' ) == 'text' ) { // paste text into text field
                    navigator.clipboard.readText()
                    .then( text => {
                        $( e.target ).val( $( e.target ).val() + text );
                    } );
                    return false;
                } else if ( $( e.target ).parent().hasClass( 'videodromeFullscreen' ) || $( '.videodromeFullscreenMenuContainer' ).is( ':visible' ) ) {
                    if ( config['pornMap'] != undefined ) {
                        $( '.videoDromeFrame' ).removeAttr( 'controls' );
                        $( '.videodromeFullscreen' ).removeClass( 'videodromeFullscreen' );
                        $( '.videodromeFullscreenMenuContainer' ).hide();
                        $( '.videodromeFullscreenMenuContainer' ).css( 'opacity', '0' );
                        $( '.videodromeRefreshContainer' ).show();
                    } else {
                        stopAllActions();
                    }
                } else if ( $( '#privatePictureSlideshow' ).is( ':visible' ) ) {
                    stopPrivatePictureSlideshow();
                } else if ( $( '#musicVideos' ).is( ':visible' ) ) {
                    stopMusicVideos();
                } else { // block default right click behaviour
                    return false;
                }
            } );

            // Init airmouse and reassign some buttons
            // Right button for context menu is e.which == 0 -> is handled in contextmenu section
            document.onkeydown = function ( e ) {
                if ( !$( '#preFlightChecklist,.keyboard-input-field' ).is( ':visible' ) ) {
                    switch ( e.which ) {
                        case 37: // left
                            if ( !$( '#notesOverlay' ).is( ':visible' ) ) {
                                spotifyPause();
                                e.preventDefault();
                            }
                            break;
                        case 38: // up
                            if ( !$( '#notesOverlay' ).is( ':visible' ) ) {
                                $( '#startPrivatePictureSlideshow' ).trigger( 'click' );
                                e.preventDefault();
                            }
                            break;
                        case 39: // right
                            if ( !$( '#notesOverlay' ).is( ':visible' ) ) {
                                playNextYoutubeVideoOrSpotifyTrack();
                                e.preventDefault();
                            }
                            break;
                        case 40: // down
                            if ( !$( '#notesOverlay' ).is( ':visible' ) ) {
                                if ( !$( '#showShrineSection' ).hasClass( 'mainSectionActive' ) ) {
                                    $( '#showShrineSection' ).trigger( 'click' );
                                    $( '#mainMenu' ).attr( 'style', 'opacity:0' );
                                    $( '#shrineSettingsContainer' ).removeClass( 'visible' );
                                }
                                startDiscoMode();
                                nextDiscoMode();
                                e.preventDefault();
                            }
                            break;
                        default:
                            return;
                    }
                }
            };

            // Reset settings if user disengaged fullscreen via ESC or other means...
            document.addEventListener( 'fullscreenchange', escapeHandler, false );
            document.addEventListener( 'mozfullscreenchange', escapeHandler, false );
            document.addEventListener( 'MSFullscreenChange', escapeHandler, false );
            document.addEventListener( 'webkitfullscreenchange', escapeHandler, false );

            $( '#showApplicationSettings' ).click( function () {
                stopAllActions( true, false );

                $( '#videoTaggingCache' ).empty();
                videoTaggingCache['items'] = JSON.parse( localStorage.getItem( 'videoTaggingCache' ) ) || [];
                videoTaggingCache['items'].forEach( function ( videoTag ) {
                    $( '#videoTaggingCache' ).append( '<div class=\'videoTagEntry\'>' + videoTag + '</div>' );
                } );

                $( '#spotifyHistory' ).empty();
                spotifyHistory['items'] = JSON.parse( localStorage.getItem( 'spotifyHistory' ) ) || [];
                spotifyHistory['items'].forEach( function ( track ) {
                    $( '#spotifyHistory' ).append( '<div class=\'spotifyHistoryTrack\'>' + track + '</div>' );
                } );

                $( '#applicationSettingsMenu' ).addClass( 'menuTransition' );
                $( '#applicationSettingsMenu' ).animate( {scrollTop: 0}, 'fast' );
            } );

            $( document ).on( 'mouseover', '.iconAlternating', function () {
                $( this ).attr( 'src', $( this ).attr( 'src' ).replace( '.png', '_white.png' ) );
            } );

            $( document ).on( 'mouseout', '.iconAlternating', function () {
                if ( !$( this ).hasClass( 'loadModeIconActive' ) && !$( this ).hasClass( 'directorTimingIconActive' ) ) {
                    $( this ).attr( 'src', $( this ).attr( 'src' ).replace( '_white.png', '.png' ) );
                }
            } );

            // Disable all future reminders and guided thoughts
            $( '#disableAllReminders' ).click( function ( e ) {
                $( '.guidedThoughtsContainer' ).hide();

                localStorage.setItem( 'topupReminderInMinutes1', '' );
                localStorage.setItem( 'topupReminderInMinutes2', '' );
                localStorage.setItem( 'topupReminderInMinutes3', '' );
                localStorage.setItem( 'orderPizzaReminderInMinutes', '' );

                $( '#topupCheckbox1' ).prop( 'checked', false );
                $( '#topupCheckbox2' ).prop( 'checked', false );
                $( '#topupCheckbox3' ).prop( 'checked', false );
                $( '#orderPizzaCheckbox' ).prop( 'checked', false );

                guidedThoughtPrefilTarget = 1;

                displayedAbsoluteTruthIndex = [];
            } );

            // Toggle Fullscreen button
            $( '.toggleFullscreen' ).click( function ( event ) {
                toggleFullScreen( event );
            } );

            // Show notes overlay
            $( '#notesSymbol1,#notesSymbol2' ).click( function () {
                enableFullscreen();
                stopAllActions();
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

            $( '#clearAllHistoryAndCache' ).click( function ( event ) {
                localStorage.setItem( 'youtubeHistory', JSON.stringify( '' ) );
                localStorage.setItem( 'spotifyHistory', JSON.stringify( '' ) );
                localStorage.setItem( 'videoTaggingCache', JSON.stringify( '' ) );
                event.stopPropagation();
            } )

            // Set icon to white and make it no longer clickable until some other related icon is clicked
            function setIconActive( e, targetClass ) {
                $( '.' + targetClass ).each( function () {
                    $( this ).removeClass( targetClass );
                    $( this ).attr( 'src', $( this ).attr( 'src' ).replace( '_white.png', '.png' ) );
                } );

                if ( $( e.target ).attr( 'src' ).indexOf( '_white.png' ) <= 0 ) {
                    $( e.target ).attr( 'src', $( e.target ).attr( 'src' ).replace( '.png', '_white.png' ) );
                }
                $( e.target ).addClass( targetClass );
            }

            // Stops all and everything. Exits Videos, stops disco mode, resets to default etc.
            function stopAllActions( hidePlaylistSelection = true, hideQuickTrackSelection = true ) {
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

                $( '.displayedFullscreenImage' ).trigger( 'click' );

                $( '.iconAlternating' ).each( function () {
                    if ( !$( this ).hasClass( 'loadModeIconActive' ) && !$( this ).hasClass( 'directorTimingIconActive' ) ) {
                        $( this ).attr( 'src', $( this ).attr( 'src' ).replace( '_white.png', '.png' ) );
                    }
                } );

                blockScreenSaver = false;
                screensaverSecondsIdle = 0;
                stopShrineDisco();
                stopPlaybackVideodrome();
                hideMeditationSymbol();
                showVideostreamFavoriteItemDeleteSymbol = false;
                $( '.hideInBackground' ).removeClass( 'hideInBackground' );
                $( '.modal' ).modal( 'hide' );
                $( '.videostreamFavoriteItemDeleteSymbol' ).hide();
                $( '#unlockDeleteVideodromeFavorites' ).show();
                $( '#lockDeleteVideodromeFavorites' ).hide();
                $( '.modal' ).modal( 'hide' );
                $( '#notesOverlay' ).modal( 'hide' );
                $( '#directYoutubePlayer' ).hide();
                $( '.videoMenuOverlay' ).hide();
                $( '.localVideoOverlay' ).show();
                $( '.mainSearchResultVideoOverlay' ).show();
                $( '.videodromeFullscreen' ).removeClass( 'videodromeFullscreen' );
                $( '.videodromeFullscreenTemp' ).removeClass( 'videodromeFullscreenTemp' );
                $( '.videodromeFullscreenMenuContainer' ).hide();
                $( '.videodromeFullscreenMenuContainer' ).css( 'opacity', '0' );
                $( '#videodromeLeftToolbar' ).hide();
                $( '.videodromeRefreshContainer' ).show();
                $( '.video-js' ).addClass( 'vjs-user-inactive' );
                $( '.vjs-control-bar' ).css( 'display', 'none' );
                $( '.videoMenuOverlayFullscreen, .videoMenuOverlayFullscreen2' ).hide();
                $( '#absoluteTruthsOverlay' ).hide();
                $( '#relationships' ).hide();
                $( '#ensoImageShrineContainer' ).show();
                $( '#ensoImageShrineContainer' ).attr( 'style', 'opacity: 1.0' );
                $( '#OuijaYesNo' ).hide();
                $( '#meditationSymbol' ).hide();
                $( '.meditationSymbolInfoContainer' ).hide();
                if ( mainYoutubePlayerIsActiveSoundSource ) {
                    $( '#mainYoutubePlayerActiveSoundBorder' ).addClass( 'colorfulBorder' );
                }
                clearInterval( preFlightCheckListAnimationTimer );
                stopPrivatePictureSlideshow();
                stopMusicVideos();
                hideScreensaverEnso();
                stopScreensaver();

                $( '#particles-js' ).css( 'cursor', 'url(\'../assets/rainbow-gradient-cursor-1-32x32.png\'), auto' );

                if ( hidePlaylistSelection ) {
                    $( '#quickSelectGlobalMenuContainer' ).removeClass( 'menuTransition' );
                }
                if ( hideQuickTrackSelection ) {
                    $( '#quickTrackSelectionMenu' ).removeClass( 'menuTransition' );
                }
                $( '#applicationSettingsMenu' ).removeClass( 'menuTransition' );
            }

            function escapeHandler() {
                if ( !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement ) {
                    isFullScreen = false;
                    stopAllActions();
                    enableMouseActions();
                }
            }

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

            function disableMouseActions() {
                $( '#showShrineSection' ).trigger( 'click' );
                $( '#mainMenu' ).attr( 'style', 'opacity:0' );
                $( '#shrineSettingsContainer' ).removeClass( 'visible' );

                mouseDisabled = true;
                $( 'html' ).addClass( 'cursorDisabled' );

                clearInterval( mouseDisabledInterval );
                mouseDisabledInterval = setTimeout( function () {
                    enableMouseActions();
                }, mouseDisabledDuration );
            }

            function enableMouseActions() {
                mouseDisabled = false;
                $( 'html' ).removeClass( 'cursorDisabled' );
            }

            // ***********************************
            // #0.2 - Main Menues
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
                    loadImages();
                }
            } );
            $( '#showShrineSection' ).click( function () {
                $( '#videos' ).hide();
                $( '#images' ).hide();
                $( '#shrine' ).show();
                $( '#games' ).hide();
                $( '#search' ).hide();

                $( '#shrineSettingsContainer' ).addClass( 'visible' );
                $( '#mainMenu' ).attr( 'style', 'opacity:1' );

                if ( typeof absoluteTruthsTimer !== 'undefined' ) {
                    clearInterval( absoluteTruthsTimer );
                }
                absoluteTruthsTimer = setInterval( absoluteTruthsUpdate, absoluteTruthsTimerDuration );
                absoluteTruthsUpdate();
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
            $( '#showPornZapper' ).click( function () {
                $( '#showShrineSection' ).trigger( 'click' );
                $( '#ensoImageShrineContainer' ).hide();
                blockScreenSaver = true;
                $( '#videodrome' ).show();
                $( '#videodromeUI' ).show();

                if ( config['pornMap'] == undefined ) {
                    if ( $( '#videoJSPlayer1_html5_api' ).is( ':visible' ) ) {
                        $( '#videoJSPlayer1_html5_api' ).trigger( 'click' );
                    } else if ( $( '#videoJSPlayer2_html5_api' ).is( ':visible' ) ) {
                        $( '#videoJSPlayer2_html5_api' ).trigger( 'click' );
                    }
                }
                $( '.video-js' ).removeClass( 'vjs-user-active' );
                $( '.video-js' ).addClass( 'vjs-user-inactive' );
                $( '.vjs-control-bar' ).css( 'display', 'none' );
                destroyParticles();
                forcePlaybackVideodrome();
                videodromePlayInterval = setInterval( forcePlaybackVideodrome, 1000 );
            } );

            $( '.mainSectionBtn' ).click( function () {
                $( '.mainSectionActive' ).each( function () {
                    $( this ).toggleClass( 'mainSectionActive' );
                } );
                $( this ).toggleClass( 'mainSectionActive' );

                enableFullscreen();
                stopAllActions();
                hideScreensaverEnso();
                clearYoutubeQueue();
                refreshGradientBackground();
            } );

            $( '.menuItem' ).click( function () {
                closeRightMenu();
                $( '#applicationSettingsMenu' ).removeClass( 'menuTransition' );
            } );

            $( '#menuClose' ).click( function () {
                $( '#quickSelectGlobalMenuContainer' ).removeClass( 'menuTransition' );
                $( '#quickTrackSelectionMenu' ).removeClass( 'menuTransition' );
                $( '#applicationSettingsMenu' ).removeClass( 'menuTransition' );
                hideScreensaverEnso();
            } );

            $( document ).on( 'click', '.quickSelectGlobalMenuIcon', function () {
                enableFullscreen();
                $( '.quickSelectGlobalMenuSection' ).hide();
                $( '#' + $( this ).attr( 'data-target' ) ).show();
            } );

            function closeRightMenu() {
                $( '#menuClose' ).prop( 'checked', false );
            }

            // Main Menu END
            // ***********************************

            // ***********************************
            // #0.3 - Start Menu & preFlightChecklist & Reminders
            $( '#launchText' ).click( function ( e ) {
                enableFullscreen();
                stopAllActions();

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
                if ( $( '#topupCheckbox3' ).is( ':checked' ) ) {
                    localStorage.setItem( 'topupReminderInMinutes3', $( '#topupReminderInMinutes3' ).val() );
                } else {
                    localStorage.setItem( 'topupReminderInMinutes3', '' );
                }
                if ( $( '#orderPizzaCheckbox' ).is( ':checked' ) ) {
                    localStorage.setItem( 'orderPizzaReminderInMinutes', $( '#orderPizzaReminderInMinutes' ).val() );
                } else {
                    localStorage.setItem( 'orderPizzaReminderInMinutes', '' );
                }

                if ( !allVideosLoaded ) {
                    loadVideos();
                }

                if ( !imageSectionShown ) {
                    loadImages();
                }

                preFlightCheckListAnimationTimer = setInterval( preFlightCheckListAnimation, 1500 );
                preFlightCheckListAnimation();
            } );

            // Lift off button - initialize a lot of stuff
            $( '.liftOff' ).click( function ( e ) {
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
                } else if ( $( this ).attr( 'id' ) == 'weedOnlyLiftOff' ) {
                    $( '#timerMinutes' ).addClass( 'timerMinutesWeedOnly' );
                    $( '#shroomsPlusWeedProgressGraph' ).remove();
                } else {
                    $( '#progressGraphContainer' ).empty();
                }

                displayedAbsoluteTruthIndex = [];

                minutesTillNextThought = randomIntFromInterval( localStorage.getItem( 'guidedThoughtMinMinutes' ), localStorage.getItem( 'guidedThoughtMaxMinutes' ) );

                $( '#preFlightChecklist' ).modal( 'hide' );

                $( '.menuvisibleAfterStarted' ).show();

                // after liftoff the screensaver takes longer to start
                screensaverStartAfterSeconds = 300;

                // Default view changes once journey started
                $( '#quickSelectGlobalMenuMindJourneySectionIcon' ).trigger( 'click' );
                $( '#shamanfilter.imageFilterBtn' ).trigger( 'click' );
            } );

            $( '#preFlightChecklist' ).on( 'hidden.bs.modal', function () {
                clearInterval( preFlightCheckListAnimationTimer );
                while ( allGuidedThoughts.length ) {
                    allGuidedThoughts.pop();
                }
                displayedAbsoluteTruthIndex = [];

                if ( localStorage.getItem( 'guidedThought1' ) != '' ) {
                    allGuidedThoughts.push( localStorage.getItem( 'guidedThought1' ) );
                }
                if ( localStorage.getItem( 'guidedThought2' ) != '' ) {
                    allGuidedThoughts.push( localStorage.getItem( 'guidedThought2' ) );
                }
                if ( localStorage.getItem( 'guidedThought3' ) != '' ) {
                    allGuidedThoughts.push( localStorage.getItem( 'guidedThought3' ) );
                }
            } )

            // Show Menu to update Start settings
            $( '#timerMinutes,#progressGraphContainer' ).click( function ( event ) {
                $( '#preFlightChecklistFooter' ).hide();
                $( '#preFlightChecklist' ).modal( 'show' );
                $( '.checkListItemHighlighted' ).each( function () {
                    $( this ).removeClass( 'checkListItemHighlighted' );
                } );
            } );

            $( '#timedRecommendation' ).click( function ( event ) {
                $( '#timedRecommendation' ).modal( 'hide' );
            } );

            // Top up Reminder Config
            $( '#topupCheckbox1' ).change( function () {
                topUpReminderShown1 = false;
                if ( $( '#topupCheckbox1' ).is( ':checked' ) ) {
                    localStorage.setItem( 'topupReminderInMinutes1', $( '#topupReminderInMinutes1' ).val() );
                } else {
                    localStorage.setItem( 'topupReminderInMinutes1', '' );
                }
            } );
            $( '#topupCheckbox2' ).change( function () {
                topUpReminderShown2 = false;
                if ( $( '#topupCheckbox2' ).is( ':checked' ) ) {
                    localStorage.setItem( 'topupReminderInMinutes2', $( '#topupReminderInMinutes2' ).val() );
                } else {
                    localStorage.setItem( 'topupReminderInMinutes2', '' );
                }
            } );
            $( '#topupCheckbox3' ).change( function () {
                topUpReminderShown3 = false;
                if ( $( '#topupCheckbox3' ).is( ':checked' ) ) {
                    localStorage.setItem( 'topupReminderInMinutes3', $( '#topupReminderInMinutes3' ).val() );
                } else {
                    localStorage.setItem( 'topupReminderInMinutes3', '' );
                }
            } );
            $( '#orderPizzaCheckbox' ).change( function () {
                orderPizzaReminderShown = false;
                if ( $( '#orderPizzaCheckbox' ).is( ':checked' ) ) {
                    localStorage.setItem( 'orderPizzaReminderInMinutes', $( '#orderPizzaReminderInMinutes' ).val() );
                } else {
                    localStorage.setItem( 'orderPizzaReminderInMinutes', '' );
                }
            } );

            $( '#topupReminderInMinutes1' ).change( function () {
                if ( totalMins < $( '#topupReminderInMinutes1' ).val() ) {
                    topUpReminderShown1 = false;
                    $( '#topupCheckbox1' ).prop( 'checked', true );
                    localStorage.setItem( 'topupReminderInMinutes1', $( '#topupReminderInMinutes1' ).val() );
                } else {
                    $( '#topupCheckbox1' ).prop( 'checked', false );
                    localStorage.setItem( 'topupReminderInMinutes1', '' );
                }
            } );
            $( '#topupReminderInMinutes2' ).change( function () {
                if ( totalMins < $( '#topupReminderInMinutes2' ).val() ) {
                    topUpReminderShown2 = false;
                    $( '#topupCheckbox2' ).prop( 'checked', true );
                    localStorage.setItem( 'topupReminderInMinutes2', $( '#topupReminderInMinutes2' ).val() );
                } else {
                    $( '#topupCheckbox2' ).prop( 'checked', false );
                    localStorage.setItem( 'topupReminderInMinutes2', '' );
                }
            } );
            $( '#topupReminderInMinutes3' ).change( function () {
                if ( totalMins < $( '#topupReminderInMinutes3' ).val() ) {
                    topUpReminderShown3 = false;
                    $( '#topupCheckbox3' ).prop( 'checked', true );
                    localStorage.setItem( 'topupReminderInMinutes3', $( '#topupReminderInMinutes3' ).val() );
                } else {
                    $( '#topupCheckbox3' ).prop( 'checked', false );
                    localStorage.setItem( 'topupReminderInMinutes3', '' );
                }
            } );
            $( '#orderPizzaReminderInMinutes' ).change( function () {
                if ( totalMins < $( '#orderPizzaReminderInMinutes' ).val() ) {
                    orderPizzaReminderShown = false;
                    $( '#orderPizzaCheckbox' ).prop( 'checked', true );
                    localStorage.setItem( 'orderPizzaReminderInMinutes', $( '#orderPizzaReminderInMinutes' ).val() );
                } else {
                    $( '#orderPizzaCheckbox' ).prop( 'checked', false );
                    localStorage.setItem( 'orderPizzaReminderInMinutes', '' );
                }
            } );

            // Guided Thoughts Config
            $( '#guidedThought1' ).val( localStorage.getItem( 'guidedThought1' ) );
            $( '#guidedThought2' ).val( localStorage.getItem( 'guidedThought2' ) );
            $( '#guidedThought3' ).val( localStorage.getItem( 'guidedThought3' ) );

            localStorage.setItem( 'guidedThoughtMinMinutes', $( '#guidedThoughtMinMinutes' ).val() );
            localStorage.setItem( 'guidedThoughtMaxMinutes', $( '#guidedThoughtMaxMinutes' ).val() );
            localStorage.setItem( 'firstGuidedThoughtMin', 999999 );
            $( '.guidedThoughtsContainer' ).click( function () {
                $( '.guidedThoughtsContainer' ).hide();
            } );

            $( '.guidedThoughtsTextInput' ).on( 'keyup', function ( event ) {
                localStorage.setItem( $( this ).attr( 'id' ), jQuery.trim( $( this ).val() ) );
            } );

            $( '.guidedThoughtMinutes' ).change( function () {
                localStorage.setItem( $( this ).attr( 'id' ), jQuery.trim( $( this ).val() ) );
                minutesTillNextThought = randomIntFromInterval( localStorage.getItem( 'guidedThoughtMinMinutes' ), localStorage.getItem( 'guidedThoughtMaxMinutes' ) );
            } );

            $( '#guidedThoughtsShrineSectionOnly' ).change( function () {
                $( '#guidedThoughtTimingContainer' ).toggle();
                if ( $( '#guidedThoughtTimingContainer' ).is( ':visible' ) ) {
                    if ( totalMins > 0 ) {
                        $( '#firstGuidedThoughtMin' ).val( totalMins );
                    }
                    localStorage.setItem( 'firstGuidedThoughtMin', jQuery.trim( $( '#firstGuidedThoughtMin' ).val() ) );
                } else {
                    localStorage.setItem( 'firstGuidedThoughtMin', 999999 );
                }
            } );

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
                $( '#guidedThought2' ).val( '' );
                $( '#guidedThought3' ).val( '' );
                localStorage.setItem( 'guidedThought1', '' );
                localStorage.setItem( 'guidedThought2', '' );
                localStorage.setItem( 'guidedThought3', '' );
                guidedThoughtPrefilTarget = 1;

                while ( allGuidedThoughts.length ) {
                    allGuidedThoughts.pop();
                }
                displayedAbsoluteTruthIndex = [];
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

            $( ':input[type="number"]' ).bind( 'mousewheel', function ( event ) {
                event.preventDefault();
                event.stopPropagation();
                if ( event.originalEvent.deltaY > 0 ) { // going down
                    if ( parseInt( $( this ).val() ) > $( this ).attr( 'min' ) ) {
                        $( this ).val( parseInt( $( this ).val() ) - 1 );
                    }
                } else { // going up
                    if ( parseInt( $( this ).val() ) < $( this ).attr( 'max' ) ) {
                        $( this ).val( parseInt( $( this ).val() ) + 1 );
                    }
                }
                $( this ).trigger( 'change' );
                return false;
            } );

            $( '#timerMinutes' ).bind( 'mousewheel', function ( event ) {
                if ( event.originalEvent.deltaY > 0 ) { // going down
                    offset = -1;
                } else { // going up
                    offset = +1;
                }

                startWithOffset = start.getTime() - offset * 1000 * 60; // Offset in minutes;
                if ( startWithOffset < new Date() ) {
                    start.setTime( startWithOffset );
                }
                tripTimer();
                return false;
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
                    $( '#pizzaTimerContainer' ).trigger( 'click' );
                }
            }

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
                    $( '#topupCheckbox1' ).prop( 'checked', false );
                    showTimedRecommendation( '??? Top up Shrooms ???' );
                }
                if ( localStorage.getItem( 'topupReminderInMinutes2' ) > 0 && totalMins >= parseInt( localStorage.getItem( 'topupReminderInMinutes2' ) ) && topUpReminderShown2 == false ) {
                    topUpReminderShown2 = true;
                    $( '#topupCheckbox2' ).prop( 'checked', false );
                    showTimedRecommendation( '??? Take Weed ???' );
                }
                if ( localStorage.getItem( 'topupReminderInMinutes3' ) > 0 && totalMins >= parseInt( localStorage.getItem( 'topupReminderInMinutes3' ) ) && topUpReminderShown3 == false ) {
                    topUpReminderShown3 = true;
                    $( '#topupCheckbox3' ).prop( 'checked', false );
                    showTimedRecommendation( '??? Take Weed ???' );
                }
                // Reminder Display - Order Pizza
                if ( localStorage.getItem( 'orderPizzaReminderInMinutes' ) > 0 && totalMins >= parseInt( localStorage.getItem( 'orderPizzaReminderInMinutes' ) ) && orderPizzaReminderShown == false ) {
                    orderPizzaReminderShown = true;
                    $( '#orderPizzaCheckbox' ).prop( 'checked', false );
                    showTimedRecommendation( 'Order Pizza!' );
                }

                // Guided Thoughts
                if ( (!$( '#showShrineSection' ).hasClass( 'mainSectionActive' ) && allGuidedThoughts[guidedThoughtsNext] != undefined && ((totalMins == minutesTillNextThought + parseInt( localStorage.getItem( 'firstGuidedThoughtMin' ) )) || (totalMins == parseInt( localStorage.getItem( 'firstGuidedThoughtMin' ) ) && veryFirstThoughtDisplayed != true))) ) {
                    veryFirstThoughtDisplayed = true;
                    localStorage.setItem( 'firstGuidedThoughtMin', totalMins );
                    minutesTillNextThought = randomIntFromInterval( localStorage.getItem( 'guidedThoughtMinMinutes' ), localStorage.getItem( 'guidedThoughtMaxMinutes' ) );
                    $( '.guidedThoughtsText' ).html( allGuidedThoughts[guidedThoughtsNext] );
                    $( '.guidedThoughtsContainer' ).show();
                    $( '.guidedThoughtsContainer' ).delay( 15000 ).fadeOut( 'slow' );
                    guidedThoughtsNext += 1;
                    guidedThoughtsNext = guidedThoughtsNext % allGuidedThoughts.length;
                }
            }

            function showTimedRecommendation( recommendationText ) {
                $( '#timedRecommendation' ).modal( 'show' );
                $( '#topupRecommendation' ).html( recommendationText );
                $( '#topupRecommendation' ).show();
            }

            function randomIntFromInterval( min, max, exlusionList = [] ) {
                selectedValue = Math.floor( Math.random() * (parseInt( max ) - parseInt( min ) + 1) + parseInt( min ) );
                if ( jQuery.inArray( selectedValue, exlusionList ) !== -1 ) {
                    randomIntFromInterval( min, max, exlusionList );
                }
                return selectedValue;
            }

            function updateprogressGraphColor( color ) {
                $( '.activeprogressGraphElement' ).each( function () {
                    newStyle = $( this ).attr( 'style' ).replace( /;--color:.*/, '' );
                    $( this ).attr( 'style', newStyle + ';--color: ' + color );
                } );
            }

            // Start button & preFlightChecklist & Reminders End
            // ***********************************

            // ***********************************
            // #0.4 - Hidden Section config

            // Enable hidden section - pretty much for very private stuff only. Needs to be explicitly enabled via config first.
            var rightMouseClicked = false;
            $( '#activateHiddenMenue' ).mousedown( function ( event ) {
                switch ( event.which ) {
                    case 1:
                        if ( rightMouseClicked ) {
                            enableFullscreen();
                            rightMouseClicked = false;
                            if ( config['localSettingsOverwrite'] != undefined && config['localSettingsOverwrite']['allowActivationOfHiddenMenu'] != undefined && config['localSettingsOverwrite']['allowActivationOfHiddenMenu'] ) {
                                toggleXXXVisible();
                            }
                        } else {
                            toggleFullScreen( event );
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

            $( '#activateHiddenMenue' ).on( 'mousemove', function () {
                clearTimeout( moveTimerShrine );
                moveTimerShrine = setTimeout( function () {
                    $( '#activateHiddenMenue' ).css( 'cursor', 'none' );
                }, 1000 );
                $( '#activateHiddenMenue' ).css( 'cursor', 'url(\'../assets/rainbow-gradient-cursor-1-32x32.png\'), auto' );
            } );

            function toggleXXXVisible() {
                xxxVisible = !xxxVisible;

                if ( xxxVisible ) {
                    $( '.XXX' ).show();
                    $( '#showPornZapper' ).show();
                    $( '#spotifyIcon' ).attr( 'src', './assets/spotifyDevil.png' );
                    initVideodrome();
                } else {
                    $( '#deselectAllVideodromeTags' ).trigger( 'click' );
                    $( '.XXX' ).hide();
                    $( '#showPornZapper' ).hide();
                    $( '#spotifyIcon' ).attr( 'src', './assets/spotify.png' );
                    getAllExternalPornDirs( config['externalRootDirs']['pornRootDir'] );
                }

                if ( videoTagList == '' ) {
                    $( '.videoContainer' ).each( function () {
                        $( this ).hide();
                    } );
                } else {
                    $( '.videoFilterBtn.videoFilterActive' ).each( function () {
                        $( this ).trigger( 'click' );
                    } );
                }

                $( '.imageFilterBtn' ).each( function () {
                    $( this ).trigger( 'click' );
                    return false;
                } );

                stopAllActions();
                displayedAbsoluteTruthIndex = [];
                absoluteTruthsUpdate();
            }

            // Hidden Section End
            // ***********************************

            // ***********************************
            // #1 - Video section
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
                        if ( !lastPlayedDirectYoutubePlayerVideoIsKnowledge ) {
                            directYoutubePlayer.playVideo(); // normal videos are repeated
                        } else {
                            stopAllActions(); // Wisdom videos are stopped at the end and we change to the screensaver
                            startScreensaver( true );
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

            // Add videos from the clicked category to queue at random and starts playing
            $( '.videoFilterBtn' ).dblclick( function ( e ) {
                playAllVideosFromCategory( $( this ).attr( 'id' ).replace( 'filter', '' ) );
            } );

            // Double clicking videos main button queues all videos and starts playing
            $( '#showVideoSection' ).dblclick( function ( e ) {
                playAllVideosFromCategory();
            } );

            // Play clicked youtube video and place a colorful border on preview image
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

            $( '.videoHasSoundYoutube' ).click( function ( event ) {
                playYoutubeVideo( $( this ).closest( '.iFrameContainer' ).find( '.youtubeVideo ' ), true );
            } );

            function playAllVideosFromCategory( category = '' ) {
                playingRandomVideoFromCategory = true;
                $( '#showSearchSection' ).trigger( 'click' );

                var allSelectedVideoIds = [];

                if ( category != '' ) {
                    $( '.videoContainer.' + category ).each( function () {
                        allSelectedVideoIds.push( $( this ).find( '.videoSource' ).attr( 'videoid' ) );
                    } );
                } else {
                    $( '.videoContainer' ).each( function () {
                        allSelectedVideoIds.push( $( this ).find( '.videoSource' ).attr( 'videoid' ) );
                    } );
                }

                shuffleArray( allSelectedVideoIds );

                youtubeCurrentQueue = [];
                videosInQueue = 0;
                allSelectedVideoIds.forEach( function ( videoId ) {
                    if ( videoId != undefined ) {
                        videoToQueue = {
                            'id'         : videoId,
                            'img'        : 'https://img.youtube.com/vi/' + videoId + '/0.jpg',
                            'description': '',
                            'duration'   : ''
                        };
                        youtubeCurrentQueue.push( videoToQueue );
                        videosInQueue++;
                    }
                } );

                $( '.mainSearchResultVideoOverlay' ).trigger( 'click' );
                videoItem = youtubeCurrentQueue.shift();
                mainSearchResultYoutubePlayer.loadVideoById( videoItem.id );

                if ( ['thinker', 'wisdom', 'shaman'].indexOf( category ) > -1 ) {
                    spotifyPause();
                    markYoutubeAsActiveAudioSource( true );
                    mainSearchResultYoutubePlayer.unMute();
                    mainSearchResultYoutubePlayer.setVolume( 100 );
                } else {
                    markYoutubeAsActiveAudioSource( false );
                    mainSearchResultYoutubePlayer.mute();
                }

                mainSearchResultYoutubePlayer.playVideo();
                displayYoutubeQueue();
            }

            function clearYoutubeQueue() {
                youtubeCurrentQueue = [];
                try {
                    mainSearchResultYoutubePlayer.pauseVideo();
                } catch ( e ) {
                }
                displayYoutubeQueue();
            }

            function loadVideos() {
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

            function loadImages() {
                $( '.fullscreenImage' ).each( function () {
                    $( this ).attr( 'src', $( this ).attr( 'src' ).replace( /NOLOAD/, '' ) );
                } );

                $( '.imageFilterBtn' ).each( function () {
                    $( this ).trigger( 'click' );
                    return false;
                } );
                imageSectionShown = true;
            }

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

                    if ( lastPlayedDirectYoutubePlayerId != $( clickedElement ).attr( 'videoId' ) || lastPlayedDirectYoutubePlayerVideoIsKnowledge ) {
                        directYoutubePlayer.loadVideoById( $( clickedElement ).attr( 'videoId' ), startSeconds );
                    }
                    lastPlayedDirectYoutubePlayerId = $( clickedElement ).attr( 'videoId' );

                    if ( $( clickedElement ).closest( '.videoContainer' ).is( '.thinker,.wisdom,.shaman' ) ) {
                        lastPlayedDirectYoutubePlayerVideoIsKnowledge = true;
                    } else {
                        lastPlayedDirectYoutubePlayerVideoIsKnowledge = false;
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

            // Play local video
            $( document ).on( 'click', '.localVideoOverlay', function ( event ) {
                blockScreenSaver = true;
                enableFullscreen();
                $( this ).closest( '.iFrameContainer' ).addClass( 'videoContainerFullscreen' );

                try {
                    $( this ).closest( '.iFrameContainer' ).find( '.localVideo' )[0].play();
                    $( this ).closest( '.iFrameContainer' ).find( '.localVideo' )[0].muted = true;
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

            $( '.videoHasSoundLocal' ).click( function ( event ) {
                $( this ).next( '.iFrameContainer' ).find( '.localVideoOverlay' ).trigger( 'click' );
                $( this ).next( '.iFrameContainer' ).find( '.localVideo' )[0].muted = false;
            } );

            $( document ).on( 'wheel', '.videoMenuOverlayFullscreen, .videoMenuOverlayFullscreen2', function ( event ) {
                event.preventDefault();
                if ( $( this ).closest( '.iFrameContainer' ).find( '.videoFrame' )[0] != undefined ) { // local videos
                    if ( event.originalEvent.deltaY > 0 ) { // going down
                        $( this ).closest( '.iFrameContainer' ).find( '.videoFrame' )[0].currentTime = $( this ).closest( '.iFrameContainer' ).find( '.videoFrame' )[0].currentTime - 30;
                    } else { // going up
                        $( this ).closest( '.iFrameContainer' ).find( '.videoFrame' )[0].currentTime = $( this ).closest( '.iFrameContainer' ).find( '.videoFrame' )[0].currentTime + 30;
                    }
                }
                if ( $( '#directYoutubePlayer' ).is( ':visible' ) ) { // youtube direct player
                    if ( event.originalEvent.deltaY > 0 ) { // going down
                        directYoutubePlayer.seekTo( directYoutubePlayer.getCurrentTime() - 30 );
                    } else { // going up
                        directYoutubePlayer.seekTo( directYoutubePlayer.getCurrentTime() + 30 );
                    }
                }
                if ( $( '#mainSearchResultYoutubeIframe' ).is( ':visible' ) ) { // youtube search player
                    if ( event.originalEvent.deltaY > 0 ) { // going down
                        mainSearchResultYoutubePlayer.seekTo( mainSearchResultYoutubePlayer.getCurrentTime() - 30 );
                    } else { // going up
                        mainSearchResultYoutubePlayer.seekTo( mainSearchResultYoutubePlayer.getCurrentTime() + 30 );
                    }
                }
            } );

            // mainSearchResultYoutube Video fullscreen overlay
            $( '.mainSearchResultVideoOverlay' ).click( function ( event ) {
                blockScreenSaver = true;
                enableFullscreen();
                mainSearchResultYoutubePlayer.playVideo();
                $( this ).closest( '#mainSearchResultYoutubeContainer' ).addClass( 'videoContainerFullscreen' );

                $( '.mainSearchResultVideoOverlay' ).hide();
                $( '.videoMenuOverlayFullscreen, .videoMenuOverlayFullscreen2' ).show();
                $( '#mainYoutubePlayerActiveSoundBorder' ).removeClass( 'colorfulBorder' );
            } );

            $( document ).on( 'click', '.videoMenuOverlayFullscreen, .videoMenuOverlayFullscreen2', function () {
                stopAllActions();
            } );

            // Show cursor when moving mouse
            var moveTimerFullscreenVideoOverlay;
            $( document ).on( 'mousemove', '.videoMenuOverlayFullscreen, .videoMenuOverlayFullscreen2,#videoJSPlayer1_html5_api,#videoJSPlayer2_html5_api', function () {
                clearTimeout( moveTimerFullscreenVideoOverlay );
                moveTimerFullscreenVideoOverlay = setTimeout( function () {
                    $( '.videoMenuOverlayFullscreen' ).css( 'cursor', 'none' );
                    $( '.videoMenuOverlay' ).hide();
                }, 1000 );
                $( '.videoMenuOverlayFullscreen' ).css( 'cursor', 'url(\'../assets/rainbow-gradient-pointer-32x32.png\'), auto' );
                $( '.videoMenuOverlay' ).show();
            } );

            // screensaver
            function startScreensaver( force = false ) {
                screensaverSecondsIdle++;
                $( '.mainSectionActive' ).each( function () {
                    if ( $( this ).attr( 'data-target' ) == 'videos' || $( this ).attr( 'data-target' ) == 'images' ) {
                        if ( !$( '#quickSelectGlobalMenuContainer' ).hasClass( 'menuTransition' ) &&
                                !$( '#quickTrackSelectionMenu' ).hasClass( 'menuTransition' ) &&
                                !$( '#applicationSettingsMenu' ).hasClass( 'menuTransition' ) &&
                                (screensaverSecondsIdle >= screensaverStartAfterSeconds || force) &&
                                !screensaverActive && !blockScreenSaver &&
                                !$( '#menuClose' ).prop( 'checked' ) ) {
                            screensaverActive = true;
                            showScreensaverEnso();
                            $( 'body,#menu,.videoSource,.fullscreenImage,#switchDesktopPhone,.youtubeVideo,.spotifyPlaylistItem,#spotifyPlaylists,#launchSymbol,#fullscreenIcon,#burgerContainer,.mainSectionBtn,#menuClose,.videoFilterBtn,.playerIcon,#menu,#devices' ).each( function () {
                                $( this ).addClass( 'cursorNone' );
                            } );
                            $( '#quickSelectGlobalMenuContainer' ).addClass( 'invisible' );
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
                    $( 'body,#menu,.videoSource,.fullscreenImage,#switchDesktopPhone,.youtubeVideo,.spotifyPlaylistItem,#spotifyPlaylists,#launchSymbol,#fullscreenIcon,#burgerContainer,.mainSectionBtn,#menuClose,.videoFilterBtn,.playerIcon,#menu,#devices' ).each( function () {
                        $( this ).removeClass( 'cursorNone' );
                    } );
                    $( '#quickSelectGlobalMenuContainer' ).removeClass( 'invisible' );
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
            // #2 - Image section
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
                lastDisplayedImage = $( this ).attr( 'src' );
                enableFullscreen();
                blockScreenSaver = true;
            } );

            // Show timer in image when moving mouse
            var moveTimerFullscreenSlideshow;
            $( document ).on( 'mousemove', '.displayedFullscreenImage', function () {
                if ( !slideshowJustStarted ) {
                    clearTimeout( moveTimerFullscreenSlideshow );
                    clearInterval( imageSlideshowInterval );
                    moveTimerFullscreenSlideshow = setTimeout( function () {
                        $( '.videoMenuOverlay' ).hide();
                        $( '.displayedFullscreenImage' ).css( 'cursor', 'none' );
                    }, 1000 );
                    $( '.videoMenuOverlay' ).show();
                    $( '.displayedFullscreenImage' ).css( 'cursor', 'url(\'../assets/rainbow-gradient-pointer-32x32.png\'), auto' );
                }
            } );

            $( document ).on( 'mousemove', '.imageSlideshowControls', function () {
                clearTimeout( moveTimerFullscreenSlideshow );
            } );

            // Image selection via mouse wheel
            $( document ).on( 'wheel', '.displayedFullscreenImage', function ( event ) {
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

            // END Image section
            // ******************************************

            // ******************************************
            // #3 - Shrine section
            absoluteTruthsTimer = setInterval( absoluteTruthsUpdate, absoluteTruthsTimerDuration );

            $( '#shrineParticlesSwitch,#shrineParticlesSwitchWhite' ).click( function ( event ) {
                enableFullscreen();

                if ( window.pJSDom[0] == undefined ) {
                    particlesInit1();
                }

                if ( !showParticles ) {
                    showParticles = true;
                    $( '.particles-js-canvas-el' ).attr( 'style', 'opacity:1' );
                } else {
                    showParticles = false;
                    $( '.particles-js-canvas-el' ).attr( 'style', 'opacity:0' );
                }
            } );

            $( '#shrineParticlesSwitch,#shrineParticlesSwitchWhite' ).on( 'wheel', function ( event ) {
                toggleParticleSettings();
            } );

            $( '.shrineSetBGColor' ).click( function ( event ) {
                enableFullscreen();
                $( '#shrine' ).css( 'background-color', $( this ).css( 'backgroundColor' ) );
                $( '#shrine' ).removeClass( 'shrineColorfulBackground' );
                $( '#toggleRelationshipsWhite,#toggleAbsoluteThruthWhite,#shrineParticlesSwitchWhite,#shrineDiscoModeWhite,#shrineOuijaWhite,#shrineOracleWhite,#toggleThinkerWhite' ).show();
                $( '#toggleRelationships,#toggleAbsoluteThruth,#shrineParticlesSwitch,#shrineDiscoMode,#toggleAbsoluteThruthInwards,#toggleAbsoluteThruthOutwards,#shrineOuija,#shrineOracle,#toggleGospel,#toggleThinker' ).hide();
                if ( xxxVisible ) {
                    $( '#toggleAbsoluteThruthInwardsWhite,#toggleAbsoluteThruthOutwardsWhite,#toggleGospelWhite' ).show();
                } else {
                    $( '#toggleGospel' ).hide();
                }
                $( '#shrineSetBGBlack' ).hide();
                $( '.shrineSetBGColorful' ).attr( 'style', 'display: inline' );
            } );

            $( '.shrineSetBGColorful' ).click( function ( event ) {
                $( '#shrine' ).addClass( 'shrineColorfulBackground' );
                $( '#toggleRelationshipsWhite,#toggleAbsoluteThruthWhite,#shrineParticlesSwitchWhite,#shrineDiscoModeWhite,#toggleAbsoluteThruthInwardsWhite,#toggleAbsoluteThruthOutwardsWhite,#shrineOuijaWhite,#shrineOracleWhite,#toggleGospelWhite,#toggleThinkerWhite' ).hide();
                $( '#toggleRelationships,#toggleAbsoluteThruth,#shrineParticlesSwitch,#shrineDiscoMode,#shrineOuija,#shrineOracle,#toggleThinker' ).show();
                if ( xxxVisible ) {
                    $( '#toggleAbsoluteThruthInwards,#toggleAbsoluteThruthOutwards,#toggleGospel' ).show();
                } else {
                    $( '#toggleAbsoluteThruthInwards,#toggleAbsoluteThruthOutwards' ).hide();
                }
                $( '#shrineSetBGBlack' ).show();
                $( '.shrineSetBGColorful' ).hide();
            } );

            $( '#shrine' ).mousemove( function ( event ) {
                if ( event.pageY < 75 ) {
                    $( '#mainMenu' ).attr( 'style', 'opacity:1' );
                }
            } );

            $( '#shrineSettingsContainer' ).hover(
                    function () {
                        $( '#mainMenu' ).attr( 'style', 'opacity:1' );
                    }, function () {
                        if ( $( '#shrine' ).is( ':visible' ) && !$( '#quickSelectGlobalMenuContainer' ).hasClass( 'menuTransition' ) ) {
                            $( '#mainMenu' ).attr( 'style', 'opacity:0' );
                        }
                    }
            );

            $( '#mainMenu' ).hover(
                    function () {
                        $( '#mainMenu' ).attr( 'style', 'opacity:1' );
                        if ( $( '#shrine' ).is( ':visible' ) ) {
                            $( '#shrineSettingsContainer' ).addClass( 'visible' );
                        }
                    }, function () {
                        if ( $( '#shrine' ).is( ':visible' ) && !$( '#quickSelectGlobalMenuContainer' ).hasClass( 'menuTransition' ) && !$( '#quickTrackSelectionMenu' ).hasClass( 'menuTransition' ) ) {
                            $( '#mainMenu' ).attr( 'style', 'opacity:0' );
                        }
                        $( '#shrineSettingsContainer' ).removeClass( 'visible' );
                    }
            );

            // Show cursor when moving mouse
            $( '#particles-js' ).on( 'mousemove', function () {
                clearTimeout( moveTimerShrine );
                moveTimerShrine = setTimeout( function () {
                    $( '#particles-js' ).css( 'cursor', 'none' );
                }, 1000 );
                $( '#particles-js' ).css( 'cursor', 'url(\'../assets/rainbow-gradient-cursor-1-32x32.png\'), auto' );
            } );

            // Generic click on shrine section - no button clicked - action depends on currently active sub tool, e.g. shaman view or meditation symbol
            $( '#particles-js' ).click( function ( e ) {
                enableFullscreen();
            } );

            $( '#particles-js,.meditationSymbolInfoContainer' ).on( 'wheel', function ( event ) {
                stopScreensaver();
                enableFullscreen();
                clearInterval( absoluteTruthsTimer );
                absoluteTruthsTimer = setInterval( absoluteTruthsUpdate, absoluteTruthsTimerDuration );
                absoluteTruthsUpdate();
                nextDiscoMode();

                setNextOuijaYesNoAnswer();
                setNextMeditationSymbol();
            } );

            $( '#toggleRelationships,#toggleRelationshipsWhite' ).on( 'wheel click', function ( event ) {
                enableFullscreen();

                hideOuijaYesNo();
                hideMeditationSymbol();
                $( '#absoluteTruthsOverlay' ).hide();

                toggleRelationships();
            } );

            $( '#toggleAbsoluteThruth,#toggleAbsoluteThruthWhite' ).on( 'wheel click', function ( event ) {
                enableFullscreen();

                toggleRelationships( 'hide' );
                hideOuijaYesNo();
                hideMeditationSymbol();

                absoluteTruthsUpdate( 'default' );
                $( '#absoluteTruthsOverlay' ).show();
            } );

            $( '#toggleGospel,#toggleGospelWhite' ).on( 'wheel click', function ( event ) {
                enableFullscreen();

                toggleRelationships( 'hide' );
                hideOuijaYesNo();
                $( '#absoluteTruthsOverlay' ).hide();
                hideMeditationSymbol();

                absoluteTruthsUpdate( 'gospel' );
                $( '#absoluteTruthsOverlay' ).show();
            } );

            $( '#toggleAbsoluteThruthInwards,#toggleAbsoluteThruthInwardsWhite' ).on( 'wheel click', function ( event ) {
                enableFullscreen();

                toggleRelationships( 'hide' );
                hideOuijaYesNo();
                hideMeditationSymbol();

                absoluteTruthsUpdate( 'intro' );
                $( '#absoluteTruthsOverlay' ).show();
            } );

            $( '#toggleAbsoluteThruthOutwards,#toggleAbsoluteThruthOutwardsWhite' ).on( 'wheel click', function ( event ) {
                enableFullscreen();

                toggleRelationships( 'hide' );
                hideOuijaYesNo();
                hideMeditationSymbol();

                absoluteTruthsUpdate( 'outro' );
                $( '#absoluteTruthsOverlay' ).show();
            } );

            $( '#toggleThinker,#toggleThinkerWhite' ).on( 'wheel click', function ( event ) {
                enableFullscreen();

                toggleRelationships( 'hide' );
                hideOuijaYesNo();
                $( '#absoluteTruthsOverlay' ).hide();
                hideMeditationSymbol();

                absoluteTruthsUpdate( 'thinker' );
                $( '#absoluteTruthsOverlay' ).show();
            } );

            $( '#toggleAbsoluteThruthContainer' ).hover(
                    function ( event ) {
                        $( '#toggleAbsoluteThruthSubContainer' ).show();
                    }, function () {
                        $( '#toggleAbsoluteThruthSubContainer' ).hide();
                    }
            );

            $( '#shrineDiscoMode,#shrineDiscoModeWhite' ).click( function ( event ) {
                enableFullscreen();
                if ( shrineDiscoActive ) {
                    stopShrineDisco();
                } else {
                    if ( window.pJSDom[0] == undefined ) {
                        particlesInit1();
                    }
                    showParticles = true;
                    $( '.particles-js-canvas-el' ).attr( 'style', 'opacity:1' );
                    startDiscoMode();
                    nextDiscoMode();
                }
                if ( $( '#meditationSymbol' ).is( ':visible' ) ) {
                    $( '#ensoImageShrineContainer' ).hide();
                }
            } );

            $( '#shrineDiscoMode,#shrineDiscoModeWhite' ).on( 'wheel', function ( event ) {
                startDiscoMode();
                nextDiscoMode();
                if ( $( '#meditationSymbol' ).is( ':visible' ) ) {
                    $( '#ensoImageShrineContainer' ).hide();
                }
            } );

            $( '#shrineOuija,#shrineOuijaWhite' ).on( 'wheel click', function ( event ) {
                enableFullscreen();
                toggleRelationships( 'hide' );
                hideMeditationSymbol();
                $( '#absoluteTruthsOverlay' ).hide();
                $( '#ensoImageShrineContainer' ).attr( 'style', 'opacity: 0.1' );
                $( '#OuijaYesNo' ).show();

                setNextOuijaYesNoAnswer();
            } );

            $( '#shrineOracle,#shrineOracleWhite' ).on( 'wheel click', function ( event ) {
                enableFullscreen();

                toggleRelationships( 'hide' );
                hideOuijaYesNo();
                $( '#absoluteTruthsOverlay' ).hide();
                showMeditationSymbol();
            } );

            function hideOuijaYesNo() {
                $( '#ensoImageShrineContainer' ).attr( 'style', 'opacity: 1' );
                $( '#OuijaYesNo' ).hide();
            }

            function showMeditationSymbol() {
                setNextMeditationSymbol();
                $( '#meditationSymbol' ).show();
                $( '.meditationSymbolInfoContainer' ).show();
                $( '#ensoImageShrineContainer' ).attr( 'style', 'opacity: 0' );
            }

            function hideMeditationSymbol() {
                $( '#meditationSymbol' ).hide();
                $( '.meditationSymbolInfoContainer' ).hide();
                $( '#ensoImageShrineContainer' ).attr( 'style', 'opacity: 1' );
            }

            function setNextMeditationSymbol() {
                randomNumber = Math.floor( Math.random() * (parseInt( config['meditationSymbols'].length )) );
                while ( alreadySelectedMeditationSymbols.indexOf( randomNumber ) !== -1 ) {
                    randomNumber = Math.floor( Math.random() * (parseInt( config['meditationSymbols'].length )) );
                    if ( alreadySelectedMeditationSymbols.length >= config['meditationSymbols'].length - 1 ) {
                        alreadySelectedMeditationSymbols = [];
                    }
                }
                alreadySelectedMeditationSymbols.push( randomNumber );
                $( '#meditationSymbol' ).attr( 'src', config['meditationSymbols'][randomNumber]['image'] );

                $( '#meditationSymbolFilename' ).html( '' );
                $( '#meditationSymbolLabel' ).html( '' );
                $( '#meditationSymbolMeaning' ).html( '' );
                $( '#meditationSymbolMeaning_second_order' ).html( '' );
                $( '#meditationSymbolEmotion' ).html( '' );

                $( '#meditationSymbolFilename' ).html( ' (' + config['meditationSymbols'][randomNumber]['image'].replace( /\.\/.*symbols\//, '' ) + ')' );
                $( '#meditationSymbolLabel' ).html( config['meditationSymbols'][randomNumber]['label'] );
                $( '#meditationSymbolMeaning' ).html( config['meditationSymbols'][randomNumber]['meaning'] );
                $( '#meditationSymbolMeaning_second_order' ).html( config['meditationSymbols'][randomNumber]['meaning_second_order'] );
                $( '#meditationSymbolEmotion' ).html( config['meditationSymbols'][randomNumber]['emotion'] );
            }

            function setNextOuijaYesNoAnswer() {
                $( '.OuijaYesNoSymbol' ).addClass( 'OuijaRefreshAnimation' );
                randomValue = Math.floor( Math.random() * 3 );

                switch ( randomValue ) {
                    case 0:
                        $( '#OuijaNo' ).show();
                        $( '#OuijaNeutral' ).hide();
                        $( '#OuijaYes' ).hide();
                        break;
                    case 1:
                        $( '#OuijaNo' ).hide();
                        $( '#OuijaNeutral' ).hide();
                        $( '#OuijaYes' ).show();
                        break;
                    case 2:
                        $( '#OuijaNo' ).hide();
                        $( '#OuijaNeutral' ).show();
                        $( '#OuijaYes' ).hide();
                        break;
                }

                setTimeout( function () {
                    $( '.OuijaYesNoSymbol' ).removeClass( 'OuijaRefreshAnimation' );
                }, 700 );
            }

            function toggleRelationships( modeForced = '' ) {
                if ( modeForced !== 'hide' ) {
                    if ( $( '#relationships' ).is( ':visible' ) ) {
                        $( '#relationships' ).hide();
                        $( '#ensoImageShrineContainer' ).attr( 'style', 'opacity: 1.0' );
                    } else {
                        $( '#relationships' ).show();
                        $( '#ensoImageShrineContainer' ).attr( 'style', 'opacity: 0.1' );
                    }
                } else {
                    $( '#relationships' ).hide();
                    $( '#ensoImageShrineContainer' ).attr( 'style', 'opacity: 1.0' );
                }
            }

            function changeStroboSpeed( stroboSpeed ) {
                $( '#particles-js' ).css( 'animation', 'strobo1 ' + stroboSpeed + 'ms steps(1,end) infinite' );
                if ( stroboSpeed > 0 ) {
                    $( '#ensoImageShrine' ).css( 'animation', 'stroboEnso 15ms steps(1,end) infinite' );
                } else {
                    $( '#ensoImageShrine' ).css( 'animation', 'stroboEnso 0ms steps(1,end) infinite' );
                }
            }

            function startDiscoMode() {
                shrineDiscoActive = true;
            }

            function nextDiscoMode() {
                if ( shrineDiscoActive ) {
                    clearTimeout( shrineColorChangeTimer );
                    clearTimeout( shrineStroboChangeTimer );
                    switchDiscoColor();
                    triggerStrobo();
                }
            }

            function stopShrineDisco() {
                clearTimeout( shrineColorChangeTimer );
                clearTimeout( shrineStroboChangeTimer );
                shrineDiscoActive = false;
                showParticles = false;
                $( '.particles-js-canvas-el' ).attr( 'style', 'opacity:0' );
                $( '.shrineColorfulBackground' ).trigger( 'click' );
                stroboSpeed = 0;
                changeStroboSpeed( stroboSpeed );
                $( '#particles-js' ).css( 'animation', 'strobo2 0ms steps(1,end) infinite' );
                $( '#ensoImageShrine' ).css( 'animation', 'stroboEnso 0ms steps(1,end) infinite' );
                $( '#videodrome' ).css( 'opacity', '1' );
                $( '.meditationSymbolInfoContainer' ).hide();
            }

            function toggleParticleSettings() {
                activeParticlesConfig++;
                activeParticlesConfig = activeParticlesConfig % 2;
                try {
                    window.pJSDom[0].pJS.fn.vendors.destroypJS();
                    window['pJSDom'] = [];
                } catch ( e ) {
                }

                showParticles = true;
                $( '.particles-js-canvas-el' ).attr( 'style', 'opacity:1' );

                switch ( activeParticlesConfig ) {
                    case 0:
                        particlesInit1();
                        break;
                    case 1:
                        particlesInit2();
                        break;
                }
            }

            function destroyParticles() {
                try {
                    window.pJSDom[0].pJS.fn.vendors.destroypJS();
                    window['pJSDom'] = [];
                } catch ( e ) {
                }
            }

            function triggerStrobo() {
                stroboSpeeds = [15, 20];
                stroboSpeedToSelect = Math.floor( Math.random() );
                changeStroboSpeed( stroboSpeeds[stroboSpeedToSelect] );
                nextStroboChange = Math.floor( Math.random() * (config['shrine']['stroboSwitchTimings']['max'] - config['shrine']['stroboSwitchTimings']['min'] + 1) + config['shrine']['stroboSwitchTimings']['min'] );
                shrineStroboChangeTimer = setTimeout( triggerStrobo, nextStroboChange * 1000 );
            }

            function switchDiscoColor() {
                randomNumber = Math.floor( Math.random() * (parseInt( config['shrine']['shrineColors'].length + 1 )) ) + 1;
                while ( alreadySelectedColorsDisco.indexOf( randomNumber ) !== -1 ) {
                    randomNumber = Math.floor( Math.random() * (parseInt( config['shrine']['shrineColors'].length + 1 )) ) + 1;
                    if ( alreadySelectedColorsDisco.length >= config['shrine']['shrineColors'].length ) {
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

                nextColorRefresh = Math.floor( Math.random() * (config['shrine']['colorSwitchTimings']['max'] - config['shrine']['colorSwitchTimings']['min'] + 1) + config['shrine']['colorSwitchTimings']['min'] );
                shrineColorChangeTimer = setTimeout( switchDiscoColor, nextColorRefresh * 1000 );
            }

            function absoluteTruthsUpdate( selectedTruthTagLabel = '' ) {
                fadeoutDuration = 1500;
                $( '#absoluteTruthsOverlayText' ).html( '' );

                if ( selectedTruthTagLabel != '' && selectedTruthTagLabel != 'default' ) {
                    activeTruthTagLabel = selectedTruthTagLabel;
                    displayedAbsoluteTruthIndex = [];
                } else if ( selectedTruthTagLabel == 'default' ) {
                    activeTruthTagLabel = '';
                    displayedAbsoluteTruthIndex = [];
                }

                if ( displayedAbsoluteTruthIndex.length <= 0 ) {
                    if ( allGuidedThoughts.length > 0 && activeTruthTagLabel == 'thinker' ) {
                        allGuidedThoughts.forEach( function ( item ) {
                            tempItem = [];
                            tempItem['text'] = item;
                            tempItem['tag'] = 'guided';
                            displayedAbsoluteTruthIndex.push( tempItem );
                        } );
                    } else if ( allGuidedThoughts.length == 0 && activeTruthTagLabel == 'thinker' ) {
                        tempItem = [];
                        tempItem['text'] = 'No guided thought configured';
                        tempItem['tag'] = 'guided';
                        displayedAbsoluteTruthIndex.push( tempItem );
                    } else {
                        config['absoluteTruths'].forEach( function ( item ) {
                            if ( xxxVisible && activeTruthTagLabel == 'intro' && item['tag'].indexOf( 'intro' ) >= 0 ) {
                                displayedAbsoluteTruthIndex.push( item );
                            } else if ( xxxVisible && activeTruthTagLabel == 'outro' && item['tag'].indexOf( 'outro' ) >= 0 ) {
                                displayedAbsoluteTruthIndex.push( item );
                            } else if ( xxxVisible && activeTruthTagLabel == 'gospel' && item['tag'].indexOf( 'gospel' ) >= 0 ) {
                                displayedAbsoluteTruthIndex.push( item );
                            } else if ( xxxVisible && activeTruthTagLabel == '' && item['tag'].indexOf( 'XXX' ) >= 0 ) {
                                displayedAbsoluteTruthIndex.push( item );
                            } else if ( !xxxVisible && item['tag'].indexOf( 'XXX' ) < 0 ) {
                                displayedAbsoluteTruthIndex.push( item );
                            }
                        } );
                    }
                    shuffleArray( displayedAbsoluteTruthIndex );
                }
                nextTruth = displayedAbsoluteTruthIndex.pop();

                $( '#absoluteTruthsOverlayText' ).fadeOut( fadeoutDuration, function () {
                    if ( nextTruth != undefined && nextTruth['text'] != undefined ) {
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
                    }
                } );
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
            // #4 - Game section
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

                if ( $( this ).attr( 'blockMenue' ) == 'true' ) {
                    $( '#mainMenu' ).addClass( 'hideInBackground' );
                    $( '#gamesLinks' ).addClass( 'hideInBackground' );
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
            // #5 - Music section
            redirect_uri = config['oAuthSpotify'][0]['redirect_uri'];
            client_id = config['oAuthSpotify'][0]['client_id'];
            client_secret = config['oAuthSpotify'][0]['client_secret'];

            $( '#openAddToQueueMenu' ).click( function () {
                stopAllActions( true, false );
                $( '#quickTrackSelectionMenu' ).toggleClass( 'menuTransition' );
                $( '#quickTrackSelectionMenu' ).animate( {scrollTop: 0}, 'fast' );
            } );

            $( '#spotifyPlaylists' ).click( function () {
                $( '#quickSelectGlobalMenuContainer' ).toggleClass( 'menuTransition' );
                $( '#quickSelectGlobalMenuContainer' ).animate( {scrollTop: 0}, 'fast' );
                stopAllActions( false );

                // Reset id if JS error has been detected and displayed
                if ( $( this ).attr( 'id' ) == 'errorDetectedMessage' ) {
                    $( this ).attr( 'id', 'spotifyPlaylists' );
                    $( this ).html( 'Select Playlist' );
                }
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
                if ( $( '#showShrineSection' ).hasClass( 'mainSectionActive' ) ) {
                    $( '#mainMenu' ).attr( 'style', 'opacity:0' );
                    $( '#shrineSettingsContainer' ).removeClass( 'visible' );
                }

                $( '.spotifyPlaylistQueed' ).removeClass( 'spotifyPlaylistQueed' );
                $( '.spotifyPlaylistActive' ).removeClass( 'spotifyPlaylistActive' );
                $( this ).addClass( 'spotifyPlaylistActive' );

                // on middle mouse button just open in new tab
                if ( e.which == 2 ) {
                    spotifyPause();
                    window.open( $( this ).attr( 'href' ), '_blank' );
                    $( '#quickSelectGlobalMenuContainer' ).removeClass( 'menuTransition' );
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
                    $( '#quickSelectGlobalMenuContainer' ).removeClass( 'menuTransition' );
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
                        !$( event.target ).hasClass( 'playlistMenuCustomLink' ) &&
                        !$( event.target ).hasClass( 'videoJSFavorite' )
                ) {
                    e.preventDefault();

                    if ( mouseDisabled ) {
                        return;
                    }

                    openSpotifyApp();
                    playNextYoutubeVideoOrSpotifyTrack();
                } else if ( e.which == 2 ) {
                    e.preventDefault();
                }
            } );

            function openSpotifyApp() {
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

            // Uses integrated Spotify player if succesfully logged in
            if ( localStorage.getItem( 'access_token' ) != null ) {
                refreshAccessToken();
                setInterval( refreshAccessToken, 60000 );
                setInterval( refreshDevices, 3000 );
                setInterval( currentlyPlaying, 1000 );
                populateTrackSelectionInterval = setInterval( populateTrackSelectionMenu, 1000 );

                $( '#spotifyLogin' ).hide();

                if ( config['spotifySaveToPlaylistId'] == undefined && config['spotifySaveToPlaylistId'] != '' ) {
                    $( '.addToFavorites' ).hide();
                }

                $( document ).on( 'click', '.spotifyTrackContainer', function ( e ) {
                    if ( playingSpotifyTrack ) {
                        spotifyAddToQueue( $( this ).attr( 'id' ) );
                    } else {
                        spotifyPlay( $( this ).attr( 'id' ) );
                    }
                    $( this ).hide();
                } );

                $( document ).on( 'click', '.currentTrackAction', function ( e ) {
                    $( '#quickSelectGlobalMenuContainer' ).removeClass( 'menuTransition' );
                    $( '#quickTrackSelectionMenu' ).removeClass( 'menuTransition' );
                    $( '#videodromeGlobalActionContainer' ).css( 'opacity', '' );
                    $( '#videodromeGlobalActionContainer' ).css( 'z-index', '75' );
                    $( '.spotifyPlaylistQueed' ).removeClass( 'spotifyPlaylistQueed' );
                    $( '.spotifyPlaylistActive' ).removeClass( 'spotifyPlaylistActive' );
                } );

                $( '.spotifyPlaylistItem' ).on( 'mousedown', document, function ( e ) {
                    stopAfterTrack = false;
                    if ( $( '#showShrineSection' ).hasClass( 'mainSectionActive' ) ) {
                        $( '#mainMenu' ).attr( 'style', 'opacity:0' );
                        $( '#shrineSettingsContainer' ).removeClass( 'visible' );
                    }

                    // on middle mouse button put playlist into queue
                    if ( e.which == 2 ) {
                        $( '.spotifyPlaylistQueed' ).removeClass( 'spotifyPlaylistQueed' );
                        $( '[data-spotify-id="' + $( this ).attr( 'data-spotify-id' ) + '"]' ).addClass( 'spotifyPlaylistQueed' );
                        e.preventDefault();
                        nextPlaylistToPlay = $( this ).attr( 'data-spotify-id' );
                        $( '#quickSelectGlobalMenuContainer' ).removeClass( 'menuTransition' );
                        $( '#videodromeGlobalActionContainer' ).css( 'opacity', '' );
                        $( '#videodromeGlobalActionContainer' ).css( 'z-index', '75' );
                    } else if ( e.which == 1 ) {
                        $( '#quickSelectGlobalMenuContainer' ).removeClass( 'menuTransition' );
                        $( '#quickTrackSelectionMenu' ).removeClass( 'menuTransition' );
                        $( '#videodromeGlobalActionContainer' ).css( 'opacity', '' );
                        $( '#videodromeGlobalActionContainer' ).css( 'z-index', '75' );
                        $( '.spotifyPlaylistQueed' ).removeClass( 'spotifyPlaylistQueed' );
                        $( '.spotifyPlaylistActive' ).removeClass( 'spotifyPlaylistActive' );
                        $( '[data-spotify-id="' + $( this ).attr( 'data-spotify-id' ) + '"]' ).addClass( 'spotifyPlaylistActive' );
                        nextPlaylistToPlay = '';
                        $( '#spotifyPlaylists' ).html( '...' );
                        openSpotifyApp();
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
                        $( '.spotifyPlaylistActive' ).removeClass( 'spotifyPlaylistActive' );
                    }
                } );

                $( '#next' ).click( function () {
                    openSpotifyApp();
                    stopAfterTrack = false;
                    playNextYoutubeVideoOrSpotifyTrack();
                } );

                $( '#switchDesktopPhone' ).click( function () {
                    if ( $( '#devices' ).find( ':selected' ).text().toLowerCase().includes( config['spotifyMainPlayerName'].toLowerCase() ) && typeof $( '#devices option:contains("' + config['spotifyPhoneName'] + '")' ).val() != 'undefined' ) {
                        transfer( $( '#devices option:contains("' + config['spotifyPhoneName'] + '")' ).val() );
                    } else if ( config['spotifyMainPlayerName'] != '' && !$( '#devices' ).find( ':selected' ).text().toLowerCase().includes( config['spotifyMainPlayerName'].toLowerCase() ) ) {
                        openSpotifyApp();
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
                // Stand alone embedded iFrame Spotify Player
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
            // #6 - Search Youtube section
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
                    mainSearchResultYoutubePlayer.setVolume( 100 );
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
                        try {
                            if ( response.responseJSON.error.errors[0].reason == 'quotaExceeded' ) {
                                searchYoutube( searchTerm, true );
                            }
                        } catch ( e ) {
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
                if ( youtubeCurrentQueue.length == 0 || (externalSoundTabOpened && !playingRandomVideoFromCategory) ) {
                    if ( $( '#mainSearchResultYoutubeContainer' ).hasClass( 'videoContainerFullscreen' ) && playingRandomVideoFromCategory ) {
                        playingRandomVideoFromCategory = false;
                        $( '#showShrineSection' ).trigger( 'click' );
                        $( '#mainMenu' ).attr( 'style', 'opacity:0' );
                        $( '#shrineSettingsContainer' ).removeClass( 'visible' );
                    } else if ( $( '#mainSearchResultYoutubeContainer' ).hasClass( 'videoContainerFullscreen' ) ) {
                        $( '#showSearchSection' ).trigger( 'click' );
                    }

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
                    mainSearchResultYoutubePlayer.setVolume( 100 );
                    displayYoutubeQueue();
                }

                if ( externalSoundTabOpened && !playingRandomVideoFromCategory ) {
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
            // #7 - Videodrome section
            $( '#switchStreamingService' ).html( selectedVideoStreamService );
            $( '.videoDromeFrame' ).bind( 'seeking', syncTimeOfLinkedVideoContainer );

            // On Mousemmove within videodrome show timer, mouse, videoplay overlay
            $( document ).on( 'mousemove', '.videodromeVideoContainer,#videoJSPlayer1_html5_api,#videoJSPlayer2_html5_api,.vjs-control-bar', function () {
                clearTimeout( moveTimerVideodrome );
                moveTimerVideodrome = setTimeout( function () {
                    $( '.videodromeVideoContainer,#videoJSPlayer1_html5_api,#videoJSPlayer2_html5_api' ).css( 'cursor', 'none' );
                    $( '.videoMenuOverlay' ).hide();
                }, 1000 );

                if ( $( this ).hasClass( 'videodromeFullscreen' ) ) {
                    $( '.videoDromeFrame' ).prop( 'controls', 'controls' );
                }
                $( '.videodromeVideoContainer,#videoJSPlayer1_html5_api,#videoJSPlayer2_html5_api' ).css( 'cursor', 'url(\'../assets/rainbow-gradient-pointer-32x32.png\'), auto' );
                $( '.videoMenuOverlay' ).show();

                if ( $( '#videoJSPlayer1,#videoJSPlayer2' ).hasClass( 'videodromeFullscreen' ) ) {
                    $( '.video-js' ).removeClass( 'vjs-user-inactive' );
                    $( '.video-js' ).addClass( 'vjs-user-active' );
                    $( '.vjs-control-bar' ).css( 'display', 'flex' );
                } else {
                    $( '.video-js' ).removeClass( 'vjs-user-active' );
                    $( '.video-js' ).addClass( 'vjs-user-inactive' );
                    $( '.vjs-control-bar' ).css( 'display', 'none' );
                }
            } );

            $( '.enablePornContent' ).click( function () {
                $( '#pornContentInfo' ).modal( 'show' );
            } );

            $( '.toggleLocalStreamIcon' ).click( function () {
                toggleLocalStreamVideo();
                displayAllActiveLocalFilenames();
            } );

            $( '.toggleTransparentStrobo' ).click( function () {
                toggleTransparentStrobo( $( this ).attr( 'data-transparency' ) );
            } );

            $( '.toggleTransparentStrobo' ).on( 'wheel', function ( event ) {
                if ( !shrineDiscoActive ) {
                    toggleTransparentStrobo( $( this ).attr( 'data-transparency' ) );
                }
                toggleParticleSettings();
            } );

            $( '#toggleTransperentStroboOracleSymbol' ).click( function () {
                if ( !shrineDiscoActive ) {
                    toggleTransparentStrobo();
                }
                showMeditationSymbol();
            } );

            $( '#toggleTransperentStroboOracleSymbol' ).on( 'wheel', function ( event ) {
                $( '#meditationSymbol' ).show();
                $( '#ensoImageShrineContainer' ).hide();
                if ( !shrineDiscoActive ) {
                    toggleTransparentStrobo();
                }
                setNextMeditationSymbol();

                if ( $( '#meditationSymbol' ).is( ':visible' ) ) {
                    $( '.meditationSymbolInfoContainer' ).show();
                } else {
                    $( '.meditationSymbolInfoContainer' ).hide();
                }
            } );

            $( '.toggleQuickSelectGlobalMenuIcon' ).click( function () {
                $( '#quickSelectGlobalMenuContainer' ).toggleClass( 'menuTransition' );
                $( '#quickSelectGlobalMenuContainer' ).animate( {scrollTop: 0}, 'fast' );
            } );

            $( '.toggleQuickSelectGlobalMenuIcon' ).on( 'mouseenter', function ( event ) {
                $( '#quickSelectGlobalMenuContainer' ).toggleClass( 'menuTransition' );
                $( '#quickSelectGlobalMenuContainer' ).animate( {scrollTop: 0}, 'fast' );
            } );

            $( '.toggleTransparentStrobo,.toggleLocalStreamIcon,#toggleTransperentStroboOracleSymbol' ).click( function () {
                $( '#quickSelectGlobalMenuContainer' ).removeClass( 'menuTransition' )
            } );

            // Save clicked tags to local storage, to be extracted to config manually later on
            $( '.videoTaggingButton' ).click( function () {
                clearTimeout( videodromeTaggingSaveInterval );

                if ( videodromeTaggingSaveInterval == '' || videodromeTaggingSaveInterval == undefined ) {
                    $( '.videodromeFullscreen' ).each( function () {
                        videodromeTaggingVideo = $( this ).find( '.videoSource' ).attr( 'src' ).replace( '\'', '\\\'' ).replace( /#t=.*/, '#t=' + Math.floor( $( '.videodromeFullscreen' ).find( '.localVideo' )[0].currentTime ) );
                    } );
                    videodromeTaggingAppliedTags = $( this ).html();
                } else {
                    videodromeTaggingAppliedTags = videodromeTaggingAppliedTags + ',' + $( this ).html();
                }

                videodromeTaggingSaveInterval = setTimeout( function () {
                    itemToStore = '{\'file\':\'' + videodromeTaggingVideo + '\',\'tag\':\'' + videodromeTaggingAppliedTags + '\'},'
                    videoTaggingCache['items'].push( itemToStore );
                    localStorage.setItem( 'videoTaggingCache', JSON.stringify( videoTaggingCache['items'] ) );

                    videodromeTaggingSaveInterval = '';
                    videodromeTaggingVideo = '';
                    videodromeTaggingAppliedTags = '';
                }, 5000 );

            } );

            // VideoJS / Online streaming video Window
            $( document ).on( 'click', '#videoJSPlayer1_html5_api,#videoJSPlayer2_html5_api', function ( e ) {
                e.preventDefault();
                e.stopPropagation();
                if ( $( '#videoJSPlayer1,#videoJSPlayer2' ).hasClass( 'videodromeFullscreen' ) ) {
                    if ( config['pornMap'] != undefined ) {
                        $( '.video-js' ).removeClass( 'vjs-user-active' );
                        $( '.video-js' ).addClass( 'vjs-user-inactive' );
                        $( '.vjs-control-bar' ).css( 'display', 'none' );
                        $( '.video-js' ).removeClass( 'videodromeFullscreen' );
                        $( '.videodromeFullscreenMenuVideoJSContainer' ).hide();
                        $( '.videodromeRefreshContainer' ).show();
                    } else {
                        stopAllActions();
                    }
                } else {
                    $( '.video-js' ).removeClass( 'vjs-user-inactive' );
                    $( '.video-js' ).addClass( 'vjs-user-active' );
                    $( '.vjs-control-bar' ).css( 'display', 'flex' );
                    $( '.video-js' ).addClass( 'videodromeFullscreen' );
                    $( '.videodromeFullscreenMenuVideoJSContainer' ).show();
                    $( '.videodromeRefreshContainer' ).hide();
                }
                updateVideodromeFullscreenInfo();
            } );

            // Local Video Window
            // Toggle between small and fullscreen mode of local video
            $( document ).on( 'click', '.videoDromeFrame', function ( e ) {
                e.preventDefault();
                e.stopPropagation();
                $( '.videoDromeFrame' ).removeAttr( 'controls' );
                if ( $( this ).parent().hasClass( 'videodromeFullscreenTemp' ) ) {
                    $( '.videodromeFullscreenTemp' ).removeClass( 'videodromeFullscreenTemp' );
                    stopDirectorMode();
                } else if ( $( this ).parent().hasClass( 'videodromeFullscreen' ) ) {
                    $( this ).parent().removeClass( 'videodromeFullscreen' );
                    $( '.videodromeFullscreenMenuLocalVideoJSContainer' ).hide();
                    $( '.videodromeRefreshContainer' ).show();
                    stopDirectorMode();
                } else {
                    $( this ).parent().addClass( 'videodromeFullscreen' );
                    $( '.videodromeFullscreenMenuLocalVideoJSContainer' ).show();
                    $( '.videodromeRefreshContainer' ).hide();
                }

                updateVideodromeFullscreenInfo();
                displayAllActiveLocalFilenames();
            } );

            // Seeking within local video - Syncs videos with same content and also makes video fullscreen for a short time to allow for smooth display of content
            $( document ).on( 'wheel', '.videodromeVideoContainer,.videodromeRefreshLocalVideo', function ( event ) {
                event.preventDefault();
                seekWithinLocalVideo( event, $( this ).attr( 'target' ) );
            } );

            // Seeking within video using the video tagging button (time interval is much smaller) or the fullscreen reload button.
            $( document ).on( 'wheel', '#videodromeFullscreenMenuLocalVideoContainer,#videoTaggingContainer,.videodromeDirectorControlContainer', function ( event ) {
                event.preventDefault();
                timeSkipDuration = 30;
                if ( $( '.videoTaggingButton' ).is( ':visible' ) ) {
                    timeSkipDuration = 5;
                }
                seekWithinLocalVideo( event, $( '.videodromeFullscreen' ).attr( 'target' ), timeSkipDuration );
            } );

            // Seeking within all local videos simultaneously via the reload all button.
            $( document ).on( 'wheel', '#refreshVideoDromeVideoAll', function ( event ) {
                event.preventDefault();
                clearInterval( videoSeekFullscreenInterval );
                $( '.videoDromeFrame' ).prop( 'controls', 'controls' );
                if ( !$( '.videodromeFullscreenTemp' )[0] ) {
                    $( '.videoDromeVideo' + randomIntFromInterval( 1, 4 ).toString() ).addClass( 'videodromeFullscreenTemp' );
                }
                videoSeekFullscreenInterval = setTimeout( function () {
                    $( '.videodromeFullscreenTemp' ).removeClass( 'videodromeFullscreenTemp' );
                    $( '.videoDromeFrame' ).removeAttr( 'controls' );
                }, videoSeekFullscreenDuration );

                $( '.videoDromeFrame' ).unbind( 'seeking' );
                setTimeout( function () {
                    $( '.videoDromeFrame' ).bind( 'seeking', syncTimeOfLinkedVideoContainer );
                }, 100 );

                $( '.videoDromeFrame' ).each( function () {
                    if ( event.originalEvent.deltaY > 0 ) { // going down
                        $( this )[0].currentTime = $( this )[0].currentTime - 30;
                    } else { // going up
                        $( this )[0].currentTime = $( this )[0].currentTime + 30;
                    }
                } );
            } );

            $( '.videodromeRefreshLocalVideo' ).click( function () {
                $( '.videoDromeFrame' ).unbind( 'seeking' );
                setTimeout( function () {
                    $( '.videoDromeFrame' ).bind( 'seeking', syncTimeOfLinkedVideoContainer );
                }, 100 );
                loadVideoDromeOneWindowRefresh( $( this ).attr( 'target' ) );
            } );

            $( '.videodromeLoadModeSelect' ).click( function ( e ) {
                videodromeLoadModeRandom = false;
                videodromeLoadMode = $( this ).attr( 'data-videodromeLoadMode' );
                setIconActive( e, 'loadModeIconActive' );
            } );

            $( '#videodromeLoadModeRandom' ).click( function ( e ) {
                videodromeLoadModeRandom = true;
                setIconActive( e, 'loadModeIconActive' );
            } );

            $( '.videoJSSearchURL' ).click( function () {
                if ( $( this ).attr( 'videoJSSearchURL' ).indexOf( 'pornhub' ) >= 0 ) {
                    selectedVideoStreamService = 'PH';
                } else {
                    selectedVideoStreamService = 'XV';
                }
                updateVideodromeFullscreenInfo();
                getNextVideoStreamUrl( true, $( this ).attr( 'videoJSSearchURL' ) + randomIntFromInterval( 1, 3 ) );
            } );

            $( '.searchLink' ).on( 'mousedown', document, function ( e ) {
                e.preventDefault();
                e.stopPropagation();
                if ( $( '.searchInput' ).val() != '' ) {
                    window.open( $( e.target ).attr( 'searchLink' ).replace( /##searchTerm##/, $( '.searchInput' ).val() ), '_blank' );
                } else {
                    window.open( $( e.target ).attr( 'href' ), '_blank' );
                }
            } );

            $( '.refreshVideoDromeVideoFullscreenIcon' ).click( function () {
                target = '';
                $( '.videodromeFullscreen' ).each( function () {
                    target = this;
                    return;
                } );
                if ( config['pornMap'] != undefined && config['pornMap'].length > 0 ) {
                    if ( $( target ).hasClass( 'video-js' ) ) {
                        videodromeStreamRefreshVideo();
                    } else {
                        if ( superShuffleModeActive ) {
                            if ( externalPornFilesTemp.length <= 0 ) {
                                externalPornFilesTemp = externalPornFiles;
                            }
                            randomNumber = Math.floor( Math.random() * (parseInt( externalPornFilesTemp.length )) );
                            $( target ).find( '.videoSource' ).attr( 'src', externalPornFilesTemp[randomNumber] + '#t=60' );
                            externalPornFilesTemp.splice( randomNumber, 1 );
                        } else {
                            randomNumber = Math.floor( Math.random() * (parseInt( selectableVideodromeFilesFromTagAndFolders.length )) );
                            while ( alreadySelectedVideosVideodrome.indexOf( randomNumber ) !== -1 ) {
                                randomNumber = Math.floor( Math.random() * (parseInt( selectableVideodromeFilesFromTagAndFolders.length )) );
                                if ( alreadySelectedVideosVideodrome.length >= selectableVideodromeFilesFromTagAndFolders.length - 1 ) {
                                    alreadySelectedVideosVideodrome = [];
                                }
                            }
                            alreadySelectedVideosVideodrome.push( randomNumber );
                            $( target ).find( '.videoSource' ).attr( 'src', selectableVideodromeFilesFromTagAndFolders[randomNumber] );
                        }

                        $( target ).find( '.localVideo' )[0].load();
                        $( target ).find( '.localVideo' )[0].play();
                    }
                    updateVideodromeFullscreenInfo();
                } else if ( $( target ).hasClass( 'video-js' ) ) {
                    videodromeStreamRefreshVideo();
                }
                $( '.video-js' ).removeClass( 'vjs-user-active' );
                $( '.video-js' ).addClass( 'vjs-user-inactive' );
                $( '.vjs-control-bar' ).css( 'display', 'none' );
            } );

            $( document ).on( 'mouseenter', '.refreshVideoDromeVideoFullscreenIcon', function () {
                clearTimeout( videodromeFullscreenMenuHideInterval );
                videodromeFullscreenMenuHideInterval = setTimeout( function () {
                    $( '.refreshVideoDromeVideoFullscreenContainer' ).css( 'cursor', 'none' );
                    $( '.videodromeFullscreenMenuContainer' ).css( 'opacity', '0' );
                }, 1000 );
            } );

            $( document ).on( 'mouseleave', '.refreshVideoDromeVideoFullscreenIcon', function () {
                clearTimeout( videodromeFullscreenMenuHideInterval );
                $( '.refreshVideoDromeVideoFullscreenContainer' ).css( 'cursor', 'url(\'../assets/rainbow-gradient-pointer-32x32.png\'), auto' );
                $( '#videodromeFullscreenMenuVideoJSContainer,#videodromeFullscreenMenuLocalVideoContainer' ).css( 'opacity', '1' );
            } );

            $( '#refreshVideoDromeVideoAll' ).click( function () {
                if ( videodromeLoadModeRandom ) {
                    videodromeLoadMode = randomIntFromInterval( 1, 4 ).toString();
                }

                if ( videodromeLoadMode == '1' || videodromeLoadModeRandom ) {
                    loadVideoDromeOneWindowRefresh( 'videoDromeVideo1' );
                    loadVideoDromeOneWindowRefresh( 'videoDromeVideo2' );
                    loadVideoDromeOneWindowRefresh( 'videoDromeVideo3' );
                    loadVideoDromeOneWindowRefresh( 'videoDromeVideo4' );
                } else if ( videodromeLoadMode < 4 ) {
                    loadVideoDromeOneWindowRefresh( 'videoDromeVideo1' );
                    loadVideoDromeOneWindowRefresh( 'videoDromeVideo2' );
                } else if ( videodromeLoadMode == 4 ) {
                    loadVideoDromeOneWindowRefresh( 'videoDromeVideo1' );
                    loadVideoDromeOneWindowRefresh( 'videoDromeVideo3' );
                }
                videodromeStreamRefreshVideo();
            } );

            $( document ).on( 'mousemove', '.videodromeRefreshContainer,.videodromeDirectorControlContainer', function () {
                clearTimeout( videodromeFullscreenMenuHideInterval );

                $( '.videodromeRefreshContainer,.videodromeDirectorControlContainer' ).css( 'opacity', '1' );
                $( '.videodromeRefreshLocalVideo,.videodromeStreamRefreshVideo,#refreshVideoDromeVideoAll,.videodromeDirectorControlContainer,.videodromeDirectorControlContainerIcon' ).css( 'cursor', 'url(\'../assets/rainbow-gradient-pointer-32x32.png\'), auto' );
                $( '.videodromeRefreshContainer,.videodromeDirectorControlContainer' ).css( 'cursor', 'url(\'../assets/rainbow-gradient-cursor-1-32x32.png\'), auto' );

                videodromeFullscreenMenuHideInterval = setTimeout( function () {
                    $( '.videodromeRefreshLocalVideo,.videodromeStreamRefreshVideo,#refreshVideoDromeVideoAll,.videodromeRefreshContainer,.videodromeDirectorControlContainer,.videodromeDirectorControlContainerIcon' ).css( 'cursor', 'none' );
                    $( '.videodromeRefreshContainer,.videodromeDirectorControlContainer' ).css( 'opacity', '0' );
                }, 1000 );
            } );

            $( document ).on( 'mouseleave', '.videodromeRefreshContainer,.videodromeDirectorControlContainer', function () {
                clearTimeout( videodromeFullscreenMenuHideInterval );

                $( '.videodromeRefreshLocalVideo,.videodromeStreamRefreshVideo,#refreshVideoDromeVideoAll,.videodromeDirectorControlContainer,.videodromeDirectorControlContainerIcon' ).css( 'cursor', 'url(\'../assets/rainbow-gradient-pointer-32x32.png\'), auto' );
                $( '.videodromeRefreshContainer,.videodromeDirectorControlContainer' ).css( 'cursor', 'url(\'../assets/rainbow-gradient-cursor-1-32x32.png\'), auto' );
                $( '.videodromeRefreshContainer,.videodromeDirectorControlContainer' ).css( 'opacity', '0' );
            } );

            $( document ).on( 'mouseenter', '.videodromeFullscreenMenuContainer', function ( event ) {
                $( this ).css( 'opacity', '1' );
                updateVideodromeFullscreenInfo();
            } );

            $( document ).on( 'mouseleave', '.videodromeFullscreenMenuContainer', function ( event ) {
                $( this ).css( 'opacity', '0' );
            } );

            $( '.videodromeStreamRefreshVideo' ).click( function () {
                videodromeStreamRefreshVideo();
            } );

            $( document ).on( 'mouseenter', '#videodromeLeftToolbarTrigger,#videodromeLeftToolbarTrigger', function ( event ) {
                $( '#videodromeLeftToolbar' ).toggle();
            } );

            $( document ).on( 'wheel', '.videodromeStreamVideoContainer,#videodromeFullscreenMenuVideoJSContainer,#videodromeStreamRefreshVideo', function ( event ) {
                event.preventDefault();
                if ( event.originalEvent.deltaY > 0 ) { // going down
                    videoJSPlayer.currentTime( videoJSPlayer.currentTime() - 30 );
                } else { // going up
                    videoJSPlayer.currentTime( videoJSPlayer.currentTime() + 30 );
                }
                $( '.video-js' ).removeClass( 'vjs-user-inactive' );
                $( '.video-js' ).addClass( 'vjs-user-active' );

                if ( $( '#videoJSPlayer1,#videoJSPlayer2' ).hasClass( 'videodromeFullscreen' ) ) {
                    $( '.vjs-control-bar' ).css( 'display', 'flex' );
                }

                clearTimeout( videodromeVideoJSControlbarHideInterval );
                videodromeVideoJSControlbarHideInterval = setTimeout( function () {
                    $( '.video-js' ).removeClass( 'vjs-user-active' );
                    $( '.video-js' ).addClass( 'vjs-user-inactive' );
                    $( '.vjs-control-bar' ).css( 'display', 'none' );
                }, 2000 );
            } );

            $( document ).on( 'mouseenter', '#videodromeGlobalActionContainer,#videodromeFullscreenMenuVideoJSContainer,#videodromeFullscreenMenuVideoJSContainerExtraOptions', function ( event ) {
                event.preventDefault();

                $( '.video-js' ).removeClass( 'vjs-user-inactive' );
                $( '.video-js' ).addClass( 'vjs-user-active' );

                if ( $( '#videoJSPlayer1,#videoJSPlayer2' ).hasClass( 'videodromeFullscreen' ) ) {
                    $( '.vjs-control-bar' ).css( 'display', 'flex' );
                }

                if ( $( '#videodromeFullscreenMenuLocalVideoContainer' ).is( ':visible' ) ) {
                    $( '#videoTaggingContainer' ).show();
                    checkIfCurrentVideoAlreadyTagged();
                    $( '#videodromeLoadModeSelectContainer' ).hide();
                    $( '#videodromeDirectorModeContainer' ).hide();
                }

                clearTimeout( videodromeVideoJSControlbarHideInterval );
                videodromeVideoJSControlbarHideInterval = setTimeout( function () {
                    $( '.video-js' ).removeClass( 'vjs-user-active' );
                    $( '.video-js' ).addClass( 'vjs-user-inactive' );
                    $( '.vjs-control-bar' ).css( 'display', 'none' );
                }, 2000 );
            } );

            $( document ).on( 'mouseleave', '#videodromeGlobalActionContainer', function ( event ) {
                if ( $( '#quickSelectGlobalMenuContainer' ).hasClass( 'menuTransition' ) ) {
                    $( '#videodromeGlobalActionContainer' ).css( 'opacity', '1' );
                    $( '#videodromeGlobalActionContainer' ).css( 'z-index', '65' );
                } else {
                    $( '#videodromeGlobalActionContainer' ).css( 'opacity', '' );
                    $( '#videodromeGlobalActionContainer' ).css( 'z-index', '75' );
                    $( '#videoTaggingContainer' ).hide();
                    $( '#videodromeLoadModeSelectContainer' ).show();
                    $( '#videodromeDirectorModeContainer' ).show();
                }
            } );

            $( document ).on( 'mousemove', '.vjs-control-bar', function ( event ) {
                clearTimeout( videodromeVideoJSControlbarHideInterval );
            } );

            $( document ).on( 'click', '#videodromeFullscreenSearchInput', function ( event ) {
                $( '*[data-trigger-keyboard]' ).trigger( 'click' );
            } );

            $( document ).on( 'click', '.videoJSStreamModelname', function ( event ) {
                lastUsedVideoStreamSearchUrl = $( this ).attr( 'modellink' );
                getNextVideoStreamUrl( true, lastUsedVideoStreamSearchUrl );
            } );

            $( document ).on( 'click', '#videodromeFullscreenAddToFavorites', function ( event ) {
                if ( $( '.videodromeFullscreen' ).parent().hasClass( 'videodromeStreamVideoContainer' ) ) {
                    $( '.videodromeFullscreen' ).each( function () {
                        if ( $( this ).is( ':visible' ) ) {
                            var favoriteItem = {
                                'videoTitel'        : $( this ).parent().attr( 'data-videoTitel' ),
                                'videoPageUrl'      : $( this ).parent().attr( 'data-videoPageUrl' ),
                                'videoPagePosterUrl': $( this ).parent().attr( 'data-videoPagePosterUrl' )
                            };
                            videodromeFavorites['items'].unshift( favoriteItem );
                        }
                    } );
                }
                localStorage.setItem( 'videodromeFavorites', JSON.stringify( videodromeFavorites['items'] ) );
                outputPHFavorites();
            } );

            $( document ).on( 'click', '.videodromeFullscreenDownloadVideoLink,.videodromeFullscreenDownloadVideoIcon ', function ( event ) {
                navigator.clipboard.writeText( $( '.videodromeFullscreenDownloadVideoLink' ).attr( 'videoUrl' ) );
            } );

            $( document ).on( 'click', '#videodromeFullscreenResetSearch', function ( event ) {
                $( '.searchInput' ).val( '' );
                lastUsedVideoStreamSearchUrl = createSearchUrl();
                getNextVideoStreamUrl( true, lastUsedVideoStreamSearchUrl );
            } );

            $( document ).on( 'mouseup', '.videodromeFullscreenFilename', function ( event ) {
                if ( window.getSelection ) {
                    selectedText = window.getSelection().toString();
                    navigator.clipboard.writeText( selectedText );
                    $( '.searchInput' ).val( $.trim( selectedText ) );
                    lastUsedVideoStreamSearchUrl = createSearchUrl( $.trim( selectedText ) );
                    getNextVideoStreamUrl( true, lastUsedVideoStreamSearchUrl );
                }
            } );

            $( document ).on( 'mousedown', '.videoJSFavorite', function ( e ) {
                // on middle mouse button just open in new tab
                if ( e.which == 2 ) {
                    window.open( $( this ).attr( 'data-videoPageUrl' ), '_blank' );
                } else {
                    if ( $( this ).attr( 'data-videoPageUrl' ).indexOf( 'pornhub' ) >= 0 ) {
                        selectedVideoStreamService = 'PH';
                    } else {
                        selectedVideoStreamService = 'XV';
                    }
                    updateVideodromeFullscreenInfo();
                    getNextVideoStreamUrl( true, $( this ).attr( 'data-videoPageUrl' ), false, true );
                }
            } );

            $( document ).on( 'click', '.videostreamFavoriteItemDeleteSymbol', function ( e ) {
                e.preventDefault();
                e.stopPropagation();
                removeItemFromStreamFavorites( $( this ).parent().find( '.videoJSFavorite' ).attr( 'src' ) );
                outputPHFavorites();
            } );

            $( document ).on( 'click', '#unlockDeleteVideodromeFavorites', function ( event ) {
                $( '.videostreamFavoriteItemDeleteSymbol' ).show();
                showVideostreamFavoriteItemDeleteSymbol = true;
                $( '#unlockDeleteVideodromeFavorites' ).hide();
                $( '#lockDeleteVideodromeFavorites' ).show();
            } );

            $( document ).on( 'click', '#lockDeleteVideodromeFavorites', function ( event ) {
                $( '.videostreamFavoriteItemDeleteSymbol' ).hide();
                showVideostreamFavoriteItemDeleteSymbol = false;
                $( '#lockDeleteVideodromeFavorites' ).hide();
                $( '#unlockDeleteVideodromeFavorites' ).show();
            } );

            $( '#switchStreamingService' ).click( function ( e ) {
                if ( $( '#switchStreamingService' ).html() == 'PH' ) {
                    selectedVideoStreamService = 'XV';
                } else {
                    selectedVideoStreamService = 'PH';
                }
                updateVideodromeFullscreenInfo();
                getNextVideoStreamUrl( true );
            } );

            $( document ).on( 'click', '.localFilename', function ( event ) {
                $( '.videodromeFullscreen' ).find( '.videoSource' ).attr( 'src', $( this ).attr( 'src' ) );
                $( '.videodromeFullscreen' ).find( '.localVideo' )[0].load();
            } );

            $( document ).on( 'click', '.externalPornDir', function ( event ) {
                if ( $( this ).hasClass( 'videodromeLocalFolderActive' ) ) {
                    $( '[diridentifier=' + $( this ).attr( 'diridentifier' ) + ']' ).removeClass( 'videodromeLocalFolderActive' );
                    processExternalFiles( $( this ).attr( 'externalPornDirUrl' ), 'remove' );
                } else {
                    $( '[diridentifier=' + $( this ).attr( 'diridentifier' ) + ']' ).addClass( 'videodromeLocalFolderActive' );
                    processExternalFiles( $( this ).attr( 'externalPornDirUrl' ), 'add' );
                }
                checkVideodromeTagActive();
            } );

            $( document ).on( 'click', '#deselectAllVideodromeTags', function ( event ) {
                $( '.videodromeTagActive' ).removeClass( 'videodromeTagActive' );
                $( '.videodromeLocalFolderActive' ).each( function () {
                    $( '[diridentifier=' + $( this ).attr( 'diridentifier' ) + ']' ).removeClass( 'videodromeLocalFolderActive' );
                    processExternalFiles( $( this ).attr( 'externalPornDirUrl' ), 'remove' );
                } );
                loadActiveVideodromeTagsIntoList();
                displayAllActiveLocalFilenames();
                checkVideodromeTagActive();
            } );

            $( document ).on( 'click', '#selectAllVideodromeTags', function ( event ) {
                $( '.videodromeTagSelect' ).addClass( 'videodromeTagActive' );
                $( '[data-pornmaptag=General]' ).removeClass( 'videodromeTagActive' );
                $( '.videodromeLocalFolderActive' ).each( function () {
                    $( '[diridentifier=' + $( this ).attr( 'diridentifier' ) + ']' ).removeClass( 'videodromeLocalFolderActive' );
                    processExternalFiles( $( this ).attr( 'externalPornDirUrl' ), 'remove' );
                } );
                loadActiveVideodromeTagsIntoList();
                displayAllActiveLocalFilenames();
                checkVideodromeTagActive();
            } );

            $( '.videodromeTagSelect' ).click( function ( e ) {
                $( '[data-pornmaptag|=\'' + $( this ).attr( 'data-pornmaptag' ) + '\']' ).toggleClass( 'videodromeTagActive' );
                loadActiveVideodromeTagsIntoList();
                displayAllActiveLocalFilenames();
                checkVideodromeTagActive();
            } );

            // VideoDrome Director mode section
            // Enters a mode in which videos are switched automatically

            // TODO
            // change timings - random, slow, fast, VIA PLUS MINUS ???
            // RANGE INPUT with Min Max as Duration
            // change currently running video with some new video (jump to next video already loaded and replace current one)
            // manually skip to next video ??
            // automatically change video after x seconds for something completly new (shuffle symbol) (if not visible)
            // "resume" displays next video immediality
            // include streaming window if in front OR make sure streaming window is not visible
            // count how often every video has been displayed and replace after threshold reached?!

            $( document ).on( 'click', '#videoDromeDirectorStartStandard', function ( e ) {
                e.preventDefault();
                startDirectorMode();
            } );

            $( document ).on( 'click', '#videodromeDirectorStayWithCurrentVideo', function ( e ) {
                e.preventDefault();
                $( '#videodromeDirectorResume' ).show();
                $( '#videodromeDirectorStayWithCurrentVideo' ).hide();

                clearInterval( videoDromeDirectorInterval );
                videoDromeDirectorInterval = '';
            } );

            $( document ).on( 'click', '#videodromeDirectorResume', function ( e ) {
                e.preventDefault();
                $( '#videodromeDirectorResume' ).hide();
                $( '#videodromeDirectorStayWithCurrentVideo' ).show();

                setDirectorModeInterval();
            } );

            $( document ).on( 'click', '#videodromeDirectorReloadCurrentVideo', function ( e ) {
                e.preventDefault();
                loadVideoDromeOneWindowRefresh( $( '.videodromeFullscreen' ).attr( 'target' ) );
                setDirectorModeInterval();
            } );

            $( document ).on( 'click', '#videodromeDirectorReloadAllVideos', function ( e ) {
                e.preventDefault();
                $( '#refreshVideoDromeVideoAll' ).trigger( 'click' );
                setDirectorModeInterval();
            } );

            $( document ).on( 'click', '#videodromeDirectorShuffle', function ( e ) {
                e.preventDefault();
                // $( '#refreshVideoDromeVideoAll' ).trigger( 'click' );
                setDirectorModeInterval();
            } );

            $( document ).on( 'click', '#videodromeDirectorTimingsSlow', function ( e ) {
                e.preventDefault();
                clearInterval( videoDromeDirectorInterval );
                videoDromeDirectorInterval = '';
                videoDromeDirectorDurationMin = 7000;
                videoDromeDirectorDurationMax = 20000;
                setIconActive( e, 'directorTimingIconActive' );
                setDirectorModeInterval();
            } );

            $( document ).on( 'click', '#videodromeDirectorTimingsRandom', function ( e ) {
                e.preventDefault();
                clearInterval( videoDromeDirectorInterval );
                videoDromeDirectorInterval = '';
                videoDromeDirectorDurationMin = videoDromeDirectorDurationMinDefault;
                videoDromeDirectorDurationMax = videoDromeDirectorDurationMaxDefault;
                setIconActive( e, 'directorTimingIconActive' );
                setDirectorModeInterval();
            } );

            $( document ).on( 'click', '#videodromeDirectorTimingsFast', function ( e ) {
                e.preventDefault();
                clearInterval( videoDromeDirectorInterval );
                videoDromeDirectorInterval = '';
                videoDromeDirectorDurationMin = 1000;
                videoDromeDirectorDurationMax = 2500;
                setIconActive( e, 'directorTimingIconActive' );
                setDirectorModeInterval();
            } );

            $( document ).on( 'mousemove wheel', '.videodromeFullscreen,.videodromeDirectorControlContainer,#videodromeFullscreenMenuLocalVideoContainer,#videodromeGlobalActionContainer,#videodromeFullscreenMenuLocalVideoContainerExtraOptions', function () {
                directorModeTemporaryPause = true;
                clearInterval( directorModeTemporaryPauseInterval );
                directorModeTemporaryPauseInterval = setInterval( function () {
                    directorModeTemporaryPause = false;
                }, 1500 );
            } );

            function startDirectorMode() {
                $( '#defaultLoadMode' ).trigger( 'click' );
                videoDromeDirectorModeActive = true;
                $( '.videodromeRefreshContainer' ).hide();
                $( '.videodromeDirectorControlContainer' ).show();
                videoDromeDirectorLastDisplayedTarget = randomIntFromInterval( 1, 4 );
                $( '.videoDromeVideo' + videoDromeDirectorLastDisplayedTarget.toString() ).addClass( 'videodromeFullscreen' );
                $( '.videodromeFullscreenMenuLocalVideoJSContainer' ).show();

                // if not running, start director mode
                if ( videoDromeDirectorInterval == '' ) {
                    clearInterval( videoDromeDirectorInterval );
                    setDirectorModeInterval();
                } else { // otherwise reload all videos instead
                    $( '#refreshVideoDromeVideoAll' ).trigger( 'click' );
                }
            }

            function setDirectorModeInterval() {
                $( '#videodromeDirectorResume' ).hide();
                $( '#videodromeDirectorStayWithCurrentVideo' ).show();
                videoDromeDirectorDuration = randomIntFromInterval( videoDromeDirectorDurationMin, videoDromeDirectorDurationMax );
                videoDromeDirectorInterval = setInterval( function () {
                    videoDromeDirectorDuration = randomIntFromInterval( videoDromeDirectorDurationMin, videoDromeDirectorDurationMax );
                    if ( !directorModeTemporaryPause ) {
                        setDirectorModeDisplayTarget();
                    }
                }, videoDromeDirectorDuration );
            }

            function setDirectorModeDisplayTarget() {
                $( '.videodromeFullscreen' ).removeClass( 'videodromeFullscreen' );
                $( '.videoDromeFrame' ).removeAttr( 'controls' );
                videoDromeDirectorLastDisplayedTarget = randomIntFromInterval( 1, 4, [videoDromeDirectorLastDisplayedTarget] );
                $( '.videoDromeVideo' + videoDromeDirectorLastDisplayedTarget.toString() ).addClass( 'videodromeFullscreen' );
                updateVideodromeFullscreenInfo();
            }

            function stopDirectorMode() {
                clearInterval( videoDromeDirectorInterval );
                videoDromeDirectorInterval = '';
                $( '.videodromeFullscreen' ).removeClass( 'videodromeFullscreen' );
                $( '.videoDromeFrame' ).removeAttr( 'controls' );
                videoDromeDirectorModeActive = false;
                $( '.videodromeRefreshContainer' ).show();
                $( '.videodromeDirectorControlContainer' ).hide();
                $( '#videodromeDirectorResume' ).hide();
                $( '#videodromeDirectorStayWithCurrentVideo' ).show();
                $( '.videodromeFullscreenMenuLocalVideoJSContainer' ).hide();
            }

            function seekWithinLocalVideo( event, targetVideoFrame, timeSkipDuration = 30 ) {
                $( '.videoDromeFrame' ).unbind( 'seeking' );
                setTimeout( function () {
                    $( '.videoDromeFrame' ).bind( 'seeking', syncTimeOfLinkedVideoContainer );
                }, 100 );

                if ( !$( '.videodromeFullscreen' )[0] ) {
                    $( '.' + targetVideoFrame ).addClass( 'videodromeFullscreenTemp' );
                }

                $( '.videoDromeFrame' ).prop( 'controls', 'controls' );
                clearInterval( videoSeekFullscreenInterval );
                videoSeekFullscreenInterval = setTimeout( function () {
                    $( '.videodromeFullscreenTemp' ).removeClass( 'videodromeFullscreenTemp' );
                    $( '.videoDromeFrame' ).removeAttr( 'controls' );
                }, videoSeekFullscreenDuration );

                originalTime = '';
                $( '[src="' + $( '.' + targetVideoFrame ).find( '.videoSource' ).attr( 'src' ) + '"]' ).parent().each( function () {
                    if ( originalTime == '' ) {
                        originalTime = $( this )[0].currentTime;
                    }
                    if ( event.originalEvent.deltaY > 0 ) { // going down
                        $( this )[0].currentTime = originalTime - timeSkipDuration;
                    } else { // going up
                        $( this )[0].currentTime = originalTime + timeSkipDuration;
                    }
                } );
            }

            function syncTimeOfLinkedVideoContainer( e ) {
                $( '.videoDromeFrame' ).unbind( 'seeking' );
                setTimeout( function () {
                    $( '.videoDromeFrame' ).bind( 'seeking', syncTimeOfLinkedVideoContainer );
                }, 100 );

                toBeSyncedTime = $( this )[0].currentTime;

                $( '[src="' + $( this ).find( '.videoSource' ).attr( 'src' ) + '"]' ).parent().each( function () {
                    $( this )[0].currentTime = toBeSyncedTime;
                } );
            }

            function loadVideoDromeOneWindowRefresh( target ) {
                if ( videodromeLoadModeRandom ) {
                    videodromeLoadMode = randomIntFromInterval( 1, 4 ).toString();
                }

                if ( config['pornMap'] != undefined && config['pornMap'].length > 0 ) {
                    switch ( videodromeLoadMode ) {
                        case '1':
                            loadLocalVideoIntoTargetWindow( [target] );
                            break;
                        case '2':
                        case '3':
                        case '4':
                            loadLocalVideoIntoTargetWindow( [target, videodromeLoadModeMapping[videodromeLoadMode][target]] );
                            break;
                    }
                }
            }

            function checkIfCurrentVideoAlreadyTagged() {
                $( '.videoTaggingButtonActive' ).removeClass( 'videoTaggingButtonActive' );
                currentVideo = $( '.videodromeFullscreen' ).find( '.videoSource' ).attr( 'src' ).replace( 'pornRoot\/', '' ).replace( /\..*/, '' ).replaceAll( '/', '%2F' ).replaceAll( ' ', '' ).replaceAll( '\'', '' ).replaceAll( '%20', '' );
                $.each( config['pornMap'], function ( index, val ) {
                    potentialTarget = val.file.replace( 'pornRoot\/', '' ).replace( /\..*/, '' ).replaceAll( '/', '%2F' ).replaceAll( ' ', '' ).replaceAll( '\'', '' ).replaceAll( '%20', '' );
                    if ( potentialTarget.indexOf( currentVideo ) >= 0 ) {
                        tags = val.tag.split( ',' );
                        $.each( tags, function ( i ) {
                            $( '.videoTag' + tags[i] ).addClass( 'videoTaggingButtonActive' );
                        } );
                        return;
                    }
                } );
            }

            function loadLocalVideoIntoTargetWindow( targets ) {
                if ( superShuffleModeActive ) {
                    if ( externalPornFilesTemp.length <= 0 ) {
                        externalPornFilesTemp = externalPornFiles;
                    }
                    randomNumber = Math.floor( Math.random() * (parseInt( externalPornFilesTemp.length )) );

                    targets.forEach( function ( target ) {
                        $( '.' + target ).find( '.videoSource' ).attr( 'src', externalPornFilesTemp[randomNumber] + '#t=60' );
                    } );

                    externalPornFilesTemp.splice( randomNumber, 1 );
                } else {
                    randomNumber = Math.floor( Math.random() * (parseInt( selectableVideodromeFilesFromTagAndFolders.length )) );
                    while ( alreadySelectedVideosVideodrome.indexOf( randomNumber ) !== -1 ) {
                        randomNumber = Math.floor( Math.random() * (parseInt( selectableVideodromeFilesFromTagAndFolders.length )) );
                        if ( alreadySelectedVideosVideodrome.length >= selectableVideodromeFilesFromTagAndFolders.length - 1 ) {
                            alreadySelectedVideosVideodrome = [];
                        }
                    }
                    alreadySelectedVideosVideodrome.push( randomNumber );

                    targets.forEach( function ( target ) {
                        $( '.' + target ).find( '.videoSource' ).attr( 'src', selectableVideodromeFilesFromTagAndFolders[randomNumber] );
                    } );
                }
                targets.forEach( function ( target ) {
                    $( '.' + target ).find( '.localVideo' )[0].load();
                    $( '.' + target ).find( '.localVideo' )[0].play();
                } );
            }

            function getAllExternalPornDirs( url ) {
                $.ajax( {
                    url    : url,
                    success: function ( data ) {
                        $( data ).find( 'td > a' ).each( function () {
                            if ( $( this ).html() != 'Parent Directory' ) {
                                tempFilename = $( this ).attr( 'href' );
                                if ( tempFilename.indexOf( '/' ) >= 0 && tempFilename != '/' ) {
                                    externalPornDirs[url + tempFilename] = decodeURIComponent( tempFilename.replace( '/', '' ) );
                                    getAllExternalPornDirs( url + tempFilename );
                                } else if ( $.inArray( tempFilename.split( '.' ).pop().toLowerCase(), allowedVideoFileExtensions ) > -1 ) {
                                    externalPornFiles.push( url + tempFilename );
                                }
                            }
                        } );
                        displayExternalPornDirs();
                    }
                } );
            }

            function displayExternalPornDirs() {
                $( '.externalVideoDirSelection' ).empty();
                $.each( externalPornDirs, function ( url, displayName ) {
                    let nodeImage = document.createElement( 'img' );
                    nodeImage.classList.add( 'externalPornDirImage' );
                    nodeImage.setAttribute( 'src', url + 'preview.jpg' );
                    nodeImage.setAttribute( 'onerror', 'this.src=\'assets/preview_blank.jpg\'' );

                    let nodeName = document.createElement( 'span' );
                    nodeName.classList.add( 'externalPornDirName' );
                    nodeName.innerHTML = displayName;

                    let nodeFolder = document.createElement( 'span' );
                    nodeFolder.classList.add( 'externalPornDir' );
                    nodeFolder.classList.add( 'videodromeLocalVideoMenuItem' );
                    nodeFolder.setAttribute( 'dirIdentifier', displayName.replaceAll( ' ', '' ).replaceAll( '-', '' ) );
                    nodeFolder.setAttribute( 'externalPornDirUrl', url );

                    nodeFolder.append( nodeImage );
                    nodeFolder.append( nodeName );
                    $( '.externalVideoDirSelection' ).append( nodeFolder );
                } );
            }

            function processExternalFiles( url, mode ) {
                externalFiles = [];
                alreadySelectedVideosVideodrome = [];
                $.ajax( {
                    url    : url,
                    success: function ( data ) {
                        $( data ).find( 'td > a' ).each( function () {
                            tempFilename = $( this ).attr( 'href' );
                            if ( tempFilename.indexOf( '/' ) >= 0 && tempFilename != '/' ) {
                            } else if ( tempFilename != '/' ) {
                                if ( $.inArray( tempFilename.split( '.' ).pop().toLowerCase(), allowedVideoFileExtensions ) > -1 ) {
                                    externalFiles.push( url + tempFilename );
                                }
                            }
                        } );

                        if ( mode == 'add' ) {
                            externalFiles.forEach( function ( url ) {
                                selectableVideodromeFilesFromFolders.push( url + '#t=60' );
                            } );
                        } else {
                            externalFiles.forEach( function ( url ) {
                                selectableVideodromeFilesFromFolders.splice( $.inArray( url + '#t=60', selectableVideodromeFilesFromFolders ), 1 );
                            } );
                        }

                        selectableVideodromeFilesFromTagAndFolders = [];
                        selectableVideodromeFilesFromFolders.forEach( function ( file ) {
                            selectableVideodromeFilesFromTagAndFolders.push( file );
                        } );
                        selectableVideodromeFilesFromTags.forEach( function ( file ) {
                            selectableVideodromeFilesFromTagAndFolders.push( file );
                        } );

                        displayAllActiveLocalFilenames();
                    }
                } );
            }

            function displayAllActiveLocalFilenames() {
                $( '#videodromeFullscreenMenuLocalVideoContainerExtraOptions' ).empty();
                $.each( selectableVideodromeFilesFromTagAndFolders, function ( val ) {
                    let localFilename = document.createElement( 'div' );
                    try {
                        localFilename.innerHTML = decodeURI( selectableVideodromeFilesFromTagAndFolders[val].replace( /\.\/media\/xxx\/videos\//, '' ).replace( /\.mp4.*/, '' ).replace( /\.m4v.*/, '' ).replace( /\.mov.*/, '' ).replace( /\.mkv.*/, '' ).replace( config['externalRootDirs']['pornRootDir'], '' ).replace( /\.\/media\/xxx\//, '' ).replace( /\.\//, '' ).replace( /.*\//, '' ) );
                        localFilename.setAttribute( 'src', selectableVideodromeFilesFromTagAndFolders[val] );
                        localFilename.classList.add( 'localFilename' );
                        document.getElementById( 'videodromeFullscreenMenuLocalVideoContainerExtraOptions' ).appendChild( localFilename );
                    } catch ( e ) {
                        throw 'FILENAME PARSING ERROR: ' + selectableVideodromeFilesFromTagAndFolders[val];
                    }
                } );

                if ( selectableVideodromeFilesFromTagAndFolders.length > 0 && $( '.videodromeFullscreen' )[0] ) {
                    $( '#videodromeFullscreenMenuLocalVideoContainerExtraOptions' ).show();
                } else {
                    $( '#videodromeFullscreenMenuLocalVideoContainerExtraOptions' ).hide();
                }

                alreadySelectedVideosVideodrome = [];
            }

            function removeItemFromStreamFavorites( identifier ) {
                tempVideodromeFavorites = {'items': []};
                $.each( videodromeFavorites['items'], function ( key, value ) {
                    if ( value['videoPagePosterUrl'] != identifier ) {
                        tempVideodromeFavorites['items'].push( value );
                    }
                } );
                videodromeFavorites = tempVideodromeFavorites;
                localStorage.setItem( 'videodromeFavorites', JSON.stringify( videodromeFavorites['items'] ) );
            }

            function updateVideodromeFullscreenInfo() {
                if ( $( '.videodromeFullscreen' ).parent().hasClass( 'videodromeStreamVideoContainer' ) ) {
                    $( '.videodromeFullscreen' ).each( function () {
                        if ( $( this ).is( ':visible' ) ) {
                            $( '.videodromeFullscreenFilename' ).html( $( this ).parent().attr( 'data-videoTitel' ) );

                            switch ( selectedVideoStreamService ) {
                                case 'XV':
                                    $( '.videodromeFullscreenDownloadVideoLink' ).attr( 'href', 'https://www.locoloader.com/' );
                                    break;
                                case 'PH':
                                default:
                                    $( '.videodromeFullscreenDownloadVideoLink' ).attr( 'href', 'https://yesdownloader.com/en1/' );
                            }
                            $( '#switchStreamingService' ).html( selectedVideoStreamService );

                            $( '.videodromeFullscreenDownloadVideoLink' ).attr( 'videoUrl', $( this ).parent().attr( 'data-videopageurl' ) );

                            $( '#videodromeFullscreenModelLinks' ).empty();
                            if ( $( this ).parent().attr( 'data-modelLinks' ) != undefined && $( this ).parent().attr( 'data-modelLinks' ) != '' ) {
                                modelLinks = $( this ).parent().attr( 'data-modelLinks' ).split( ',' );
                                $.each( modelLinks, function ( index, val ) {
                                    let node = document.createElement( 'div' );
                                    node.classList.add( 'videoJSStreamModelname' );
                                    node.innerHTML = val.replaceAll( 'https://www.pornhub.com/', '' ).replaceAll( 'channels/', '' ).replaceAll( 'model/', '' ).replaceAll( 'pornstar/', '' ).replaceAll( '/videos', '' ).replaceAll( 'https://www.xvideos.com/', '' ).replaceAll( 'models/', '' ).replaceAll( 'pornstars/', '' ).replaceAll( 'amateurs/', '' ).replaceAll( 'profiles/', '' );
                                    node.setAttribute( 'modellink', val );
                                    document.getElementById( 'videodromeFullscreenModelLinks' ).appendChild( node );
                                } );
                            }
                        }
                    } );
                } else if ( $( '.videodromeFullscreen' ).find( '.videoSource' ).attr( 'src' ) != '' ) {
                    try {
                        $( '.videodromeFullscreenFilename' ).html( decodeURI( $( '.videodromeFullscreen' ).find( '.videoSource' ).attr( 'src' ).replace( /\.\/media\/xxx\/videos\//, '' ).replace( /\.mp4.*/, '' ).replace( /\.m4v.*/, '' ).replace( /\.mov.*/, '' ).replace( /\.mkv.*/, '' ).replace( config['externalRootDirs']['pornRootDir'], '' ) ) );
                    } catch ( e ) {
                    }
                } else {
                    $( '.videodromeFullscreenFilename' ).html( '' );
                }
            }

            function initVideodrome() {
                if ( config['pornMap'] != undefined ) {
                    $( '.videodromeLocalFolderActive' ).removeClass( 'videodromeLocalFolderActive' );
                    $( '.videodromeTagActive' ).removeClass( 'videodromeTagActive' );
                    $( '.videodromeFirstActiveTag' ).addClass( 'videodromeTagActive' );
                    loadActiveVideodromeTagsIntoList();
                    getAllExternalPornDirs( config['externalRootDirs']['pornRootDir'] );
                    var videosToShow = [];

                    while ( videosToShow.length < 4 ) {
                        randomNumber = Math.floor( Math.random() * (parseInt( selectableVideodromeFilesFromTagAndFolders.length )) );
                        if ( videosToShow.indexOf( randomNumber ) == -1 ) {
                            videosToShow.push( randomNumber );
                            alreadySelectedVideosVideodrome.push( randomNumber );
                            $( '.videoDromeVideo' + videosToShow.length ).find( '.videoSource' ).attr( 'src', selectableVideodromeFilesFromTagAndFolders[randomNumber] );
                            $( '.videoDromeVideo' + videosToShow.length ).find( '.localVideo' )[0].load();
                            $( '.videoDromeVideo' + videosToShow.length ).find( '.localVideo' )[0].play();
                        }
                        if ( selectableVideodromeFilesFromTagAndFolders.length == videosToShow.length ) {
                            break;
                        }
                    }

                    // after first init of videos with "general", deactivate general tag
                    $( '.videodromeTagActive' ).removeClass( 'videodromeTagActive' );
                    loadActiveVideodromeTagsIntoList();
                    displayAllActiveLocalFilenames();
                } else {
                    $( '.toggleLocalStreamIcon' ).hide();
                    $( '#videodromeLeftToolbarTrigger' ).remove();
                    $( '#videodromeLoadModeSelectContainer' ).remove();
                    $( '#videoDromeDirectorStartStandard' ).remove();
                }

                videodromeFavorites['items'] = JSON.parse( localStorage.getItem( 'videodromeFavorites' ) ) || [];
                outputPHFavorites();
                // getNextVideoStreamUrl( true, lastUsedVideoStreamSearchUrl );
            }

            function loadActiveVideodromeTagsIntoList() {
                selectableVideodromeFilesFromTags = [];
                selectableVideodromeFilesFromTagAndFolders = [];
                tempObject = [];
                $( '.videodromeTagActive' ).each( function () {
                    tag = $( this ).attr( 'data-pornMapTag' );
                    $.each( config['pornMap'], function ( index, val ) {
                        if ( val.tag.indexOf( tag ) >= 0 ) {
                            tempObject[val.file] = val.tag;
                        }
                    } );
                } );

                $.each( Object.keys( tempObject ), function ( index, file ) {
                    selectableVideodromeFilesFromTags.push( file );
                    selectableVideodromeFilesFromTagAndFolders.push( file );
                } );
                selectableVideodromeFilesFromFolders.forEach( function ( url ) {
                    selectableVideodromeFilesFromTagAndFolders.push( url );
                } );
            }

            function forcePlaybackVideodrome() {
                $( '#videodromeContainer .localVideo' ).each( function () {
                    $( this )[0].play();
                } );
            }

            function stopPlaybackVideodrome() {
                blockScreenSaver = false;
                $( '#videodrome' ).hide();
                $( '#videodromeUI' ).hide();
                $( '#videodromeContainer .localVideo' ).each( function () {
                    $( this )[0].pause();
                } );

                clearInterval( videodromePlayInterval );
            }

            function outputPHFavorites() {
                $( '#videodromeFavorites' ).empty();
                var favorites = '';
                $.each( videodromeFavorites['items'], function ( key, value ) {
                    let favoriteItemContainer = document.createElement( 'span' );
                    favoriteItemContainer.classList.add( 'videoJSFavoriteContainer' );
                    document.getElementById( 'videodromeFavorites' ).appendChild( favoriteItemContainer );

                    let favoriteItem = document.createElement( 'img' );
                    favoriteItem.classList.add( 'videoJSFavorite' );
                    favoriteItem.setAttribute( 'src', value['videoPagePosterUrl'] );
                    favoriteItem.setAttribute( 'data-videoPageUrl', value['videoPageUrl'] );
                    favoriteItemContainer.appendChild( favoriteItem );

                    let videostreamFavoriteItemDeleteSymbol = document.createElement( 'span' );
                    videostreamFavoriteItemDeleteSymbol.classList.add( 'videostreamFavoriteItemDeleteSymbol' );
                    favoriteItemContainer.appendChild( videostreamFavoriteItemDeleteSymbol );
                } );

                $( '#lockDeleteVideodromeFavorites' ).hide();
                if ( showVideostreamFavoriteItemDeleteSymbol ) {
                    $( '.videostreamFavoriteItemDeleteSymbol' ).show();
                    $( '#lockDeleteVideodromeFavorites' ).show();
                }
            }

            function getNextVideoStreamUrl( newSearch = false, searchUrl = createSearchUrl(), retry = true, isSingleVideoPage = false ) {
                if ( newSearch ) {
                    videoJSHubUrls = [];
                    videoJSSingleVideoUrls = [];
                    activePageCrawls = 0;
                    videoJSLoadAfterFind = true;
                }

                if ( activePageCrawls <= 2 ) {
                    activePageCrawls++;

                    // Hub crawl - is triggered when doing a new search on a default url, a specific model page or a search term
                    // Finds all linked videos once and pushes them into videoJSHubUrls. From this array all future video urls are extracted until a new search is triggered
                    if ( (newSearch || videoJSHubUrls.length <= 0) && !isSingleVideoPage ) {
                        $.ajax( {
                            url    : searchUrl,
                            type   : 'GET',
                            success: function ( originalData ) {
                                data = $( originalData ).clone();
                                $( '#videodromeErrorMessage' ).html( '' );

                                switch ( selectedVideoStreamService ) {
                                    case 'XV':
                                        var videosFound = false;

                                        // TODO cleanup page before searching
                                        /*                                        $( data ).find( '#header' ).each( function () {
                                                                                    $( this ).remove();
                                                                                } );*/

                                        $( data ).find( '.thumb-block' ).each( function () {
                                            url = 'https://www.xvideos.com' + $( this ).find( '.thumb' ).find( 'a' ).attr( 'href' );
                                            if ( videoJSHubUrls.indexOf( url ) === -1 ) {
                                                videoJSHubUrls.push( url );
                                            }
                                            videosFound = true;
                                        } );

                                        // TODO what to do if no video found?
                                        /*                              if ( !videosFound ) {
                                                                          $( data ).find( '.pcVideoListItem' ).each( function () {
                                                                              if ( $( this ).find( '.rating-container' ).find( '.value' ).html().replace( '%', '' ) >= 80 ) {
                                                                                  url = 'https://www.pornhub.com/view_video.php?viewkey=' + $( this ).attr( 'data-video-vkey' );
                                                                                  if ( videoJSHubUrls.indexOf( url ) === -1 ) {
                                                                                      videoJSHubUrls.push( url );
                                                                                  }
                                                                              }
                                                                          } );
                                                                      }*/
                                        break;

                                    case 'PH':
                                    default:
                                        var videosFound = false;
                                        $( data ).find( '#header' ).each( function () {
                                            $( this ).remove();
                                        } );

                                        $( data ).find( '.nf-videos' ).find( '.pcVideoListItem' ).each( function () {
                                            if ( $( this ).find( '.rating-container' ).find( '.value' ).html().replace( '%', '' ) >= 80 ) {
                                                url = 'https://www.pornhub.com/view_video.php?viewkey=' + $( this ).attr( 'data-video-vkey' );
                                                if ( videoJSHubUrls.indexOf( url ) === -1 ) {
                                                    videoJSHubUrls.push( url );
                                                }
                                            }
                                            videosFound = true;
                                        } );

                                        if ( !videosFound ) {
                                            $( data ).find( '.pcVideoListItem' ).each( function () {
                                                if ( $( this ).find( '.rating-container' ).find( '.value' ).html().replace( '%', '' ) >= 80 ) {
                                                    url = 'https://www.pornhub.com/view_video.php?viewkey=' + $( this ).attr( 'data-video-vkey' );
                                                    if ( videoJSHubUrls.indexOf( url ) === -1 ) {
                                                        videoJSHubUrls.push( url );
                                                    }
                                                }
                                            } );
                                        }
                                }
                                activePageCrawls--;
                                getNextVideoStreamUrl( false, lastUsedVideoStreamSearchUrl );
                            },
                            error  : function ( data ) {
                                activePageCrawls--;
                                $( '#videodromeErrorMessage' ).html( data.status );
                                if ( data.status != '403' ) {
                                    if ( searchUrl.indexOf( '/videos' ) > 0 ) {
                                        getNextVideoStreamUrl( true, searchUrl.replace( '/videos', '' ) );
                                    } else if ( retry ) {
                                        getNextVideoStreamUrl( true, createSearchUrl( '', false ), false );
                                    }
                                }
                            }
                        } );
                    }

                    // Single Video crawl
                    // If there are video page links within videoJSHubUrls, we scan these pages and get the actual video url and some more
                    if ( (videoJSSingleVideoUrls.length <= 4 && videoJSHubUrls.length >= 1) || isSingleVideoPage ) {
                        if ( isSingleVideoPage ) {
                            singelVideoPageUrl = searchUrl;
                        } else {
                            singelVideoPageUrl = '';
                            for ( var i = videoJSHubUrls.length - 1; i >= 0; i-- ) {
                                singelVideoPageUrl = videoJSHubUrls.splice( Math.floor( Math.random() * videoJSHubUrls.length ), 1 );
                                break;
                            }
                        }

                        $.ajax( {
                            url    : singelVideoPageUrl,
                            type   : 'GET',
                            success: function ( data ) {
                                switch ( selectedVideoStreamService ) {
                                    case 'XV':
                                        var matchesStreamUrl = data.match( /html5player.setVideoHLS\(\'(https.*?m3u8.*?)\'/ );
                                        break;
                                    case 'PH':
                                    default:
                                        var matchesStreamUrl = data.match( /defaultQuality":true.*?(https.*?m3u8.*?)",/ );
                                }

                                if ( matchesStreamUrl != undefined && matchesStreamUrl[1] != undefined ) {
                                    if ( data.indexOf( 'Dieser Inhalt ist in deinem Land nicht' ) >= 0 ) {
                                        console.info( 'VIDEO IS GEOBLOCKED' );
                                        videodromeStreamRefreshVideo();
                                    } else {
                                        var singleVideoObject = {};
                                        singleVideoObject['videoPageUrl'] = singelVideoPageUrl;
                                        singleVideoObject['videoStreamUrl'] = matchesStreamUrl[1].replaceAll( '\\', '' );
                                        singleVideoObject['videoTitel'] = '';
                                        singleVideoObject['videoPagePosterUrl'] = '';
                                        singleVideoObject['modelLinks'] = '';

                                        switch ( selectedVideoStreamService ) {
                                            case 'XV':
                                                $( data ).find( '.page-title' ).each( function () {
                                                    singleVideoObject['videoTitel'] = $( this ).find( '#title-auto-tr' ).html();
                                                } );

                                                var reVideoPosterUrlTitel = /\"thumbnailUrl\"\: \[\"(https:.*\.jpg)\"\]/g;
                                                reVideoPosterUrlTitel = reVideoPosterUrlTitel.exec( data );
                                                if ( reVideoPosterUrlTitel ) {
                                                    singleVideoObject['videoPagePosterUrl'] = reVideoPosterUrlTitel[1];
                                                }

                                                $( data ).find( '.profile' ).each( function () {
                                                    if ( singleVideoObject['modelLinks'].indexOf( $( this ).attr( 'href' ) ) === -1 ) {
                                                        singleVideoObject['modelLinks'] = singleVideoObject['modelLinks'] + 'https://www.xvideos.com' + $( this ).attr( 'href' ) + ',';
                                                    }
                                                } );

                                                // TODO DOES NOT WORK FOR PROFILE PAGES CURRENTLY
                                                /*                                                $( data ).find( '.uploader-tag' ).each( function () {
                                                                                                    if ( singleVideoObject['modelLinks'].indexOf( $( this ).attr( 'href' ) ) === -1 ) {
                                                                                                        singleVideoObject['modelLinks'] = singleVideoObject['modelLinks'] + 'https://www.xvideos.com' + $( this ).attr( 'href' ) + ',';
                                                                                                    }
                                                                                                } );*/
                                                break;
                                            case 'PH':
                                            default:
                                                var reVideoTitel = /\<span class="inlineFree">(.*?)\<\/span\>/g;
                                                reVideoTitel = reVideoTitel.exec( data );
                                                if ( reVideoTitel ) {
                                                    singleVideoObject['videoTitel'] = reVideoTitel[1];
                                                }

                                                var reVideoPosterUrlTitel = /\<img src="(.*?)".*?id="videoElementPoster".*?>/g;
                                                reVideoPosterUrlTitel = reVideoPosterUrlTitel.exec( data );
                                                if ( reVideoPosterUrlTitel ) {
                                                    singleVideoObject['videoPagePosterUrl'] = reVideoPosterUrlTitel[1];
                                                }

                                                $( data ).find( '.pstar-list-btn' ).each( function () {
                                                    if ( singleVideoObject['modelLinks'].indexOf( $( this ).attr( 'href' ) ) === -1 ) {
                                                        singleVideoObject['modelLinks'] = singleVideoObject['modelLinks'] + 'https://www.pornhub.com' + $( this ).attr( 'href' ) + '/videos,';
                                                    }
                                                } );

                                                $( data ).find( '.video-detailed-info' ).find( '.usernameBadgesWrapper' ).find( 'a' ).each( function () {
                                                    if ( singleVideoObject['modelLinks'].indexOf( $( this ).attr( 'href' ) ) === -1 ) {
                                                        singleVideoObject['modelLinks'] = singleVideoObject['modelLinks'] + 'https://www.pornhub.com' + $( this ).attr( 'href' ) + '/videos,';
                                                    }
                                                } );

                                                $( data ).find( '.video-detailed-info' ).find( 'a[data-label=channel]' ).each( function () {
                                                    if ( singleVideoObject['modelLinks'].indexOf( $( this ).attr( 'href' ) ) === -1 ) {
                                                        singleVideoObject['modelLinks'] = singleVideoObject['modelLinks'] + 'https://www.pornhub.com' + $( this ).attr( 'href' ) + '/videos,';
                                                    }
                                                } );
                                        }


                                        videoJSSingleVideoUrls.push( singleVideoObject );

                                        if ( videoJSLoadAfterFind && !isSingleVideoPage && videoJSSingleVideoUrls.length >= 2 ) {
                                            videoJSLoadAfterFind = false;
                                            loadNextVideoJSStream( 'videoJSPlayer2' );
                                            activeVideoJSPlayer = 'videoJSPlayer1';
                                            loadNextVideoJSStream( 'videoJSPlayer1' );
                                            playVideoJSStream( activeVideoJSPlayer );
                                            $( '.videoDromeStreamVideo1' ).show();
                                            $( '.videoDromeStreamVideo2' ).hide();
                                            updateVideodromeFullscreenInfo();
                                        } else if ( videoJSLoadAfterFind && isSingleVideoPage && videoJSSingleVideoUrls.length >= 1 ) {
                                            videoJSLoadAfterFind = false;
                                            loadNextVideoJSStream( 'videoJSPlayer1' );
                                            playVideoJSStream( 'videoJSPlayer1' );
                                            $( '.videoDromeStreamVideo1' ).show();
                                            $( '.videoDromeStreamVideo2' ).hide();
                                            updateVideodromeFullscreenInfo();

                                            // After playing the selected single favorite video, add all other favorites to playlist
                                            videoJSHubUrls = [];
                                            videoJSSingleVideoUrls = [];
                                            $.each( videodromeFavorites['items'], function ( key, value ) {
                                                videoJSHubUrls.push( value['videoPageUrl'] );
                                            } );
                                        }
                                        if ( !isSingleVideoPage && videoJSSingleVideoUrls.length <= 4 ) {
                                            getNextVideoStreamUrl( false, lastUsedVideoStreamSearchUrl );
                                        }
                                    }
                                } else {
                                    getNextVideoStreamUrl( false, lastUsedVideoStreamSearchUrl );
                                }
                                activePageCrawls--;
                                $( '#videodromeErrorMessage' ).html( '' );
                            },
                            error  : function ( data ) {
                                $( '#videodromeErrorMessage' ).html( data.status );
                                if ( data.status != '403' ) {
                                    videodromeStreamRefreshVideo();
                                }
                            }
                        } );
                    }
                }
            }

            function createSearchUrl( searchTerm = '', retry = true ) {
                switch ( selectedVideoStreamService ) {
                    case 'XV':
                        searchUrl = 'https://www.xvideos.com/tags/q:1080P/random/' + randomIntFromInterval( 1, 50 );
                        break;
                    case 'PH':
                    default:
                        searchUrl = 'https://www.pornhub.com/video?o=tr&min_duration=10&hd=1&exclude_category=104&page=' + randomIntFromInterval( 1, 5 );
                }

                if ( searchTerm != '' ) {
                    pageIndex = randomIntFromInterval( 1, 4 );
                    if ( !retry ) {
                        pageIndex = 1;
                    }
                    switch ( selectedVideoStreamService ) {
                        case 'XV':
                            searchUrl = 'https://www.xvideos.com/?k=' + encodeURIComponent( searchTerm ) + '&quality=hd&p=' + pageIndex;
                            break;
                        case 'PH':
                        default:
                            searchUrl = 'https://www.pornhub.com/video/search?hd=1&search=' + encodeURIComponent( searchTerm ) + '&page=' + pageIndex;
                    }
                }
                return searchUrl;
            }

            function playVideoJSStream( playerId ) {
                videoJSPlayer = videojs( document.querySelector( '#' + playerId ) );
                videoJSPlayer.play();
                videoJSPlayer.currentTime( 90 );
                videoJSPlayer.player_.handleTechClick_ = function () {
                    return;
                };
            }

            function loadNextVideoJSStream( playerId ) {
                if ( videoJSSingleVideoUrls.length >= 1 ) {
                    var singleVideoObject = videoJSSingleVideoUrls.pop();
                    $( '#' + playerId ).parent().attr( 'data-videoTitel', singleVideoObject['videoTitel'] );
                    $( '#' + playerId ).parent().attr( 'data-modelLinks', singleVideoObject['modelLinks'] );
                    $( '#' + playerId ).parent().attr( 'data-videoPageUrl', singleVideoObject['videoPageUrl'] );
                    $( '#' + playerId ).parent().attr( 'data-videoPagePosterUrl', singleVideoObject['videoPagePosterUrl'] );

                    var videoJSPlayer = videojs( document.querySelector( '#' + playerId ) );
                    videoJSPlayer.src( {
                        src : singleVideoObject['videoStreamUrl'],
                        type: 'application/x-mpegURL'
                    } );

                    videoJSPlayer.load();
                }
                getNextVideoStreamUrl( false, lastUsedVideoStreamSearchUrl );
            }

            function videodromeStreamRefreshVideo() {
                if ( activeVideoJSPlayer == 'videoJSPlayer1' ) {
                    loadNextVideoJSStream( 'videoJSPlayer1' );
                    activeVideoJSPlayer = 'videoJSPlayer2';
                    $( '.videoDromeStreamVideo1' ).hide();
                    $( '.videoDromeStreamVideo2' ).show();
                    playVideoJSStream( activeVideoJSPlayer );
                } else {
                    loadNextVideoJSStream( 'videoJSPlayer2' );
                    activeVideoJSPlayer = 'videoJSPlayer1';
                    $( '.videoDromeStreamVideo1' ).show();
                    $( '.videoDromeStreamVideo2' ).hide();
                    playVideoJSStream( activeVideoJSPlayer );
                }
                updateVideodromeFullscreenInfo();
            }

            function checkVideodromeTagActive() {
                if ( $( '.videodromeLocalFolderActive' ).length == 0 && $( '.videodromeTagActive' ).length == 0 ) {
                    superShuffleModeActive = true;
                    $( '#deselectAllVideodromeTags' ).attr( 'style', 'opacity:0.1' );
                } else {
                    superShuffleModeActive = false;
                    $( '#deselectAllVideodromeTags' ).attr( 'style', 'opacity:1' );
                }
            }

            function toggleLocalStreamVideo() {
                if ( $( '.videodromeFullscreen' )[0] && $( '#videoJSPlayer1,#videoJSPlayer2' ).is( ':visible' ) ) {
                    $( '.video-js' ).removeClass( 'videodromeFullscreen' );
                    $( '.videoDromeVideo2' ).addClass( 'videodromeFullscreen' );
                    $( '.videodromeFullscreenMenuVideoJSContainer' ).hide();
                    $( '.videodromeFullscreenMenuContainer' ).css( 'opacity', '0' );
                    $( '.videoDromeVideo2' ).addClass( 'videodromeFullscreen' );
                    $( '.videodromeFullscreenMenuLocalVideoJSContainer' ).show();
                    $( '.videoDromeVideo2' ).show();
                    $( '.videoDromeStreamVideo1' ).hide();
                    $( '.videoDromeStreamVideo2' ).hide();
                    $( '.videoDromeVideo2' ).find( '.videoDromeFrame' ).prop( 'controls', 'controls' );
                    $( '.video-js' ).removeClass( 'vjs-user-active' );
                    $( '.video-js' ).addClass( 'vjs-user-inactive' );
                    $( '.vjs-control-bar' ).css( 'display', 'none' );
                } else if ( $( '.videodromeFullscreen' )[0] && $( '.videoDromeVideo2' ).is( ':visible' ) ) {
                    $( '.video-js' ).addClass( 'videodromeFullscreen' );
                    $( '.videodromeFullscreenMenuLocalVideoJSContainer' ).hide();
                    $( '.video-js' ).addClass( 'videodromeFullscreen' );
                    $( '.videoDromeVideo2' ).removeClass( 'videodromeFullscreen' );
                    $( '.videodromeFullscreenMenuVideoJSContainer' ).show();
                    $( '.videoDromeVideo2' ).hide();
                    $( '.video-js' ).removeClass( 'vjs-user-inactive' );
                    $( '.video-js' ).addClass( 'vjs-user-active' );
                    $( '.vjs-control-bar' ).css( 'display', 'flex' );
                    videodromeStreamRefreshVideo();
                }

                if ( !$( '.videodromeFullscreen' )[0] ) {
                    $( '.videoDromeVideo2' ).toggle();
                    $( '.videoDromeStreamVideo1' ).toggle();
                    videodromeStreamRefreshVideo();
                }

                if ( $( '.videoDromeVideo2' ).is( ':visible' ) ) {
                    $( '#refreshVideoDromeVideo2' ).show();
                    $( '#videodromeStreamRefreshVideo' ).hide();
                    $( '#videoJSPlayer1,#videoJSPlayer2' ).hide();
                } else {
                    $( '#refreshVideoDromeVideo2' ).hide();
                    $( '#videodromeStreamRefreshVideo' ).show();
                    $( '#videoJSPlayer1,#videoJSPlayer2' ).show();
                }

                updateVideodromeFullscreenInfo();
            }

            function toggleTransparentStrobo( transparency = '0.2' ) {
                if ( transparency == $( '#videodrome' ).css( 'opacity' ) ) {
                    stopShrineDisco();
                } else {
                    $( '.mainSectionActive' ).removeClass( 'mainSectionActive' );
                    $( '#showShrineSection' ).addClass( 'mainSectionActive' );
                    $( '#videos' ).hide();
                    $( '#images' ).hide();
                    $( '#shrine' ).show();
                    $( '#games' ).hide();
                    $( '#search' ).hide();
                    $( '#mainMenu' ).attr( 'style', 'opacity:0' );

                    if ( window.pJSDom[0] == undefined ) {
                        particlesInit1();
                    }
                    showParticles = true;
                    $( '.particles-js-canvas-el' ).attr( 'style', 'opacity:1' );
                    startDiscoMode();
                    nextDiscoMode();

                    $( '#videodrome' ).css( 'opacity', transparency );
                }
            }

            // END Videodrome section
            // ******************************************

            // ******************************************
            // #8 - Private Picture Slideshow section

            if ( config['externalRootDirs'] != undefined && config['externalRootDirs']['privatePictureSlideshowRootDir'] != undefined ) {
                $( '#startPrivatePictureSlideshow' ).show();
            }

            $( '#startPrivatePictureSlideshow' ).click( function ( e ) {
                stopAllActions();
                enableFullscreen();
                blockScreenSaver = true;
                privatePictureSlideshowNextDirActiveThread = false;
                $( '#privatePictureSlideshow' ).css( 'cursor', 'none' );
                $( '#privatePictureSlideshow' ).show();

                if ( !privatePictureSlideshowInitiated ) {
                    privatePictureSlideshowInitiated = true;
                    initPrivatePictureSlideshow( config['externalRootDirs']['privatePictureSlideshowRootDir'] );
                } else {
                    clearInterval( privatePictureSlideshowTimer );
                    if ( privatePictureSlideshowEnabled ) {
                        privatePictureSlideshowTimer = setInterval( setNextPrivatePictureSlideshowImage, privatePictureSlideshowDurationPerImage );
                    }
                }
            } );

            $( '#privatePictureSlideshow' ).click( function ( e ) {
                if ( $( '#privatePictureSlideshow' ).is( ':visible' ) && !privatePictureSlideshowNextDirActiveThread ) {
                    privatePictureSlideshowNextDirActiveThread = true;
                    getNextPrivatePictureDir();
                }
            } );

            $( '#privatePictureOpenImageInTab' ).click( function ( e ) {
                e.stopPropagation();
                e.preventDefault();
                window.open( $( '#privatePictureSlideshowFullscreenImage' ).attr( 'src' ), '_blank' );
            } );

            var wheelScrolls = 0;
            setInterval( function () {
                wheelScrolls = 0;
            }, 1000 );
            $( document ).on( 'wheel', '#privatePictureSlideshow', function ( event ) {
                event.preventDefault();
                wheelScrolls++;
                if ( wheelScrolls > 1 ) {
                    return false;
                } else {
                    privatePictureDirContainer['picturesShown'] = 0;
                    if ( event.originalEvent.deltaY > 0 ) { // going down
                        setPreviousPrivatePictureSlideshowImage();
                    } else { // going up
                        setNextPrivatePictureSlideshowImage();
                    }
                }
            } );

            $( document ).on( 'mousemove', '#privatePictureSlideshowFullscreenContainer', function () {
                clearInterval( privatePictureSlideshowTimer );
                if ( privatePictureSlideshowEnabled ) {
                    privatePictureSlideshowTimer = setInterval( setNextPrivatePictureSlideshowImage, privatePictureSlideshowDurationPerImage );
                }
            } );

            $( document ).on( 'mousemove', '#privatePictureSlideshowOverlay', function () {
                clearInterval( privatePictureSlideshowTimer );
                $( '.videoMenuOverlay' ).show();
                $( '#privatePictureSlideshowOverlay' ).attr( 'style', 'opacity:1' );
                $( '#privatePictureSlideshow' ).css( 'cursor', 'url(\'../assets/rainbow-gradient-pointer-32x32.png\'), auto' );
            } );

            $( document ).on( 'mouseleave', '#privatePictureSlideshowOverlay', function () {
                if ( privatePictureSlideshowEnabled ) {
                    privatePictureSlideshowTimer = setInterval( setNextPrivatePictureSlideshowImage, privatePictureSlideshowDurationPerImage );
                }

                $( '.videoMenuOverlay' ).hide();
                $( '#privatePictureSlideshow' ).css( 'cursor', 'none' );
                $( '#privatePictureSlideshowOverlay' ).attr( 'style', 'opacity:0' );
            } );

            $( '#privatePictureSlideshowFullscreenImage' ).on( 'error', function () {
                if ( $( '#privatePictureSlideshowFullscreenContainer' ).is( ':visible' ) ) {
                    setNextPrivatePictureSlideshowImage();
                }
            } );

            $( '.privatePictureToggleSlideshowTimer' ).click( function ( e ) {
                e.stopPropagation();
                e.preventDefault();
                $( '.privatePictureToggleSlideshowTimer' ).toggle();
                clearInterval( privatePictureSlideshowTimer );
                if ( privatePictureSlideshowEnabled ) {
                    privatePictureSlideshowEnabled = false;
                    privatePictureSlideshowTimer = setInterval( setNextPrivatePictureSlideshowImage, 999999999 );
                } else {
                    privatePictureSlideshowEnabled = true;
                    privatePictureSlideshowTimer = setInterval( setNextPrivatePictureSlideshowImage, privatePictureSlideshowDurationPerImage );
                }
            } );

            function initPrivatePictureSlideshow( url ) {
                $.ajax( {
                    url    : url,
                    success: function ( data ) {
                        $( data ).find( 'td > a' ).each( function () {
                            if ( $( this ).html() != 'Parent Directory' ) {
                                tempFilename = $( this ).attr( 'href' );
                                if ( tempFilename.indexOf( '/' ) >= 0 && tempFilename != '/' ) {
                                    externalPrivatePictureDirs[url + tempFilename] = decodeURIComponent( url.replace( config['externalRootDirs']['privatePictureSlideshowRootDir'], '' ) + tempFilename.replace( '/', '' ) );
                                    getAllExternalPrivatePictureDirsThreadStarted++;
                                    initPrivatePictureSlideshow( url + tempFilename );
                                }
                            }
                        } );
                        getAllExternalPrivatePictureDirsThreadEnded++;
                        if ( getAllExternalPrivatePictureDirsThreadEnded == getAllExternalPrivatePictureDirsThreadStarted ) {
                            getNextPrivatePictureDir();
                        }
                    }
                } );
            }

            function stopPrivatePictureSlideshow() {
                blockScreenSaver = false;
                clearInterval( privatePictureSlideshowTimer );
                $( '.videoMenuOverlay' ).hide();
                $( '#privatePictureSlideshow' ).hide();
            }

            function getNextPrivatePictureDir() {
                // select some folder at random
                totalNumberOfPrivatePictureDirs = Object.keys( externalPrivatePictureDirs ).length;
                selectedDirNumber = randomIntFromInterval( 0, totalNumberOfPrivatePictureDirs - 1 );
                while ( alreadySelectedPrivatePictureDir.indexOf( selectedDirNumber ) !== -1 ) {
                    selectedDirNumber = randomIntFromInterval( 0, totalNumberOfPrivatePictureDirs - 1 );
                    if ( totalNumberOfPrivatePictureDirs <= alreadySelectedPrivatePictureDir.length + 1 ) {
                        alreadySelectedPrivatePictureDir = [];
                    }
                }
                alreadySelectedPrivatePictureDir.push( selectedDirNumber );

                tempCount = 0;
                $.each( externalPrivatePictureDirs, function ( dirPath, dirName ) {
                    if ( tempCount == selectedDirNumber ) {
                        privatePictureDirContainer['dirPath'] = dirPath;
                        privatePictureDirContainer['dirName'] = dirName;
                        privatePictureDirContainer['images'] = [];
                        privatePictureDirContainer['picturesShown'] = 0;
                        privatePictureDirContainer['prevImages'] = [];
                        privatePictureDirContainer['nextImages'] = [];
                        return false;
                    }
                    tempCount++;
                } );

                // find and add all images within this folder to the dirContainer
                $.ajax( {
                    url    : privatePictureDirContainer['dirPath'],
                    success: function ( data ) {
                        $( data ).find( 'td > a' ).each( function () {
                            tempFilename = $( this ).attr( 'href' );
                            if ( tempFilename.indexOf( '/' ) >= 0 && tempFilename != '/' ) {
                            } else if ( tempFilename != '/' ) {
                                if ( $.inArray( tempFilename.split( '.' ).pop().toLowerCase(), allowedImageFileExtensions ) > -1 ) {
                                    privatePictureDirContainer['images'].push( privatePictureDirContainer['dirPath'] + tempFilename );
                                }
                            }
                        } );
                        setNextPrivatePictureSlideshowImage( true );
                        privatePictureSlideshowNextDirActiveThread = false;
                    },
                    error  : function () {
                        privatePictureSlideshowNextDirActiveThread = false;
                    }
                } );
            }

            function setNextPrivatePictureSlideshowImage( freshDir = false ) {
                clearInterval( privatePictureSlideshowTimer );
                if ( $( '#privatePictureSlideshowOverlay' ).css( 'opacity' ) == 0 && privatePictureSlideshowEnabled ) {
                    privatePictureSlideshowTimer = setInterval( setNextPrivatePictureSlideshowImage, privatePictureSlideshowDurationPerImage );
                }

                if ( (privatePictureDirContainer['images'] == undefined || privatePictureDirContainer['images'].length <= 0 || privatePictureDirContainer['picturesShown'] >= privatePictureSlideshowImagesToShowPerFolder) && !privatePictureSlideshowNextDirActiveThread ) {
                    privatePictureSlideshowNextDirActiveThread = true;
                    getNextPrivatePictureDir();
                } else {
                    privatePictureDirContainer['picturesShown']++;
                    if ( $( '#privatePictureSlideshowFullscreenImage' ).attr( 'src' ) != '' && !freshDir ) {
                        privatePictureDirContainer['prevImages'].push( $( '#privatePictureSlideshowFullscreenImage' ).attr( 'src' ) );
                    }
                    if ( privatePictureDirContainer['nextImages'].length > 0 ) {
                        nextImage = privatePictureDirContainer['nextImages'].pop();
                    } else {
                        nextImage = privatePictureDirContainer['images'].splice( Math.floor( Math.random() * privatePictureDirContainer['images'].length ), 1 );
                    }
                    $( '#privatePictureSlideshowOverlayPicturePath' ).html( privatePictureDirContainer['dirName'] );
                    $( '#privatePictureSlideshowFullscreenImage' ).attr( 'src', nextImage );
                }
            }

            function setPreviousPrivatePictureSlideshowImage() {
                if ( privatePictureDirContainer['prevImages'].length > 0 ) {
                    privatePictureDirContainer['nextImages'].push( $( '#privatePictureSlideshowFullscreenImage' ).attr( 'src' ) );
                    $( '#privatePictureSlideshowFullscreenImage' ).attr( 'src', privatePictureDirContainer['prevImages'].pop() );
                }
            }


            // END Private Picture Slideshow section
            // ******************************************

            // ******************************************
            // #9 - Music Video Section
            if ( config['externalRootDirs'] != undefined && config['externalRootDirs']['musicVideosRootDir'] != undefined ) {
                $( '#startMusicVideos' ).show();
            }

            $( '#startMusicVideos' ).click( function ( e ) {
                stopAllActions();
                spotifyPause();
                enableFullscreen();
                blockScreenSaver = true;
                $( '#musicVideos' ).show();
                initMusicVideos( config['externalRootDirs']['musicVideosRootDir'] );
            } );

            $( '#musicVideoPlayer,#musicVideos' ).click( function ( e ) {
                setNextMusicVideo();
            } );

            $( '#musicVideoPlayer' ).on( 'ended', function () {
                setNextMusicVideo();
            } );

            $( document ).on( 'mousemove', '#musicVideos', function () {
                showMusicVideoOverlay();
            } );

            $( document ).on( 'wheel', '#musicVideos', function ( event ) {
                if ( $( '#musicVideoOverlayFileSelect' ).css( 'opacity' ) == 0 ) {
                    event.preventDefault();
                    if ( event.originalEvent.deltaY > 0 ) { // going down
                        $( '#musicVideoPlayer' )[0].currentTime = $( '#musicVideoPlayer' )[0].currentTime - 30;
                    } else { // going up
                        $( '#musicVideoPlayer' )[0].currentTime = $( '#musicVideoPlayer' )[0].currentTime + 30;
                    }
                }

            } );

            $( document ).on( 'click', '.musicVideoFilename', function () {
                setNextMusicVideo( $( this ).attr( 'src' ), $( this ).html() );
            } );

            function showMusicVideoOverlay() {
                clearTimeout( moveTimerMusicVideoOverlay );
                moveTimerMusicVideoOverlay = setTimeout( function () {
                    $( '#musicVideoOverlay' ).hide();
                }, 2000 );
                $( '#musicVideoOverlay' ).show();
            }

            function initMusicVideos( url ) {
                $.ajax( {
                    url    : url,
                    success: function ( data ) {
                        $( data ).find( 'td > a' ).each( function () {
                            if ( $( this ).html() != 'Parent Directory' ) {
                                tempFilename = $( this ).attr( 'href' );
                                if ( tempFilename.indexOf( '/' ) == -1 && tempFilename != '/' ) {
                                    externalMusicVideos[url + tempFilename] = decodeURIComponent( url.replace( config['externalRootDirs']['musicVideosRootDir'], '' ) + tempFilename.replace( '/', '' ).replace( '\.mp4', '' ).replace( /\.m4v.*/, '' ).replace( /\.mov.*/, '' ).replace( /\.mkv.*/, '' ) );
                                }
                            }
                        } );

                        $( '#musicVideoOverlayFileSelect' ).empty();
                        $.each( externalMusicVideos, function ( val ) {
                            let musicVideoFilename = document.createElement( 'div' );
                            musicVideoFilename.innerHTML = decodeURI( externalMusicVideos[val] );
                            musicVideoFilename.setAttribute( 'src', val );
                            musicVideoFilename.classList.add( 'musicVideoFilename' );
                            document.getElementById( 'musicVideoOverlayFileSelect' ).appendChild( musicVideoFilename );
                        } );

                        setNextMusicVideo();
                    }
                } );
            }

            function stopMusicVideos() {
                blockScreenSaver = false;
                $( '.videoMenuOverlay' ).hide();
                $( '#musicVideos' ).hide();
                $( '#musicVideoPlayer' )[0].pause();
            }

            function setNextMusicVideo( videoUrl = '', videoName = '' ) {
                if ( videoUrl == '' ) {
                    totalNumberOfMusicVideos = Object.keys( externalMusicVideos ).length;
                    selectedEntry = randomIntFromInterval( 0, totalNumberOfMusicVideos - 1 );
                    while ( alreadySelectedMusicVideos.indexOf( selectedEntry ) !== -1 ) {
                        selectedEntry = randomIntFromInterval( 0, totalNumberOfMusicVideos - 1 );
                        if ( totalNumberOfMusicVideos <= alreadySelectedMusicVideos.length + 1 ) {
                            alreadySelectedMusicVideos = [];
                        }
                    }
                    alreadySelectedMusicVideos.push( selectedEntry );

                    tempCount = 0;
                    $.each( externalMusicVideos, function ( videoUrl, videoName ) {
                        if ( tempCount == selectedEntry ) {
                            $( '#musicVideoPlayer' ).find( '.videoSource' ).attr( 'src', videoUrl );
                            $( '#musicVideoPlayer' )[0].load();
                            $( '#musicVideoPlayer' )[0].play();
                            $( '#musicVideoOverlayVideoName' ).html( videoName );
                            showMusicVideoOverlay();
                            return false;
                        }
                        tempCount++;
                    } )
                } else {
                    $( '#musicVideoPlayer' ).find( '.videoSource' ).attr( 'src', videoUrl );
                    $( '#musicVideoPlayer' )[0].load();
                    $( '#musicVideoPlayer' )[0].play();
                    $( '#musicVideoOverlayVideoName' ).html( videoName );
                    showMusicVideoOverlay();
                }
            }

            // END Music Video Section
            // ******************************************

            // ******************************************
            // #15 - Mind Journey Section
            $( '.mindJourneyCharSelectContainer' ).click( function ( event ) {
                enableFullscreen();
                $( '#mindJourneyTriggerWordDisplay' ).addClass( 'invisible' );
                triggerWord = $( this ).attr( 'data-triggerWord' );
                mindJourneyCharActive = $( this ).attr( 'data-charName' );
                mindJourneyCharNumberActive = parseInt( $( this ).attr( 'data-mindJourneyCharNumber' ) ) + 1;

                if ( $( this ).find( '.mindJourneyCharNameSelectContainer' ).hasClass( 'mindJourneyCharActive' ) ) {
                    $( this ).find( '.mindJourneyCharNameSelectContainer' ).removeClass( 'mindJourneyCharActive' );
                    $( this ).find( '.mindJourneyCharSelectImage' ).attr( 'src', $( this ).find( '.mindJourneyCharSelectImage' ).attr( 'src' ).replace( '_white.png', '.png' ) );

                    mindJourneyCharActive = '';
                    $( '.mindJourneyElement' ).removeClass( 'mindJourneyElementHidden' );
                    $( '.mindJourneyElement' ).addClass( 'mindJourneyElementVisible' );
                } else {
                    $( '.mindJourneyCharActive' ).each( function () {
                        $( this ).removeClass( 'mindJourneyCharActive' );
                    } );
                    $( '.mindJourneyCharSelectImage' ).each( function () {
                        $( this ).attr( 'src', $( this ).attr( 'src' ).replace( '_white.png', '.png' ) );
                    } );

                    $( this ).find( '.mindJourneyCharNameSelectContainer' ).addClass( 'mindJourneyCharActive' );
                    $( this ).find( '.mindJourneyCharSelectImage' ).attr( 'src', $( this ).find( '.mindJourneyCharSelectImage' ).attr( 'src' ).replace( '.png', '_white.png' ) );

                    $( '.mindJourneyElement' ).addClass( 'mindJourneyElementHidden' );
                    $( '.mindJourneyElement' ).removeClass( 'mindJourneyElementVisible' );

                    setTimeout( function () {
                        $( '#mindJourneyTriggerWordDisplay' ).html( triggerWord );
                        $( '#mindJourneyTriggerWordDisplay' ).removeClass( 'invisible' );
                    }, 400 );

                    $( '.mindJourneyElement' ).each( function () {
                        if ( $( this ).attr( 'data-tag' ).indexOf( mindJourneyCharActive ) > -1 ) {
                            $( this ).removeClass( 'mindJourneyElementHidden' );
                            $( this ).addClass( 'mindJourneyElementVisible' );
                        } else {
                            $( this ).addClass( 'mindJourneyElementHidden' );
                            $( this ).removeClass( 'mindJourneyElementVisible' );
                        }
                    } );
                }
            } );

            $( '.incantationContainer ' ).click( function ( event ) {
                enableFullscreen();
                mindJourneyIncantationNumberActive = parseInt( $( this ).attr( 'data-mindJourneyIncantationNumber' ) ) + 1;
                if ( $( this ).hasClass( 'mindJourneyIncantationActive' ) ) {
                    $( '.mindJourneyIncantationActive' ).removeClass( 'mindJourneyIncantationActive' );
                    $( '#incantationProcessDisplay' ).html( '' );
                } else {
                    $( '.mindJourneyIncantationActive' ).removeClass( 'mindJourneyIncantationActive' );
                    $( this ).addClass( 'mindJourneyIncantationActive' );
                    $( '#incantationProcessDisplay' ).html( $( this ).attr( 'data-incantationProcess' ) );
                }
            } );

            $( document ).on( 'wheel', document, function ( event ) {
                if ( $( '#quickSelectGlobalMenuContainer' ).hasClass( 'menuTransition' ) && $( '#quickSelectGlobalMenuMindJourney' ).is( ':visible' ) ) {
                    if ( mindJourneyCharNumberActive == '' ) {
                        mindJourneyCharNumberActive = 4; // "Reisender"
                    } else if ( event.originalEvent.deltaY > 0 ) { // going down
                        mindJourneyCharNumberActive = mindJourneyCharNumberActive + 1;
                        if ( mindJourneyCharNumberActive > $( '.mindJourneyCharSelectContainer' ).length ) {
                            mindJourneyCharNumberActive = $( '.mindJourneyCharSelectContainer' ).length;
                        }
                    } else { // going up
                        mindJourneyCharNumberActive = mindJourneyCharNumberActive - 1;
                        if ( mindJourneyCharNumberActive <= 0 ) {
                            mindJourneyCharNumberActive = 1;
                        }
                    }

                    tempCounter = 0;
                    $( '.mindJourneyCharSelectContainer' ).each( function () {
                        tempCounter++;
                        if ( tempCounter == mindJourneyCharNumberActive && !$( this ).find( '.mindJourneyCharNameSelectContainer' ).hasClass( 'mindJourneyCharActive' ) ) {
                            $( this ).trigger( 'click' );
                        }
                    } );
                }

                if ( $( '#quickSelectGlobalMenuContainer' ).hasClass( 'menuTransition' ) && $( '#quickSelectGlobalMenuIncantations' ).is( ':visible' ) ) {
                    if ( event.originalEvent.deltaY > 0 ) { // going down
                        mindJourneyIncantationNumberActive = mindJourneyIncantationNumberActive + 1;
                        if ( mindJourneyIncantationNumberActive > $( '.incantationContainer' ).length ) {
                            mindJourneyIncantationNumberActive = $( '.incantationContainer' ).length;
                        }
                    } else { // going up
                        mindJourneyIncantationNumberActive = mindJourneyIncantationNumberActive - 1;
                        if ( mindJourneyIncantationNumberActive <= 0 ) {
                            mindJourneyIncantationNumberActive = 1;
                        }
                    }

                    tempCounter = 0;
                    $( '.incantationContainer' ).each( function () {
                        tempCounter++;
                        if ( tempCounter == mindJourneyIncantationNumberActive && !$( this ).hasClass( 'mindJourneyIncantationActive' ) ) {
                            $( this ).trigger( 'click' );
                        }
                    } );
                }

            } );
            // END Mind Journey Selection
            // ******************************************

            // ******************************************
            // #20 - initial init section
            if ( urlParams.get( 'section' ) != undefined && urlParams.get( 'section' ) == 'shrine' ) {
                $( '#meditativefilter' ).trigger( 'click' );
                $( '#showShrineSection' ).trigger( 'click' );
                $( '#mainMenu' ).attr( 'style', 'opacity:0' );
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

            // For debug only
            if ( config['localSettingsOverwrite'] != undefined && config['localSettingsOverwrite']['debugMode'] != undefined && config['localSettingsOverwrite']['debugMode'] ) {
                toggleXXXVisible();

                // $( '#showShrineSection' ).trigger( 'click' );
            }
        }
);