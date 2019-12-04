import $ from 'jquery';

const players = {};

function initPlayer( i, el ) {

	$( el ).children( '.overlay' ).hover( function( e ) {
		e.stopPropagation();
	} );

	players[ i ] = new YT.Player( $( el ).find( '.player' )[ 0 ], {
		height: '1080',
		width: '1920',
		videoId: $( el ).data( 'youtube-id' ),
		playerVars: {
			'controls': 0,
			'autoplay': 1,
			'mute': 1,
			'loop': 1,
			'showinfo': 0,
			'modestbranding': 1,
		},
		events: {
			'onReady': onVideoPlayerReady,
			'onStateChange': onVideoPlayerReady,
		},
	} );
}

function onVideoPlayerReady( event ) {
	event.target.playVideo();
}

export default {

	init() {
		const tag = document.createElement( 'script' );
		tag.src = 'https://www.youtube.com/iframe_api';

		// Inserts YouTube JS code into the page.
		const firstScriptTag = document.getElementsByTagName( 'script' )[ 0 ];
		firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );

		let players = {};

		window.onYouTubeIframeAPIReady = function() {
			$( '.js-background-video' ).map( ( i, el ) => {
				initPlayer( i, el );
			} );
		};

	},
};
