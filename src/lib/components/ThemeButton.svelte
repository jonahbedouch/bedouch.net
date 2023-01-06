<script lang="ts">
	import { showThemeModal, theme } from "$lib/shared/stores/theme";
	import { getIcon, getThemeName } from "$lib/utils";

    const toggleThemeModal = () => {
        showThemeModal.set(!$showThemeModal);
    }
</script>

<button on:click={toggleThemeModal}>
    <svelte:component this={getIcon($theme)} />
</button>

<style>
    button {
        background: transparent;
        border: none;
        font-size: 1.5rem;
        padding: 0px 1rem;
        margin: 0.5rem;
        border-radius: 8px;
        color: var(--focus-text)
    }

    button:hover {
        cursor: pointer;
        background: var(--nav-hover-bg)
    }
</style>