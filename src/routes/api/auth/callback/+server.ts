import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, BASE_URL } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, cookies, fetch }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const returnError = url.searchParams.get('error');

	const stateChallenge = cookies.get('spotify_auth_state');

	const challengeVerifier = cookies.get('spotify_auth_challenge_verifier');

	if (state === null || state !== stateChallenge) {
		throw error(400, 'Return state mismatch. State challenge failed.');
	} else if (returnError) {
		throw error(400, 'You have to allow access to use this aplication');
	} else {
		const fetchObject = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${Buffer.from(
					`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
				).toString('base64')}`
			},
			body: new URLSearchParams({
				code: code || '',
				redirect_url: `${BASE_URL}/api/auth/callback`,
				grant_type: 'authorization_code',
				code_verifier: challengeVerifier || '',
				client_id: SPOTIFY_CLIENT_ID
			})
		};
		console.log('fetching with following: ', fetchObject);
		const response = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${Buffer.from(
					`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
				).toString('base64')}`
			},
			body: new URLSearchParams({
				code: code || '',
				redirect_uri: `${BASE_URL}/api/auth/callback`,
				grant_type: 'authorization_code',
				code_verifier: challengeVerifier || '',
				client_id: SPOTIFY_CLIENT_ID
			})
		});

		if (response.status !== 200) {
			console.log('something went wrong, recieved status ', response.status, '. expected 200');
		}

		const responseJSON = await response.json();

		if (responseJSON.error) {
			throw error(400, responseJSON.error_description);
		}

		cookies.delete('spotify_auth_state');
		cookies.delete('spotify_auth_challenge_verifier');
		cookies.set('refresh_token', responseJSON.refresh_token, { path: '/' });
		cookies.set('access_token', responseJSON.access_token, { path: '/' });
	}

	throw redirect(303, '/');
};
