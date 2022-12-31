<script lang="ts">
	import Email from "$lib/icons/Email.svelte";
	import Github from "$lib/icons/Github.svelte";
	import Instagram from "$lib/icons/Instagram.svelte";
	import LinkedIn from "$lib/icons/LinkedIn.svelte";
    import Mastodon from "$lib/icons/Mastodon.svelte";


</script>

<div class="welcome-heading">
    <div class="">
        <h1 class="heading">Hi, I'm Jonah Bedouch.</h1>
        <h2 class="subheading">I'm a passionate software developer, public transit enthusiast, and coffee addict. I love learning and trying new things. I'm currently pursuing an <strong class="focus-text">Electrical Engineering and Computer Sciences B.S. at UC Berkeley</strong> and working on <strong class="focus-text">Customer Engineering at Bosch US</strong> for Nevonex. I've primarily worked on full stack development and backend programming with Typescript and Python in the past.</h2>
        <div class="social-media">
            <a href="https://sfba.social/@jonahbedouch" class="icon"><Mastodon /></a>
            <a href="https://github.com/jonahbedouch" class="icon"><Github /></a>
            <a href="https://linkedin.com/in/jonahbedouch" class="icon"><LinkedIn /></a>
            <a href="https://instagram.com/jonahbedouch" class="icon"><Instagram /></a>
            <a href="mailto:jonah@bedouch.net" class="icon"><Email /></a>
        </div>
    </div>
</div>

<style>
    .welcome-heading {
        margin: 5rem auto 0px;
        width: 100%;
    }

    .heading {
        color: var(--focus-text);
        font-size: 3rem;
        margin: 0;
    }

    .subheading {
        font-weight: normal;
        margin: 0;
        text-align: justify;
    }

    .social-media {
        display: flex;
        flex-direction: row;
        margin-top: 1rem;
    }
    
    .icon {
        font-size: 3rem;
        color: var(--focus-text);
        margin-right: 1rem;
    }
    
    .icon:hover {
        color: transparent;
        background-image: var(--highlight-gradiant);
        background-clip: text; 
    }

    /* Small devices (portrait tablets and large phones, 600px and up) */
	@media only screen and (max-width: 767px) {
        .welcome-heading {
            margin: 2rem auto;
        }

        .welcome {
            font-size: 2rem;
        }
        
        .subheading {
            margin-top: 0.5rem;
            font-size: 1.25rem;
        }

        .social-media {
            margin-top: 0.5rem;
        }

        .icon:first-child {
            margin-left: auto;
        }

        .icon:last-child {
            margin-right: auto;
        }
	}
</style>