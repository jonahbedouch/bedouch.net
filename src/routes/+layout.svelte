<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import Header from '../lib/components/Header.svelte';

	export let data: Record<string, any>;
</script>

<div class="content">
	<Header />


	{#key data.currentRoute}
		<main in:fly={{ y: 50, duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
			<slot />
		</main>
	{/key}
</div>
