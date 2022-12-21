<script lang="ts">
</script>

<nav>
	<a id="name" href="/">Jonah Bedouch</a>
	<a id="blog" class="nav-item" href="/projects">Projects</a>
	<a id="blog" class="nav-item" href="/blog">Blog</a>
	<a id="resume" class="nav-item outline-btn" href="/resume.pdf">Resume</a>
</nav>

<style>
	nav {
		display: flex;
		flex-direction: row;
		justify-items: center;
		align-items: center;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	nav > :not(:first-child, :last-child) {
		margin-right: 2.5rem;
	}

	#name {
		font-size: 3rem;
		font-weight: bold;
		color: transparent;

		background-image: var(--highlight-gradiant);
		background-clip: text;

		margin-right: auto;
	}

	.nav-item {
		font-size: 1.5rem;
		font-weight: bold;
		color: var(--focus-text);
		padding: 0.75rem 1rem;
        border-radius: 8px;
	}

	.nav-item:hover:not(.outline-btn) {
		background-color: var(--nav-hover-bg);
	}

	.outline-btn {
		display: inline-block;
		height: fit-content;

		border: 1.5px solid transparent;

		background-origin: border-box;
		background-clip: padding-box, border-box;
		background-image: linear-gradient(var(--main-bg), var(--main-bg)), var(--highlight-gradiant);
	}

	.outline-btn:hover {
		background-image: var(--highlight-gradiant);
		background-clip: border-box;
	}


	/* Small devices (portrait tablets and large phones, 600px and up) */
	@media only screen and (max-width: 767px) {
        #name {
            font-size: 1.25rem;
        }
		.nav-item {
			font-size: 0.75rem;
			font-weight: bold;
			padding: 0.5rem 0.5rem;
		}

        nav {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;

        }

        nav > :not(:first-child, :last-child) {
		    margin-right: 0.75rem;
	    }
	}
</style>
