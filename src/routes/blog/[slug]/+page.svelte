<script lang="ts">
	export let data: Record<string, any>;
</script>

<article class="blog">
	<h1 class="title">{data.title}</h1>
	<p class="datePublished">{new Date(data.date).toLocaleDateString(undefined, {day: 'numeric', month: 'long', year: 'numeric'})}</p>
	<svelte:component this={data.content} />
</article>

<style>
	.title {
		font-size: 2rem;
		text-align: center;
		margin-top: 2rem;
		border: 0px;
	}

	.datePublished {
		font-size: 1.4rem;
		text-align: center;
	}

	:global(:where(h1, h2, h3, h4, h5, h6) .heading-anchor) {
		position: relative;
		margin-left: 1ch;
		font-family: 'lineawesome-solid';
	}

	:global(:where(h1, h2, h3, h4, h5, h6) .heading-anchor::after) {
		content: '\f0c1';
		font-size: inherit;
		opacity: 0;
		color: transparent;
		background-image: var(--highlight-gradiant);
		background-size: 150%;
		background-clip: text;
		background-position: left;
		transition: background-position 0.5s, opacity 0.1s;
	}

	:global(:where(h1, h2, h3, h4, h5, h6):hover .heading-anchor::after), 
	:global(.icon-link:hover .icon-link::after){
		opacity: 1;
	}

	:global(:where(h1, h2, h3, h4, h5, h6) .heading-anchor:hover::after) {
		background-position: right;
	}

	:global(.toc) {
		background-color: var(--bg-alt);
		padding: 1rem;
		border-radius: 15px;
		border: 1px solid var(--border);
		font-size: 1.4rem;
		margin-top: 2rem;
	}

	:global(.toc::before) {
		content: 'Table of Contents';
		font-size: 1.4rem;
		font-weight: bold;
	}

	:global(.blog > h1) {
		font-size: 1.7rem;
		margin: 0.8rem 0px 0.5rem;
		border-bottom: 1px solid var(--underline);
	}

	:global(.blog > h2) {
		font-size: 1.5rem;
		margin: 0.5rem 0px 0px;
	}
	

	:global(.blog > h3) {
		font-size: 1.4rem;
		margin: 0.5rem 0px 0px;
	}

	:global(.blog > h4) {
		font-size: 1.3rem;
		margin: 0.5rem 0px 0px;
	}

	:global(.blog > h5) {
		font-size: 1.2rem;
		margin: 0.5rem 0px 0px;
	}

	:global(.blog > h6) {
		font-size: 1.2rem;
		margin: 0.5rem 0px 0px;
	}
	
	:global(.blog > p) {
		font-size: 1.2rem;
		margin: 0px 0px 1rem;
	}

	:global(.toc > ol) {
		list-style-type: disc;
		margin: 0.5rem 0px 0px;
	}

	:global(.blog li > ol) {
		list-style-type: circle;
	}

	:global(.blog .toc-link) {
		color: var(--main-text);
	}

	:global(.blog .toc-link:hover) {
		color: var(--link-hover);
	}

	:global(.blog figure) {
		max-width: inherit;
	}

	:global(.blog figure > img) {
		max-width: 100%;
		border-radius: 7.5px;
	}

	:global(.blog figure > figcaption) {
		font-size: 1.2rem;
		text-align: center;
		margin: 0.25rem 0px;
	}
</style>
