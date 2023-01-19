<script lang="ts">
	import WorkEntry from "./WorkEntry.svelte";


</script>

<div class="projects-section">
    <h1 class="heading">Education.</h1>
    <h1 class="university">University of California, Berkeley</h1>
    <p>Electrical&nbsp;Engineering&nbsp;and Computer&nbsp;Science, B.Sc •&nbsp;Mathematics&nbsp;Minor •&nbsp;Anticipated&nbsp;Graduation:&nbsp;2026 •&nbsp;GPA:&nbsp;4.0</p>
</div>


<style>
    .projects-section {
        margin: 1rem auto 0px;
        width: 100%;
    }

    .heading {
        color: var(--focus-text);
        font-size: 2rem;
        margin: 0;
    }
    
    .university {
        margin-bottom: 0px;
        color: var(--focus-text);
        font-size: 1.7rem;
    }

    h1, p {
        margin: 0px;
    }

    /* Large devices (laptops/desktops, 992px and up) */
	@media only screen and (min-width: 992px) {
		.projects-section {
			margin: 2.5rem auto 0px;
		}

        .heading {
            font-size: 3rem;
        }

        .university {
            font-size: 2rem;
        }
	}
</style>