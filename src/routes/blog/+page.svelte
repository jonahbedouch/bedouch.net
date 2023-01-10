<script lang="ts">
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

<ul>
	{#each data.posts.filter(filterPost) as post}
		<li>
			<h2>
				<a href={post.path}>
					{post.meta.title}
				</a>
			</h2>
			Published {post.meta.date}
		</li>
	{/each}
</ul>
