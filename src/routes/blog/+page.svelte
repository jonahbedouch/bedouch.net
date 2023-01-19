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

<svelte:head>
	<title>Jonah Bedouch - Blog</title>
	<meta property="og:url" content="https://bedouch.net/blog">
	<meta property="og:type" content="website">
	<meta property="og:title" content="Blog">
	<meta property="og:description" content="I'm Jonah Bedouch, a Berkeley EECS Major. Welcome to my online portfolio and blog.">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="Jonah Bedouch">
	<meta name="author" content="Jonah Bedouch">
	<meta name="twitter:card" content="summary">
	<meta name="twitter:domain" content="bedouch.net">
	<meta name="twitter:url" content="https://bedouch.net/blog">
	<meta name="twitter:title" content="Blog">
	<meta name="twitter:description" content="I'm Jonah Bedouch, a Berkeley EECS Major. Welcome to my online portfolio and blog.">
	<meta name="twitter:creator" content="@jonahbedouch">
</svelte:head>

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
