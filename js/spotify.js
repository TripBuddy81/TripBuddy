var redirect_uri = '';
var client_id = '';
var client_secret = '';
var access_token = null;
var refresh_token = null;
var currentPlaylist = '';
var radioButtons = [];
var lastSelectedPlaylist = 'spotify:playlist:0O1C7wbOthIxBbai9pYvEH';
var playingTrack = false;


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

function spotifyInitOnPageLoad() {
    if ( window.location.search.length > 0 ) {
        handleRedirect();
    } else {
        access_token = localStorage.getItem( 'access_token' );
        if ( access_token == null ) {
            requestAuthorization();
        } else {
            // we have an access token so present device section
            refreshDevices();
            refreshPlaylists();
        }
    }
}

function handleRedirect() {
    let code = getCode();
    fetchAccessToken( code );
    window.history.pushState( '', '', redirect_uri ); // remove param from url
}

function getCode() {
    let code = null;
    const queryString = window.location.search;
    if ( queryString.length > 0 ) {
        const urlParams = new URLSearchParams( queryString );
        code = urlParams.get( 'code' )
    }
    return code;
}

function requestAuthorization() {
    let url = AUTHORIZE;
    url += '?client_id=' + client_id;
    url += '&response_type=code';
    url += '&redirect_uri=' + encodeURI( redirect_uri );
    url += '&show_dialog=true';
    url += '&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private';
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
        /* console.log( data );*/
        var data = JSON.parse( this.responseText );
        if ( data.access_token != undefined ) {
            access_token = data.access_token;
            localStorage.setItem( 'access_token', access_token );
        }
        if ( data.refresh_token != undefined ) {
            refresh_token = data.refresh_token;
            localStorage.setItem( 'refresh_token', refresh_token );
        }
        spotifyInitOnPageLoad();
    } else {
        /*        console.log( this.responseText );*/
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

        if ( $( '#devices' ).find( ':selected' ).text().toLowerCase().includes( 'desktop' ) && typeof $( '#devices option:contains("' + config['spotifyPhoneName'] + '")' ).val() != 'undefined' ) {
            $( '#switchDesktopPhone' ).attr( 'src', './assets/phone.png' );
            $( '#switchDesktopPhone' ).show();
        } else if ( !$( '#devices' ).find( ':selected' ).text().toLowerCase().includes( 'desktop' ) ) {
            $( '#switchDesktopPhone' ).attr( 'src', './assets/desktop.png' );
            $( '#switchDesktopPhone' ).show();
        } else {
            $( '#switchDesktopPhone' ).hide();
        }

    } else if ( this.status == 401 ) {
        refreshAccessToken()
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

function callApi( method, url, body, callback ) {
    let xhr = new XMLHttpRequest();
    xhr.open( method, url, true );
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
        refreshAccessToken()
    } else {
        /*        console.log( this.responseText );*/
    }
}

function addPlaylist( item ) {
    let node = document.createElement( 'option' );
    node.value = item.id;
    node.innerHTML = item.name + ' (' + item.tracks.total + ')';
    document.getElementById( 'playlists' ).appendChild( node );
}

function removeAllItems( elementId ) {
    let node = document.getElementById( elementId );
    while ( node.firstChild ) {
        node.removeChild( node.firstChild );
    }
}

function play( playlist_id = '' ) {
    let body = {};
    if ( playlist_id != '' ) {
        body.context_uri = playlist_id;
    }

    if ( $( '#devices' ).find( ':selected' ).val() == 'undefined' || $( '#devices' ).find( ':selected' ).text().toLowerCase().includes( 'überall' ) ) {
        callApi( 'PUT', PLAY + '?device_id=' + $( '#devices option:contains("DESKTOP")' ).val(), JSON.stringify( body ), handleApiResponse );
    } else {
        callApi( 'PUT', PLAY + '?device_id=' + $( '#devices' ).find( ':selected' ).val(), JSON.stringify( body ), handleApiResponse );
    }
}

function next( playlist_id = '' ) {
    if ( $( '#devices' ).find( ':selected' ).val() == 'undefined' || $( '#devices' ).find( ':selected' ).text().toLowerCase().includes( 'überall' ) ) {
        let body = {};
        if ( playlist_id != '' ) {
            body.context_uri = playlist_id;
        }
        callApi( 'PUT', PLAY + '?device_id=' + $( '#devices option:contains("DESKTOP")' ).val(), JSON.stringify( body ), handleApiResponse );
    } else {
        callApi( 'POST', NEXT, null, handleApiResponse );
    }
}

function shuffle() {
    callApi( 'PUT', SHUFFLE + '?state=true', null, handleApiResponse );
}

function repeat() {
    callApi( 'PUT', REPEAT + '?state=context', null, handleApiResponse );
}

function pause() {
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
    refreshAccessToken();
}

function handleApiResponse() {
    if ( this.status == 200 ) {
    } else if ( this.status == 204 ) {
    } else if ( this.status == 401 ) {
    } else {
    }
}

function deviceId() {
    return document.getElementById( 'devices' ).value;
}

function fetchTracks() {
    let playlist_id = document.getElementById( 'playlists' ).value;
    if ( playlist_id.length > 0 ) {
        url = TRACKS.replace( '{{PlaylistId}}', playlist_id );
        callApi( 'GET', url, null, handleTracksResponse );
    }
}

function handleTracksResponse() {
    if ( this.status == 200 ) {
        var data = JSON.parse( this.responseText );
        removeAllItems( 'tracks' );
        data.items.forEach( ( item, index ) => addTrack( item, index ) );
    } else if ( this.status == 401 ) {
        refreshAccessToken()
    } else {
    }
}

function addTrack( item, index ) {
    let node = document.createElement( 'option' );
    node.value = index;
    node.innerHTML = item.track.name + ' (' + item.track.artists[0].name + ')';
    document.getElementById( 'tracks' ).appendChild( node );
}

function currentlyPlaying() {
    callApi( 'GET', PLAYER + '?market=US', null, handleCurrentlyPlayingResponse );
}

function getPlaylist( playlistID ) {
    callApi( 'GET', 'https://api.spotify.com/v1/playlists/' + playlistID, null, handleCurrentPlaylistResponse );
}

function handleCurrentlyPlayingResponse() {
    try {
        var data = JSON.parse( this.responseText );
        var playlistID = data['context']['external_urls']['spotify'];
        playlistID = playlistID.replace( 'https://open.spotify.com/playlist/', '' );
        lastSelectedPlaylist = 'spotify:playlist:' + playlistID;
        getPlaylist( playlistID );

        if ( data['is_playing'] ) {
            playingTrack = true;
        } else {
            playingTrack = false;
        }
    } catch ( e ) {
        return false;
    }
}

function handleCurrentPlaylistResponse() {
    var data = JSON.parse( this.responseText );
    $( '#playlists > option:first-child' ).text( data['name'] );
}
