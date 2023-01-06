<script lang="ts">
    export let type: 'solid' | 'brand' | 'regular';
</script>

<span class={type}>
    <slot></slot>
</span>

<style>
    .solid {
        font-family: 'lineawesome-solid';
    }

    .brand {
        font-family: 'lineawesome-brands';
    }

    .regular {
        font-family: 'lineawesome-regular';
    }

    span {
        margin: 0;
        user-select: none;
    }
</style>