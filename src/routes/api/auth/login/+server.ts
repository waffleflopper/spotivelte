import { BASE_URL, SPOTIFY_CLIENT_ID } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { randomBytes } from 'crypto';
import pkce from 'pkce-gen';
import { getScope } from '$lib/scope';

const generateRandomString = (length: number) => {
	// let randomString = '';
	// const stringPool = 'ABCDEFGHIJKLMNOPQRSTUVWXXYZabcdefghijklmnopqrstuvwxyz1234567890';

	// for (let i = 0; i < length; i++) {
	// 	randomString += stringPool.charAt(Math.floor(Math.random() * stringPool.length));
	// }

	// return randomString;

	return randomBytes(length / 2).toString('hex');
};

const state = generateRandomString(16);
const challenge = pkce.create();
const redirect_uri = `${BASE_URL}/api/auth/callback`;

export const GET: RequestHandler = ({ cookies }) => {
	const scopeRequest = getScope(['userProfile', 'userMusic', 'image', 'streaming', 'playlists']);

	cookies.set('spotify_auth_state', state);
	cookies.set('spotify_auth_challenge_verifier', challenge.code_verifier);

	throw redirect(
		307,
		`https://accounts.spotify.com/authorize?${new URLSearchParams({
			response_type: 'code',
			client_id: SPOTIFY_CLIENT_ID,
			scope: scopeRequest,
			redirect_uri,
			state,
			code_challenge_method: 'S256',
			code_challenge: challenge.code_challenge
		})}`
	);
};
