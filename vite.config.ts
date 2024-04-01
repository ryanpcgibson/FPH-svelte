import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		'process.env.BUILD_TIME': JSON.stringify(new Date().toISOString()),
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),

	  }
});
