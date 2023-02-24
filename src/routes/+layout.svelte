<script lang="ts">
	import Navigation from '$components/Navigation.svelte';
	import LogoutButton from '$lib/components/LogoutButton.svelte';
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
	import type { PageData } from './$types';

	export let data: PageData;

	const user = data.user;
</script>

<div id="main">
	{#if user}
		<div class="sidebar">
			<Navigation desktop={true} />
		</div>
	{/if}
	<div id="content">
		<main>
			<slot />
		</main>
	</div>
</div>

<style lang="scss">
	#main {
		display: flex;
		#content {
			flex: 1;
			main {
				padding: 30px 15px 60px;
				@include breakpoint.up('md') {
					padding: 30px 30px 60px;
				}
			}
		}
	}
</style>
