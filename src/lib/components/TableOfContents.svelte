<script lang="ts">
	import type { Heading } from "$lib/utils";

	export let headings: Array<Heading>;

	import TableOfContentsSection from "./TableOfContentsSection.svelte";

</script>

<div class="toc">
    <h1 class="toc-header">Table of Contents</h1>
    <TableOfContentsSection items={headings}></TableOfContentsSection>
</div>

<style>
	.toc {
		background-color: var(--bg-alt);
		padding: 1rem;
		border-radius: 15px;
		border: 1px solid var(--border);
		font-size: 1.4rem;
		margin-top: 2rem;
	}

	.toc-header {
		font-size: 1.4rem;
		font-weight: bold;
        margin: 0;
        border: 0;
	}

    ul {
		list-style-type: disc;
		margin: 0.25rem 0px 0px;
	}

	li > ul {
		list-style-type: circle;
	}
</style>
