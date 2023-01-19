<script lang="ts">
	import { showThemeModal, theme } from "$lib/shared/stores/theme";
	import { getIcon, getThemeName } from "$lib/utils";

    const toggleThemeModal = () => {
        showThemeModal.set(!$showThemeModal);
    }
</script>

<button class="theme-btn" on:click={toggleThemeModal}>
    <svelte:component this={getIcon($theme)} />
</button>

<style>
    .theme-btn {
        background: transparent;
        border: none;
        font-size: 1.5rem;
        padding: 0px 1rem;
        border-radius: 8px;
        color: var(--focus-text)
    }

    .theme-btn:hover {
        cursor: pointer;
        background: var(--nav-hover-bg)
    }

    /* Medium devices (laptops/desktops, 992px and up) */
	@media only screen and (min-width: 768px) {
		.theme-btn {
            margin: 0.5rem;
        }
	}
</style>