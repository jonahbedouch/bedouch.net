<script lang="ts">
	import WorkEntry from "./WorkEntry.svelte";


</script>

<div class="projects-section">
    <h1 class="heading">Work Experience.</h1>

    <WorkEntry employer="Bosch USA" title="Customer Engineering Intern - Nevonex" timeRange="October 2022 - Present" description="Redesign User Interface for Nevonex Features to maximize usability by improving layout and standardizing control structure. Modernize existing frontend using VueJS to improve efficiency, maintainability, and extensibilityRedesign User Interface for Nevonex Features to maximize usability by improving layout and standardizing control structure Modernize existing frontend using VueJS to improve efficiency, maintainability, and extensibility"></WorkEntry>
    <WorkEntry employer="Leap XR, LLC." title="Full Stack Developer" timeRange="January 2021 - Present" description="Develop a teacher dashboard used to view student data and as an aid in administering lessons and starting virtual experiences using VueJS and Tailwind CSS
    and implement websocket-based networking and a Node.js backend server to facilitate communication
    between Virtual Reality headsets, a Web Dashboard, and a MongoDB database."></WorkEntry>

</div>


<style>
    .projects-section {
        margin: 2.5rem auto 0px;
        width: 100%;
    }

    .heading {
        color: var(--focus-text);
        font-size: 3rem;
        margin: 0;
    }

    /* Large devices (laptops/desktops, 992px and up) */
	@media only screen and (min-width: 992px) {
		.projects-section {
			margin: 1rem auto 0px;
		}
	}
</style>