<script lang="ts">
	import Header from '../lib/components/Header.svelte';
</script>

<svetle:head>
	<link rel="stylesheet" href="/css/themes/reactive.css" />
	<link rel="stylesheet" href="/css/global.css" />
</svetle:head>

<div class="content">
	<Header />
	<slot />
</div>