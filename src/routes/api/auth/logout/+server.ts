import { json, redirect, type Cookies } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = ({ cookies, request }) => {
	deleteAuthorizationCookies(cookies);

	if (request.headers.get('accept') === 'application/json') {
		return json({ success: true });
	}

	throw redirect(303, '/login');
};
function deleteAuthorizationCookies(cookies: Cookies) {
	cookies.delete('refresh_token', { path: '/' });
	cookies.delete('access_token', { path: '/' });
}
