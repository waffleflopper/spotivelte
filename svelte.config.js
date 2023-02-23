import adapter from '@sveltejs/adapter-auto';

import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors

	preprocess: preprocess({
		scss: {
			prependData:
				'@use "src/styles/_functions";@use "@unsass/breakpoint";@import "src/styles/mixins.scss";',
		},
	}),

	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/lib/components',
			$utils: 'src/lib/helpers/utils.ts',
		},
	},
};

export default config;
