<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Button from './Button.svelte';

	export let apiRoute = '/api/auth/logout';
</script>

<form
	method="POST"
	action="/api/auth/logout"
	on:submit|preventDefault={async () => {
		const response = await fetch(apiRoute, {
			method: 'POST',
			headers: {
				accept: 'application/json',
			},
		});

		if (response.ok) {
			invalidateAll();
		}
	}}>
	<Button
		{...$$restProps}
		element="button"
		variant="danger"
		type="submit">
		Logout
	</Button>
</form>
