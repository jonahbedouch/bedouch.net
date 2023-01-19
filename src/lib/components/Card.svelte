<script lang="ts">
	import { goto } from '$app/navigation';

	export let href: string;
	export let post: Record<string, any>;
</script>

<div class="card" on:click={() => goto(href)} on:keydown={() => goto(href)}>
	<img src={post.meta.featureImage} alt="Cover image for {post.meta.title}." />
	<h1>{post.meta.title}</h1>
	<div class="tags">
		{#each post.meta.tags as tag}
			<span>{ tag }</span>
		{/each}
	</div>
	<span>{new Date(post.meta.date).toLocaleDateString(undefined, {day: 'numeric', month: 'long', year: 'numeric'})}</span>
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		border: 1px solid var(--border);
		background-color: var(--main-bg);
		margin: 0px 1.5rem 0px 0px;
		overflow: hidden;
		width: 20rem;
		height: 14rem;
	}

	.card:hover {
		cursor: pointer;
		filter: var(--shadow);
	}

	.card:hover > img {
		filter: contrast(90%)
	}

	.card > h1 {
		margin: 0.3rem 0 0;
		text-align: center;
		font-size: 1.5rem;
	}

	.card > span {
		margin: 0;
		text-align: center;
	}

	.card > img {
		max-height: 8.7rem;
	}

	.tags {
		text-align: center;
		color: var(--subtext);
		margin-bottom: 0.3rem;
	}

	.tags > *:not(:last-child)::after {
		content: " · "
	}

</style>
