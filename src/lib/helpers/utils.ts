import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';

interface IDictionary {
	[index: string]: string[];
}

export const scope = {
	userProfile: ['user-read-email', 'user-read-private', 'user-library-modify', 'user-library-read'],

	image: ['ugc-image-upload'],

	userMusic: [
		'user-modify-playback-state',
		'user-read-playback-state',
		'user-read-currently-playing',
		'user-follow-modify',
		'user-follow-read',
		'user-read-recently-played',
		'user-read-playback-position',
		'user-top-read'
	],

	playlists: [
		'playlist-read-collaborative',
		'playlist-modify-public',
		'playlist-read-private',
		'playlist-modify-private'
	],

	remote: ['app-remote-control'],

	streaming: ['streaming']
} as IDictionary;

export const getScope = (options: Array<string>): string => {
	let scopeString = '';
	options.forEach((v) => {
		scopeString += `${scope[v].join(' ')} `;
	});

	return scopeString;
};

export const spotify_authorization_headers = {
	'Content-Type': 'application/x-www-form-urlencoded',
	Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
		'base64'
	)}`
};
