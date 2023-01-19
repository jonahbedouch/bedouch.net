<script lang="ts">
	import Card from '$lib/components/Card.svelte';
import Rss from '$lib/icons/Rss.svelte';

	export let data: { posts: Array<Record<string, any>>; filter: string };

	const filterPost = (post: Record<string, any>) => {
		if (data.filter == '*') {
			return true;
		} else if (post.meta.tags.includes(data.filter)) {
			return true;
		} else {
			return false;
		}
	};
</script>

<h1>Blog <a href="/rss/blog"><Rss /></a></h1>

<div class="cards">
	{#each data.posts.filter(filterPost) as post}
		<Card href={post.path} post={post}/>
	{/each}
</div>

<style>
	.cards {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* Medium devices (laptops/desktops, 992px and up) */
	@media only screen and (min-width: 768px) {
		.cards {
			flex-direction: row;
			align-items: left;
		}
	}
</style>
