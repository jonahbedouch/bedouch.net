<script lang="ts">
	import Education from "$lib/components/Education.svelte";
	import FeaturedBlogPosts from "$lib/components/FeaturedBlogPosts.svelte";
    import FeaturedProjects from "$lib/components/FeaturedProjects.svelte";
    import WelcomeHeading from "$lib/components/WelcomeHeading.svelte";
	import WorkExperience from "$lib/components/WorkExperience.svelte";


    export let data: any;
</script>
<svelte:head>
    <title>Jonah Bedouch - Home</title>
    <meta property="og:url" content="https://bedouch.net/">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Jonah Bedouch">
    <meta property="og:description" content="I'm Jonah Bedouch, a Berkeley EECS Major. Welcome to my online portfolio and blog.">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Jonah Bedouch">
    <meta name="author" content="Jonah Bedouch">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:domain" content="bedouch.net">
    <meta name="twitter:url" content="https://bedouch.net/">
    <meta name="twitter:title" content="Jonah Bedouch">
    <meta name="twitter:description" content="I'm Jonah Bedouch, a Berkeley EECS Major. Welcome to my online portfolio and blog.">
    <meta name="twitter:creator" content="@jonahbedouch">
</svelte:head>

<div class="home-container">
    <WelcomeHeading />
    <FeaturedProjects projects={data.featuredProjects} />
    <WorkExperience />
    <Education />
    <FeaturedBlogPosts posts={data.featuredPosts}/>
</div>

<style>
    .home-container {
        display: flex;
        flex-direction: column;
    }
</style>