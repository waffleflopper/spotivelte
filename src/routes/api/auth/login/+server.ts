import { BASE_URL, SPOTIFY_CLIENT_ID } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { randomBytes } from 'crypto';
import pkce from 'pkce-gen';

const generateRandomString = (length: number) => {
	// let randomString = '';
	// const stringPool = 'ABCDEFGHIJKLMNOPQRSTUVWXXYZabcdefghijklmnopqrstuvwxyz1234567890';

	// for (let i = 0; i < length; i++) {
	// 	randomString += stringPool.charAt(Math.floor(Math.random() * stringPool.length));
	// }

	// return randomString;

	return randomBytes(length / 2).toString('hex');
};

const scope =
	'ugc-image-upload user-modify-playback-state user-read-playback-state user-read-currently-playing user-follow-modify user-follow-read user-read-recently-played user-read-playback-position user-top-read playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private app-remote-control streaming user-read-email user-read-private user-library-modify user-library-read';

const state = generateRandomString(16);
const challenge = pkce.create();
const redirect_uri = `${BASE_URL}/api/auth/callback`;

export const GET: RequestHandler = () => {
	console.log(`${BASE_URL}/api/auth/callback`);
	throw redirect(
		307,
		`https://accounts.spotify.com/authorize?${new URLSearchParams({
			response_type: 'code',
			client_id: SPOTIFY_CLIENT_ID,
			scope,
			redirect_uri,
			state,
			code_challenge_method: 'S256',
			code_challenge: challenge.code_challenge
		})}`
	);
};
