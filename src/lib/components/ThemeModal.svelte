<script lang="ts">
	import Desktop from '$lib/icons/Desktop.svelte';
	import Moon from '$lib/icons/Moon.svelte';
	import Sun from '$lib/icons/Sun.svelte';
	import Times from '$lib/icons/Times.svelte';
	import { theme, showThemeModal } from '$lib/shared/stores/theme';
	import { getIcon, getThemeName } from '$lib/utils';

	let color = $theme.color;
	let highContrast = $theme.highContrast;
	let seasonal = $theme.seasonal;

	const toggleThemeModal = () => {
		showThemeModal.set(!$showThemeModal);
	};

	const updateColor = (color: 'system' | 'dark' | 'light') => {
		let curTheme = $theme;
		theme.set({ color: color, highContrast: curTheme.highContrast, seasonal: curTheme.seasonal });
	};

    const toggleSeasonal = () => {
        let curTheme = $theme;
        if (curTheme.highContrast && !curTheme.seasonal) {
            highContrast = false;
            theme.set({ color: curTheme.color, highContrast: false, seasonal: !curTheme.seasonal });
        }
        else {
            theme.set({ color: curTheme.color, highContrast: curTheme.highContrast, seasonal: !curTheme.seasonal });
        }
    }

    const toggleHighContrast = () => {
        let curTheme = $theme;
        if (!curTheme.highContrast && curTheme.seasonal) {
            seasonal = false;
            theme.set({ color: curTheme.color, highContrast: !curTheme.highContrast, seasonal: false });
        }
        else {
            theme.set({ color: curTheme.color, highContrast: !curTheme.highContrast, seasonal: curTheme.seasonal });
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="modal" hidden={!$showThemeModal} on:click|stopPropagation>
	<div class="topbar">
		<h1 class="theme-title">Theme Control</h1>
		<button on:click={toggleThemeModal}>
			<Times />
		</button>
	</div>

	<div class="modal-content">
		<div class="color-select">
			<span class="color-label">Color:</span>

			<input
				id="system"
                class="color-input"
				type="radio"
				bind:group={color}
				name="color"
				value="system"
				on:click={() => {
					updateColor('system');
				}}
			/>
			<label for="system" class="color-label">
				<Desktop /> <span>System</span>
			</label>

			<input
				id="dark"
                class="color-input"
				type="radio"
				bind:group={color}
				name="color"
				value="dark"
				on:click={() => {
					updateColor('dark');
				}}
			/>
			<label for="dark" class="color-label">
				<Moon /> <span>Dark</span>
			</label>

			<input
				id="light"
                class="color-input"
				type="radio"
				bind:group={color}
				name="color"
				value="light"
				on:click={() => {
					updateColor('light');
				}}
			/>
			<label for="light" class="color-label">
				<Sun /> <span>Light</span>
			</label>
		</div>

		<div class="options">
            <div class="option-item">
                <span class="option-label">High Contrast</span>
                <label class="switch" for="highContrast">
                    <input
                        id="highContrast"
                        type="checkbox"
                        name="highContrast"
                        bind:checked={highContrast}
                        on:click={toggleHighContrast}
                    />
                    <span class="slider" ></span>
                </label>
            </div>

            <div class="option-item">
                <span class="option-label">Seasonal</span>
                <label class="switch" for="seasonal">
                    <input
                        id="seasonal"
                        type="checkbox"
                        name="seasonal"
                        bind:checked={seasonal}
                        on:click={toggleSeasonal}
                    />
                    <span class="slider"></span>
                </label>
            </div>
		</div>
        <div class="selected-theme-container">
            <span class="selected-theme">
                <svelte:component this={getIcon($theme)} /> <span class="selected-theme-name">{ getThemeName($theme) }</span>
            </span>
        </div>
	</div>
</div>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="bg-hidden" hidden={!$showThemeModal} on:click={toggleThemeModal} />

<style>
	.modal {
		position: fixed;
		margin: auto;
		padding: 1rem;
		background: var(--modal-bg);
		height: fit-content;
		z-index: 20;
		top: 10%;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		border-radius: 15px;
		filter: drop-shadow(0 0 0.75rem black);
	}

	.bg-hidden {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000;
		opacity: 25%;
		z-index: 10;
	}

	.topbar {
		display: flex;
	}

	.theme-title {
		margin: 0px;
		margin-right: auto;
	}

	.color-select, .options{
		display: flex;
		flex-direction: column;
		align-items: center;
        margin-top: 1.5rem;
	}

    .option-item {
        display: flex;
        align-items: center;
        margin: auto;
		margin-bottom: 1rem;
    }

    .option-label {
        margin-right: 1rem;
    }

	.color-label {
		margin: auto;
	}

	.switch {
		position: relative;
		display: inline-block;
		width: 5rem;
		height: 2.5rem;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--slider-unselected-bg);
		-webkit-transition: 0.4s;
		transition: 0.4s;
        border-radius: 34px;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 1.8rem;
		width: 1.8rem;
		left: 0.3rem;
		bottom: 0.35rem;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
        border-radius: 50%;
	}

    .selected-theme-container {
        display: flex;
        margin-top: 2rem;
    }

    .selected-theme {
        background: var(--nav-hover-bg);
        padding: 0.5rem 1.5rem;
        font-size: 1.5rem;
        border-radius: 8px;
        margin: auto;
    }

    .selected-theme-name {
        font-size: 1.2rem;
    }

	input:checked + .slider {
		background: var(--slider-selected-bg);
	}

	input:focus + .slider {
		box-shadow: 0 0 1px var(--slider-selected-bg);
	}

	input:checked + .slider:before {
		transform: translateX(2.5rem);
	}

	input:checked + label {
		margin: auto;
		background: var(--nav-hover-bg);
	}

	button {
		background: transparent;
		border: none;
		font-size: 1.5rem;
		font-weight: bolder;
		padding: 0.25rem 1rem;
		border-radius: 8px;
		color: var(--focus-text);
	}

	button:hover {
		cursor: pointer;
		background: var(--nav-hover-bg);
	}

	.color-input {
		display: none;
	}

	.color-label {
		margin: auto;
		padding: 0.5rem 1.5rem;
		border-radius: 8px;
		font-size: 1.5rem;
	}

	.color-label:hover {
		cursor: pointer;
		background: var(--nav-hover-bg);
	}

	span {
		font-size: 1.2rem;
	}

	/* Large devices (laptops/desktops, 992px and up) */
	@media only screen and (min-width: 992px) {
		.modal {
			padding: 3rem;
		}
		.color-select, .options {
			flex-direction: row;
		}
		
	}
</style>
