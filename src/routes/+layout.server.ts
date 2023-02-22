import { SPOTIFY_BASE_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, fetch, url }) => {
	const accessToken = cookies.get('access_token');
	const refreshToken = cookies.get('refresh_token');

	if (!accessToken) {
		return {
			user: null
		};
	}

	const profileResponse = await fetch(`${SPOTIFY_BASE_URL}/me`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	if (profileResponse.ok) {
		const profile: SpotifyApi.CurrentUsersProfileResponse = await profileResponse.json();

		return {
			user: profile
		};
	}

	if (profileResponse.status === 401 && refreshToken) {
		//get our refresh
		const refreshResponse = await fetch('/api/auth/refresh');

		if (refreshResponse.ok) {
			throw redirect(307, url.pathname);
		} else {
			return {
				user: null
			};
		}
	} else {
		//TODO: Check for response 401 and refresh token
		return {
			user: null
		};
	}
};
