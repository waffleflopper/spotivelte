import { spotify_authorization_headers } from '$utils';
import { error, json, type Cookies } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

type responseJSON = {
	refresh_token: string;
	access_token: string;
};

export const GET: RequestHandler = async ({ cookies, fetch }) => {
	const refreshToken = cookies.get('refresh_token');

	const refreshResponse = await requestAuthorizationRefresh(fetch, refreshToken);

	const refreshJson = await refreshResponse.json();

	if (refreshJson.error) {
		deleteAuthorizationCookies(cookies);
		throw error(401, refreshJson.error_description);
	}

	setAuthorizationCookies(cookies, refreshJson);

	return json(refreshJson);
};

function requestAuthorizationRefresh(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
	refreshToken: string | undefined
) {
	return fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: spotify_authorization_headers,
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: refreshToken || ''
		})
	});
}

function setAuthorizationCookies(cookies: Cookies, refreshJson: responseJSON) {
	cookies.set('refresh_token', refreshJson.refresh_token, { path: '/' });
	cookies.set('access_token', refreshJson.access_token, { path: '/' });
}

function deleteAuthorizationCookies(cookies: Cookies) {
	cookies.delete('refresh_token', { path: '/' });
	cookies.delete('access_token', { path: '/' });
}
