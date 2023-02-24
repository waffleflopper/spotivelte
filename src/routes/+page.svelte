<script lang="ts">
	import { Button } from '$components';
	import LogoutButton from '$components/LogoutButton.svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<input />
<select>
	<option>option</option>
</select>
<button>Button</button>
<p>Buttons</p>
<Button
	element="button"
	variant="solid">Solid</Button>
<Button
	element="a"
	variant="outline"
	href="/api/auth/login">Outline</Button>
<Button
	element="button"
	variant="danger">Danger</Button>
<LogoutButton style="margin-top: 10px" />
