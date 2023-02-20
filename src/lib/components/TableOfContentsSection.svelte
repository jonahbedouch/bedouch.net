<script lang="ts">
    import type { Heading } from "$lib/utils";

    export let items: Array<Heading>;
</script>

<ul>
    {#each items as item}
    <li>
        <a href={ item.path } class="toc-link">{ item.title }</a>
        {#if item.items.length}
            <svelte:self items={item.items} />
        {/if}
    </li>
    {/each}
</ul>

<style>
    .toc-link {
		color: var(--main-text);
	}

	.toc-link:hover {
		color: var(--link-hover);
	}
</style>