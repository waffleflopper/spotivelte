<script lang="ts">
	import type { ComponentType } from 'svelte';
	import { Home, Search, ListMusic } from 'lucide-svelte';
	import type { Icon } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { textLogo } from '$assets';

	type NavItem = {
		path: string;
		label: string;
		icon: ComponentType<Icon>;
	};

	/* Types and Imports Above Here */

	export let desktop: boolean;

	const navItems: NavItem[] = [
		{
			path: '/',
			label: 'Home',
			icon: Home,
		},
		{
			path: '/search',
			label: 'Search',
			icon: Search,
		},
		{
			path: '/playlists',
			label: 'Playlists',
			icon: ListMusic,
		},
	];
</script>

<div
	class="nav-content"
	class:desktop
	class:mobile={!desktop}>
	<nav aria-label="main">
		<div class="nav-content-inner">
			<ul class="nav-items">
				<li>
					<img
						class="navLogo"
						src={textLogo}
						alt="site logo" />
				</li>
				{#each navItems as item}
					<li
						class="item"
						class:active={item.path === $page.url.pathname}>
						<a href={item.path}>
							<svelte:component
								this={item.icon}
								aria-hidden="true"
								color="var(--text-color)"
								size={26}
								strokeWidth={2}
								class="navIcon" />
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</nav>
</div>

<style lang="scss">
	.nav-content {
		.navLogo {
			max-width: 100%;
			width: 130px;
		}

		.nav-content-inner {
			padding: 20px;
			min-width: bar(--sidebar-width);
			background-color: var(--sidebar-color);
			height: 100vh;
			overflow: auto;
			ul {
				padding: 0;
				margin: 20px 0 0;
				list-style: none;
				li {
					&.active {
						a {
							opacity: 1;
						}
					}
					a {
						display: flex;
						align-items: center;
						text-decoration: none;
						color: var(--text-color);
						font-size: functions.toRem(14);
						font-weight: 500;
						padding: 5px;
						margin: 10px 0;
						opacity: 0.7;
						transition: opacity 0.2s;
						&:hover,
						&:focus {
							opacity: 1;
						}
						:global(.navIcon) {
							margin-right: 12px;
						}
					}
				}
			}
		}

		&.desktop {
			position: sticky;
			top: 0;
			.nav-content-inner {
				@include breakpoint.up('md') {
					display: block;
				}
			}
		}
	}
</style>
