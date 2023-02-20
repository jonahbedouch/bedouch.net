<script>
	// @ts-nocheck
	import TableOfContents from "$lib/components/TableOfContents.svelte";

	export let title;
	export let date;
	export let slug;
	export let excerpt;
	export let featureImage;
	export let headings;
</script>


<svelte:head>
	<title>Jonah Bedouch - {title}</title>
	<meta property="og:url" content={`https://bedouch.net/blog/${slug}`}>
	<meta property="og:type" content="website">
	<meta property="og:title" content={title}>
	<meta property="og:description" content={excerpt}>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content={excerpt}>
	<meta name="author" content="Jonah Bedouch">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:domain" content="bedouch.net">
	<meta name="twitter:url" content={`https://bedouch.net/blog/${slug}`}>
	<meta name="twitter:title" content={title}>
	<meta name="twitter:description" content={excerpt}>
	<meta name="twitter:image" content={`https://bedouch.net${featureImage}`}>
	<meta name="twitter:creator" content="@jonahbedouch">
</svelte:head>

<article class="blog">
	<h1 class="title">{title}</h1>
	<p id="datePublished" class="datePublished">{new Date(date).toLocaleDateString(undefined, {day: 'numeric', month: 'long', year: 'numeric'})}</p>
	<TableOfContents headings={headings} />
	<slot />
</article>