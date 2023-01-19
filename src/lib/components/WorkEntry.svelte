<script lang="ts">
export let employer: string = "";
export let title: string = "";
export let timeRange: string = "";
export let description: string = "";
</script>

<div class="container">
    <div class="">
        <h1>{ employer }</h1>
        <h2>{ title }</h2>
        <span>{ timeRange }</span>
    </div>
    <p>{ description }</p>
</div>

<style>
    .container:not(:nth-of-type(1)) {
        margin-top: 1rem;
    }
    h1 {
        color: var(--focus-text);
        font-size: 1.7rem;
    }
    span {
        font-weight: bold
    }
    h1, h2, span, p {
        margin: 0px;
    }

    p {
        text-align: justify;
    }

    /* Large devices (laptops/desktops, 992px and up) */
	@media only screen and (min-width: 992px) {
		.container {
			margin-top: 1.25rem;
		}

        p {
            text-align: center;
        }

        h1 {
            font-size: 2rem;
        }
	}
</style>