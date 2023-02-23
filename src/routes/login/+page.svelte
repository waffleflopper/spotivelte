<script lang="ts">
	import Button from '$components/Button.svelte';
	import { cover, logo } from '$assets';
</script>

<div class="wrapper">
	<div class="content">
		<img
			src={logo}
			class="logo"
			alt="Site Logo" />

		<h1>Spotify Meet Svelte</h1>
		<p>Enjoy ad-free listening, offline playback, shareable playlists, and more!</p>
		<div class="buttons">
			<Button
				href="https://www.spotify.com"
				variant="outline"
				element="a"
				target="_blank"
				rel="noreferrer noopener">Sign Up!</Button>
			<Button
				element="a"
				variant="solid"
				href="/api/auth/login">Login</Button>
		</div>
	</div>
	<div class="cover">
		<img
			src={cover}
			alt="Album Cover"
			class="cover" />
	</div>
</div>

<style lang="scss">
	:global(body) {
		background-image: linear-gradient(240deg, var(--sidebar-color), var(--bg-color));
		height: 100vh;
	}
	.wrapper {
		display: flex;
		width: 450px;
		@include breakpoint.up('md') {
			width: 100%;
		}
		max-width: 1200px;
		margin: 80px auto 0;
		align-items: center;
		flex-direction: column;
		@include breakpoint.up('md') {
			flex-direction: row;
		}
	}
	.cover {
		flex: 1;
		margin-top: 40px;
		@include breakpoint.up('md') {
			margin-left: 20px;
			margin-top: 0;
		}
		img {
			max-width: 450px;
			@include breakpoint.up('md') {
				max-width: 100%;
			}
		}
	}
	.content {
		flex: 1.8;
		.logo {
			width: 50px;
			max-width: 100%;
			margin-bottom: 30px;
		}
	}
	.buttons {
		margin-top: 40px;

		:global(.button) {
			margin-right: 10px;
			padding: 10px 20px;
			text-transform: uppercase;
		}
	}
	/* typography stuff */
	h1 {
		font-size: functions.toRem(40);
	}
	p {
		font-size: functions.toRem(20);
	}
</style>
