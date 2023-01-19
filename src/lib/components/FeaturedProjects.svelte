<script lang="ts">
	import Card from "./Card.svelte";


    export let projects: Array<any>;
</script>

<div class="projects-section">
    <h1 class="heading">Projects.</h1>
    <div class="">
        {#each projects as project}
        <Card href={project.path} post={project}/>
        {/each}
    </div>
</div>


<style>
    .projects-section {
        margin: 2.5rem auto 0px;
        width: 100%;
    }

    .heading {
        color: var(--focus-text);
        font-size: 3rem;
        margin: 0 0 1rem;
    }
</style>