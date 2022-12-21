<script>
	import WelcomeHeading from "$lib/components/WelcomeHeading.svelte";

</script>
<svelte:head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Jonah Bedouch">
    <meta name="author" content="Jonah Bedouch">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="Jonah Bedouch">
    <meta name="twitter:creator" content="@jonahbedouch">
    <meta name="twitter:description" content="I'm Jonah Bedouch, a Berkeley EECS Major. Welcome to my online portfolio and blog.">
</svelte:head>


<div class="home-container">
    <WelcomeHeading />
</div>

<style>
    .home-container {
        display: flex;
        flex-direction: column;
    }
</style>