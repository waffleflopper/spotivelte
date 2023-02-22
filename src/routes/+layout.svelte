<script lang="ts">
	import LogoutButton from '$lib/components/LogoutButton.svelte';
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.user}
	<div class="top">
		<h1>Welcome {data.user?.display_name}</h1>
		<LogoutButton />
	</div>
{/if}
<slot />
