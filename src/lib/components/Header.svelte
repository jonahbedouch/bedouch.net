<script lang="ts">
</script>

<nav class="not-mobile">
	<a id="name" href="/">Jonah Bedouch</a>
	<a id="projects" class="nav-item" href="/projects">Projects</a>
	<a id="blog" class="nav-item" href="/blog">Blog</a>
	<a id="resume" class="outline-btn b-blue" href="/resume.pdf">Resume</a>
</nav>

<nav class="mobile">
	<a id="name" href="/">Jonah Bedouch</a>
	<input id="mobile-menu-toggle" type="checkbox" />
	<label class="nav-item hamburger" for="mobile-menu-toggle">
		<div class="top" />
		<div class="meat" />
		<div class="bottom" />
	</label>

	<nav class="mobile-menu">
		<a id="blog" class="nav-item" href="/projects">Projects</a>
		<a id="blog" class="nav-item" href="/blog">Blog</a>
		<a id="resume" class="nav-item" href="/resume.pdf">Resume</a>
	</nav>
</nav>

<style>
	.not-mobile {
		display: flex;
		flex-direction: row;
		justify-items: center;
		align-items: center;
		padding-top: 1rem;
		padding-bottom: 1rem;
	}

	.mobile {
		display: none;
		grid-template-columns: auto auto;
		align-items: center;
	}

	.not-mobile > :not(:first-child, :last-child) {
		margin-right: 2rem;
	}

	#name {
		font-size: 3rem;
		font-weight: bold;
		color: transparent;

		background-image: var(--highlight-gradiant);
		background-size: 150%;
		background-clip: text;
		background-position: left;
		transition: background-position 0.5s;

		margin-right: auto;
	}

	#name:hover {
		background-position: right;
	}

	.nav-item {
		font-size: 1.5rem;
		font-weight: bold;
		color: var(--focus-text);
		padding: 0.75rem 1rem;
		border-radius: 8px;
		background-image: none;
		background-clip: border-box;
	}

	.nav-item:hover {
		background-color: var(--nav-hover-bg);
	}

	.outline-btn {
		display: inline-block;
		position: relative;
		border-radius: 8px;
		text-decoration: none;
		padding: 0.75rem 1rem;
		font-size: 1.5rem;
		font-weight: bold;
		transition: all 0.5s;
		background-clip: text;
		color: transparent;
		background-image: var(--highlight-gradiant);
		background-size: 150%;
		background-position: left;
	}
	.outline-btn:hover {
		text-shadow: 0px 0px 0px rgba(255, 255, 255, 0.75);
	}

	.outline-btn:hover:after {
		left: 100%;
		top: 100%;
		bottom: 100%;
		right: 100%;
	}

	.outline-btn:hover:before {
		background-position: right;
	}

	.outline-btn:before {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		z-index: -1;
		border-radius: 8px;
		transition: all 0.5s;
		background-image: var(--highlight-gradiant);
		background-size: 150%;
		background-position: left;
	}
	.outline-btn:after {
		content: '';
		display: block;
		position: absolute;
		left: 2px;
		top: 2px;
		bottom: 2px;
		right: 2px;
		z-index: -1;
		border-radius: 8px;
		transition: all 0.5s;
		background-color: var(--main-bg)
	}

	.hamburger {
		height: 1.25rem;
		display: grid;
		grid-template-rows: repeat(3, 1fr);
		justify-items: center;
		z-index: 120;

		width: min-content;
		margin-left: auto;
		padding: 0.2rem 0.75rem 0rem;
	}

	.hamburger div {
		background-color: var(--focus-text);
		position: relative;
		width: 1.2rem;
		height: 0.2rem;
		transition: all 0.2s ease-in-out;
		border-radius: 5px;
	}

	#mobile-menu-toggle {
		display: none;
	}

	#mobile-menu-toggle:checked + .hamburger .top {
		transform: rotate(-45deg);
		margin-top: 0.4rem;
	}

	#mobile-menu-toggle:checked + .hamburger .meat {
		transform: rotate(45deg);
		margin-top: -0.21rem;
	}

	#mobile-menu-toggle:checked + .hamburger .bottom {
		transform: scale(0);
	}

	#mobile-menu-toggle:checked ~ .mobile-menu {
		height: 10rem;
	}

	/* Menu */
	.mobile-menu {
		width: 100%;
		background-color: var(--bg-alt);
		margin: 0;
		display: flex;
		flex-direction: column;
		padding: 0;
		clear: both;
		width: auto;
		text-align: center;
		height: 0px;
		overflow: hidden;
		transition: height 0.4s ease;
		z-index: 120;
		transition: all 0.3s ease;
		border-radius: 15px;
		margin-top: 0.25rem;
		grid-column: span 2;
	}

	/* Small devices (portrait tablets and large phones, 600px and up) */
	@media only screen and (max-width: 767px) {
		#name {
			font-size: 2rem;
		}

		.mobile {
			display: grid;
		}

		.not-mobile {
			display: none;
		}
	}

	/* Large devices (laptops/desktops, 992px and up) */
	@media only screen and (max-width: 992px) {
		.not-mobile > :not(:first-child, :last-child) {
			margin-right: 1rem;
		}
	}
</style>
