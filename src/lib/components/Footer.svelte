<script lang="ts">
	import ThemeButton from "./ThemeButton.svelte";
	import ThemeModal from "./ThemeModal.svelte";


</script>

<footer>
    <div class="footer-content">
        <p class="heart-text">Made with ❤️ by Jonah Bedouch</p>
        <ThemeButton />
        <ThemeModal />
    </div>
</footer>

<style>
    footer {
        display: flex;
    }

    .footer-content {
        display: flex;
        flex-direction: row;
        margin: auto;
    }

    .heart-text {
        text-align: center;
    }
</style>