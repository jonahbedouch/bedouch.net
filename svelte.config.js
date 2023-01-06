import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import autoprefixer from 'autoprefixer';
import { mdsvex } from 'mdsvex'
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkEmbedImages from 'mdsvex-relative-images';
import rehypeSlug from 'rehype-slug';
import rehypeToc from "rehype-toc"
import rehypeFigure from 'rehype-figure';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	extensions: ['.svelte', '.svx'],

	preprocess: [
		vitePreprocess({
			postcss: {
				plugins: [autoprefixer]
			}
		}),
		mdsvex({
			extensions: ['.svx'],
			remarkPlugins: [
				remarkEmbedImages
			],
			rehypePlugins: [
				rehypeSlug,
				[rehypeAutolinkHeadings, {behavior: 'append', properties: {ariaHidden: true, tabIndex: -1, class: 'heading-anchor'}}],
				rehypeToc,
				rehypeFigure
			]
		})
	],

	kit: {
		adapter: adapter()
	},

};

export default config;
