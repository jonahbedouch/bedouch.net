<script lang="ts">
export let employer: string = "";
export let title: string = "";
export let timeRange: string = "";
export let description: string = "";
</script>

<div class="container">
    <div class="">
        <h1>{ employer }</h1>
        <h2>{ title }</h2>
        <span>{ timeRange }</span>
    </div>
    <p>{ description }</p>
</div>

<style>
    .container {
        margin-top: 1.25rem;
    }
    h1 {
        color: var(--focus-text);
    }
    span {
        font-weight: bold
    }
    h1, h2, span {
        margin: 0px;
    }
</style>