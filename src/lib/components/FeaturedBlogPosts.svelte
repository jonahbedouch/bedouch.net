<script lang="ts">
	import Card from './Card.svelte';

	export let posts: Array<any>;
</script>

<div class="projects-section">
	<h1 class="heading">Blog.</h1>
	<div class="small-center">
		{#each posts as post}
			<Card href={post.path} {post} />
		{/each}
	</div>
</div>

<style>
	.projects-section {
		margin: 1rem auto 0px;
		width: 100%;
	}

	.heading {
		color: var(--focus-text);
		font-size: 2rem;
		margin: 0 0 1rem;
	}

	.small-center {
		display: flex;
		justify-content: center;
	}

	/* Large devices (laptops/desktops, 992px and up) */
	@media only screen and (min-width: 992px) {
		.projects-section {
			margin: 2.5rem auto 0px;
		}

		.small-center {
			display: flex;
			justify-content: left;
		}

        .heading {
            font-size: 3rem;
        }
	}
</style>
