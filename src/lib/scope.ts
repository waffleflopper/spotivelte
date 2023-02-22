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
