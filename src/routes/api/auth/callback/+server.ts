import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, BASE_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = (event) => {
	console.log(event);

	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');

	if (state === null) {
		throw redirect(301, `/#${JSON.stringify({ error: 'state mismatch' })}`);
	} else {
		const authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			form: {
				code: code,
				redirect_uri: `${BASE_URL}/api/auth/callback`,
				grant_type: 'authorization_code'
			},
			headers: {
				Authorization:
					'Basic ' + new Buffer(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'),
				json: true
			}
		};
	}

	return new Response();
};
