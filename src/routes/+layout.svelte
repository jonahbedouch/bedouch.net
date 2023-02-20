<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import { showThemeModal, theme, type ThemeOptions } from '$lib/shared/stores/theme';
	import { getThemeFile } from '$lib/utils';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Header from '../lib/components/Header.svelte';

	export let data: Record<string, any>;
	let themeStyle: HTMLLinkElement;
	
	onMount(() => {
		themeStyle = document.getElementById('theme') as HTMLLinkElement;	
	})

	theme.subscribe((value) => {
		if (themeStyle) {
			themeStyle.href = getThemeFile(value);
		}
	})
	

	const onKeyDown = (event: KeyboardEvent) => {
        if (event.key == "Escape") {
            showThemeModal.set(false);
        }
    }
</script>

<svelte:window on:keydown={onKeyDown} />
<div class="content">
	<Header />
	
	{#key data.currentRoute}
		<div class="animator" in:fly={{ y: 50, duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
			<main class="flex-grow">
				<slot />
			</main>
			<Footer />
		</div>
	{/key}
</div>

<style>
	.animator {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.flex-grow {
		flex-grow: 1;
	}
</style>