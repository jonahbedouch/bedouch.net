<script lang="ts">
	import Card from "./Card.svelte";

    export let posts: Array<any>;
</script>

<div class="projects-section">
    <h1 class="heading">Blog.</h1>
    <div class="">
        {#each posts as post}
        <Card href={post.path} post={post}/>
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