import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import autoprefixer from 'autoprefixer';
import { mdsvex } from 'mdsvex';
import { join } from "path";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkEmbedImages from 'mdsvex-relative-images';
import rehypeSlug from 'rehype-slug';
import rehypeFigure from 'rehype-figure';

function get_headings() {
	let visit;
	let tree_to_string;
	return async function transformer(tree, vFile) {
		if (!visit) {
			tree_to_string = (await import('mdast-util-to-string')).toString;
			visit = (await import('unist-util-visit')).visit;
		}

		vFile.data.headings = [];

		let lastNodes = {0: vFile.data.headings}
		visit(tree, 'heading', (node) => {
			let lastNode = {
				title: tree_to_string(node),
				path: `#${tree_to_string(node).replace(/ /g,"-").toLowerCase()}`,
				items: []
			}
			lastNodes[node.depth] = lastNode.items;
			lastNodes[node.depth - 1].push(lastNode);
		});

		if (!vFile.data.fm) vFile.data.fm = {};
		vFile.data.fm.headings = vFile.data.headings;
	};
}

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
			layout: {
				"blog": "./src/routes/blog/post.svelte",
				"projects": "./src/routes/projects/post.svelte",
			},
			remarkPlugins: [
				remarkEmbedImages,
				get_headings
			],
			rehypePlugins: [
				rehypeSlug,
				[rehypeAutolinkHeadings, { behavior: 'append', properties: { ariaHidden: true, tabIndex: -1, class: 'heading-anchor' } }],
				rehypeFigure
			]
		})
	],

	kit: {
		adapter: adapter()
	},

};

export default config;
