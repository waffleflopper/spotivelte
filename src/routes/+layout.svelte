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
<div class="container">
	<slot />
</div>

<style lang="scss">
	.container {
		width: 100%;
		padding: functions.toRem(10);
	}
</style>
