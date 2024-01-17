var redirect_uri = '';
var client_id = '';
var client_secret = '';
var access_token = null;
var refresh_token = null;
var currentPlaylist = '';
var radioButtons = [];
var lastSelectedPlaylist = 'spotify:playlist:0O1C7wbOthIxBbai9pYvEH';
var playingTrackDetectionDoneOnce = false;
var lastPlaylistId = '';

const AUTHORIZE = 'https://accounts.spotify.com/authorize'
const TOKEN = 'https://accounts.spotify.com/api/token';
const PLAYLISTS = 'https://api.spotify.com/v1/me/playlists';
const DEVICES = 'https://api.spotify.com/v1/me/player/devices';
const PLAY = 'https://api.spotify.com/v1/me/player/play';
const PAUSE = 'https://api.spotify.com/v1/me/player/pause';
const NEXT = 'https://api.spotify.com/v1/me/player/next';
const PREVIOUS = 'https://api.spotify.com/v1/me/player/previous';
const PLAYER = 'https://api.spotify.com/v1/me/player';
const TRACKS = 'https://api.spotify.com/v1/playlists/{{PlaylistId}}/tracks';
const CURRENTLYPLAYING = 'https://api.spotify.com/v1/me/player/currently-playing';
const SHUFFLE = 'https://api.spotify.com/v1/me/player/shuffle';
const REPEAT = 'https://api.spotify.com/v1/me/player/repeat';
const SEARCH = 'https://api.spotify.com/v1/search';

function handleRedirect( code ) {
    fetchAccessToken( code );
    window.history.pushState( '', '', redirect_uri ); // remove param from url
}

function requestAuthorization() {
    let url = AUTHORIZE;
    url += '?client_id=' + client_id;
    url += '&response_type=code';
    url += '&redirect_uri=' + encodeURI( redirect_uri );
    url += '&show_dialog=false';
    url += '&scope=user-modify-playback-state user-read-playback-position streaming user-read-playback-state playlist-modify-private';
    window.location.href = url; // Show Spotify's authorization screen
}

function fetchAccessToken( code ) {
    let body = 'grant_type=authorization_code';
    body += '&code=' + code;
    body += '&redirect_uri=' + encodeURI( redirect_uri );
    body += '&client_id=' + client_id;
    body += '&client_secret=' + client_secret;
    callAuthorizationApi( body );
}

function refreshAccessToken() {
    refresh_token = localStorage.getItem( 'refresh_token' );
    let body = 'grant_type=refresh_token';
    body += '&refresh_token=' + refresh_token;
    body += '&client_id=' + client_id;
    callAuthorizationApi( body );
}

function callAuthorizationApi( body ) {
    let xhr = new XMLHttpRequest();
    xhr.open( 'POST', TOKEN, true );
    xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
    xhr.setRequestHeader( 'Authorization', 'Basic ' + btoa( client_id + ':' + client_secret ) );
    xhr.send( body );
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse() {
    if ( this.status == 200 ) {
        var data = JSON.parse( this.responseText );
        if ( data.refresh_token != undefined ) {
            refresh_token = data.refresh_token;
            localStorage.setItem( 'refresh_token', refresh_token );
        }
        if ( data.access_token != undefined ) {
            access_token = data.access_token;
            localStorage.setItem( 'access_token', access_token );
        }
    } else if ( this.status == 400 || this.status == 401 || this.status == 403 ) {
        logoutSpotify();
    }
}

function refreshDevices() {
    callApi( 'GET', DEVICES, null, handleDevicesResponse );
}

function handleDevicesResponse() {
    if ( this.status == 200 ) {
        var data = JSON.parse( this.responseText );
        removeAllItems( 'devices' );

        data.devices.sort( function ( a, b ) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        } ).forEach( item => addDevice( item ) );

        if ( ($( '#devices' ).find( ':selected' ).text().toLowerCase().includes( config['spotifyMainPlayerName'].toLowerCase() ) || typeof $( '#devices option:contains("' + config['spotifyMainPlayerName'] + '")' ).val() == 'undefined') &&
                typeof $( '#devices option:contains("' + config['spotifyPhoneName'] + '")' ).val() != 'undefined' ) {
            $( '#switchDesktopPhone' ).attr( 'src', './assets/phone.png' );
            $( '#switchDesktopPhone' ).show();
        } else if ( !$( '#devices' ).find( ':selected' ).text().toLowerCase().includes( config['spotifyMainPlayerName'].toLowerCase() ) &&
                typeof $( '#devices option:contains("' + config['spotifyMainPlayerName'] + '")' ).val() != 'undefined' ) {
            $( '#switchDesktopPhone' ).attr( 'src', './assets/desktop.png' );
            $( '#switchDesktopPhone' ).show();
        } else {
            $( '#switchDesktopPhone' ).hide();
        }

        if ( typeof $( '#devices option:contains("' + config['spotifyBedroomName'] + '")' ).val() != 'undefined' ) {
            $( '#sleep' ).show();
        } else {
            $( '#sleep' ).hide();
        }

    } else if ( this.status == 401 ) {
       /* refreshAccessToken()*/
    } else {
    }
}

function addDevice( item ) {
    let node = document.createElement( 'option' );
    node.value = item.id;
    node.innerHTML = item.name;

    if ( item.is_active ) {
        node.selected = 'selected';
        node.setAttribute( 'selected', 'selected' );
    }

    document.getElementById( 'devices' ).appendChild( node );
}

function callApi( method, url, body, callback, async = true ) {
    let xhr = new XMLHttpRequest();
    xhr.open( method, url, async );
    xhr.setRequestHeader( 'Content-Type', 'application/json' );
    xhr.setRequestHeader( 'Authorization', 'Bearer ' + access_token );
    xhr.send( body );
    xhr.onload = callback;

    return true;
}

function refreshPlaylists() {
    callApi( 'GET', PLAYLISTS, null, handlePlaylistsResponse );
}

function handlePlaylistsResponse() {
    if ( this.status == 200 ) {
        var data = JSON.parse( this.responseText );
    } else if ( this.status == 401 ) {
     /*   refreshAccessToken()*/
    } else {
    }
}

function removeAllItems( elementId ) {
    let node = document.getElementById( elementId );
    while ( node.firstChild ) {
        node.removeChild( node.firstChild );
    }
}

function spotifyPlay( to_be_played = '' ) {
    let body = {};
    if ( jQuery.isArray( to_be_played ) ) { // Array of Tracks
        body.uris = [];
        $.each( to_be_played, function ( key, value ) {
            body.uris.push( value['uri'] );
        } );
    } else if ( to_be_played != '' ) {
        if ( !to_be_played.includes( 'track' ) ) { // Playlist
            body.context_uri = to_be_played;
        } else {
            body.uris = [to_be_played]; // Single Track
        }
    }

    if ( $( '#devices' ).find( ':selected' ).val() == 'undefined' || $( '#devices' ).find( ':selected' ).text().toLowerCase().includes( 'überall' ) ) {
        callApi( 'PUT', PLAY + '?device_id=' + $( '#devices option:contains("' + config['spotifyMainPlayerName'] + '")' ).val(), JSON.stringify( body ), handleApiResponse );
    } else {
        callApi( 'PUT', PLAY + '?device_id=' + $( '#devices' ).find( ':selected' ).val(), JSON.stringify( body ), handleApiResponse );
    }
}

function spotifyNext( playlist_id = '' ) {
    if ( $( '#devices' ).find( ':selected' ).val() == 'undefined' || $( '#devices' ).find( ':selected' ).text().toLowerCase().includes( 'überall' ) ) {
        let body = {};
        if ( playlist_id != '' ) {
            body.context_uri = playlist_id;
        }
        callApi( 'PUT', PLAY + '?device_id=' + $( '#devices option:contains("' + config['spotifyMainPlayerName'] + '")' ).val(), JSON.stringify( body ), handleNextApiResponse );
    } else {
        callApi( 'POST', NEXT, null, handleNextApiResponse );
    }
}

function spotifyAddToQueue( track ) {
    let body = {};
    body.uri = track;
    callApi( 'POST', 'https://api.spotify.com/v1/me/player/queue?uri=' + track, JSON.stringify( body ), handleApiResponse );
}

function handleNextApiResponse() {
    currentlyPlaying();
}

function shuffle( shuffle = true, async = true ) {
    if ( shuffle ) {
        callApi( 'PUT', SHUFFLE + '?state=true', null, handleApiResponse, async );
    } else {
        callApi( 'PUT', SHUFFLE + '?state=false', null, handleApiResponse, async );
    }
}

function repeat( state = 'context' ) {
    callApi( 'PUT', REPEAT + '?state=' + state, null, handleApiResponse );
}

function spotifyPause() {
    spotifySongRadioQueue = '';
    callApi( 'PUT', PAUSE, null, handleApiResponse );
}

function previous() {
    callApi( 'POST', PREVIOUS, null, handleApiResponse );
}

function transfer( deviceId ) {
    let body = {};
    body.device_ids = [];
    body.device_ids.push( deviceId )
    callApi( 'PUT', PLAYER, JSON.stringify( body ), handleTransferApiResponse );
}

function handleTransferApiResponse() {
/*    refreshAccessToken();*/
}

function handleCreateSongRadioApiResponse() {
    if ( this.status == 200 ) {
        spotifySongRadioQueue = JSON.parse( this.responseText )['tracks'];
    }
}

function handleApiResponse() {
    if ( this.status == 200 ) {
    } else if ( this.status == 204 ) {
    } else if ( this.status == 401 ) {
        /*refreshAccessToken()*/
    } else {
    }
}

function currentlyPlaying() {
    // If Spotify is not playing, we can check if a youtube video is running and display its runtime instead
    if ( !playingSpotifyTrack ) {
        updateProgressBar();
    }
    callApi( 'GET', PLAYER + '?market=US', null, handleCurrentlyPlayingResponse );
}

function getPlaylist( playlistNameRef ) {
    callApi( 'GET', playlistNameRef, null, handleCurrentPlaylistResponse );
}

function getPlaylistContent( playlistNameRef ) {
    callApi( 'GET', 'https://api.spotify.com/v1/playlists/' + playlistNameRef, null, handlePlaylistContentResponse );
}

function handleCurrentlyPlayingResponse() {
    try {
        var data = JSON.parse( this.responseText );

        try {
            updateProgressBar( data['item']['duration_ms'], data['progress_ms'], data['is_playing'] );
        } catch ( e ) {
        }

        if ( stopAfterTrack && spotifyPreviousProgressMs >= data['progress_ms'] ) {
            stopAfterTrack = false;
            spotifyPause();
            spotifyHasBeenPlayingBeforePause = false;
        } else if ( nextPlaylistToPlay != '' && spotifyPreviousProgressMs >= data['progress_ms'] ) {
            spotifyPlay( nextPlaylistToPlay );
            nextPlaylistToPlay = '';
        } else if ( spotifySongRadioQueue != '' && spotifyPreviousProgressMs >= data['progress_ms'] ) {
            spotifyPlay( spotifySongRadioQueue );
            spotifySongRadioQueue = '';
        }
        spotifyPreviousProgressMs = data['progress_ms'];

        if ( data['context'] != null && data['is_playing'] ) { // Playlist
            var playlistNameRef = data['context']['href'];
            lastSelectedPlaylist = data['context']['uri'];
            if ( lastPlaylistId == '' || lastPlaylistId != playlistNameRef || $( '#spotifyPlaylists' ).html() == '...' ) {
                getPlaylist( playlistNameRef );
            }
            lastPlaylistId = playlistNameRef;
        } else if ( data['is_playing'] != undefined && data['is_playing'] ) { // Single Track
            $( '#spotifyPlaylists' ).html( 'Song Radio' );
            lastSelectedPlaylist = data['item']['uri'];
        } else {
            $( '#spotifyPlaylists' ).html( 'Select Playlist' );
            lastPlaylistId = '';
        }

        if ( data['is_playing'] ) {
            $( '.spotifyCurrentlyPlayingContainer' ).addClass( 'spotifyCurrentlyPlayingContainerVisible' );
            $( '.currentTrackAction' ).removeClass( 'invisible' );

            try {
                $( '.spotifyCurrentlyPlayingTrack' ).html( data['item']['artists'][0]['name'] + ' - ' + data['item']['name'] );
                $( '.spotifyCurrentlyPlayingTrack' ).attr( 'data-spotify-id', data['item']['uri'] );
            } catch ( e ) {
                $( '.spotifyCurrentlyPlayingTrack' ).html( '...' );
            }

            playingSpotifyTrack = true;
            if ( !playingTrackDetectionDoneOnce ) {
                playingTrackDetectionDoneOnce = true;
                spotifyHasBeenPlayingBeforePause = true;
            }
        } else {
            $( '.spotifyCurrentlyPlayingContainer' ).removeClass( 'spotifyCurrentlyPlayingContainerVisible' );
            $( '.currentTrackAction' ).addClass( 'invisible' );
            playingSpotifyTrack = false;
        }
    } catch ( e ) {
        return false;
    }
}

function addTrackToPlaylist( playlist_id, track_id ) {
    let body = {};
    body.uris = [track_id];
    callApi( 'POST', 'https://api.spotify.com/v1/playlists/' + playlist_id + '/tracks', JSON.stringify( body ), handleApiResponse );
}

function createSongRadio( track_id ) {
    track_id = track_id.replace( 'spotify:track:', '' );
    callApi( 'GET', 'https://api.spotify.com/v1/recommendations?limit=50&seed_tracks=' + track_id, null, handleCreateSongRadioApiResponse );
}

function updateProgressBar( durationSpotify = 0, progressSpotify = 0, spotifyIsPlaying = false ) {
    percentageProgress = 1;
    if ( spotifyIsPlaying ) {
        percentageProgress = progressSpotify / durationSpotify;
    } else if ( directYoutubePlayerState == 'playing' ) {
        percentageProgress = directYoutubePlayer.getCurrentTime() / directYoutubePlayer.getDuration();
    } else if ( mainSearchResultYoutubePlayerState == 'playing' ) {
        percentageProgress = mainSearchResultYoutubePlayer.getCurrentTime() / mainSearchResultYoutubePlayer.getDuration();
    }

    if ( spotifyIsPlaying || directYoutubePlayerState == 'playing' || mainSearchResultYoutubePlayerState == 'playing' ) {
        $( '.trackProgress' ).show();
        percentageRemaining = 1 - percentageProgress;
        newWidth = $( window ).width() * percentageRemaining;
        $( '.trackProgress' ).attr( 'style', 'width:' + newWidth + 'px' );
    } else {
        $( '.trackProgress' ).hide();
    }
}

function handleCurrentPlaylistResponse() {
    var data = JSON.parse( this.responseText );
    if ( this.status == 200 ) {
        $( '#spotifyPlaylists' ).html( data['name'] );
    } else {
        $( '#spotifyPlaylists' ).html( 'Select Playlist' );
    }
}

function handlePlaylistContentResponse() {
    var data = JSON.parse( this.responseText );
    if ( this.status == 200 ) {
        populateTrackSelectionData[data['uri']] = data;
    }
}

function insertTracksIntoTrackSelectionMenu( data ) {
    $.each( data['tracks']['items'], function ( key, value ) {
        if ( value['track']['id'] != undefined ) {
            let trackContainer = document.createElement( 'div' );
            trackContainer.classList.add( 'spotifyTrackContainer' );
            trackContainer.classList.add( 'col-12' );

            trackContainer.id = value['track']['uri'];

            document.getElementById( data['uri'] ).appendChild( trackContainer );

            let trackName = document.createElement( 'span' );
            trackName.classList.add( 'spotifyTrackName' );
            trackName.innerHTML = value['track']['name'];
            trackContainer.appendChild( trackName );

            /*            let trackArtist = document.createElement( 'span' );
                        trackArtist.classList.add( 'spotifyTrackArtist' );
                        trackArtist.innerHTML = value['track']['artists'][0]['name'];
                        trackContainer.appendChild( trackArtist );*/
        }
    } );
}

function searchSpotify( searchTerm, type = 'track' ) {
    callApi( 'GET', SEARCH + '?q=' + searchTerm + '&type=' + type, null, handleSearchResponse );
}

function handleSearchResponse() {
    var data = JSON.parse( this.responseText );
}

function logoutSpotify() {
    window.history.pushState( '', '', redirect_uri );
    localStorage.setItem( 'refresh_token', null );
    localStorage.removeItem( 'refresh_token' );
    localStorage.setItem( 'access_token', null );
    localStorage.removeItem( 'access_token' );
    location.reload();
}