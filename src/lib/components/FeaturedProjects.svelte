<script lang="ts">
	import Card from './Card.svelte';

	export let projects: Array<any>;
</script>

<div class="projects-section">
	<h1 class="heading">Projects.</h1>
	<div class="small-center">
		{#each projects as project}
			<Card href={project.path} post={project} />
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
		font-size: 3rem;
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
	}
</style>
