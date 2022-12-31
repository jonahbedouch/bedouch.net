<script lang="ts">
export let data: any;
</script>

<h1>Projects</h1>
  
<ul>
  {#each data.projects as project}
    <li>
      <h2>
        <a href={project.path}>
          {project.meta.title}
        </a>
      </h2>
      Published {project.meta.date}
    </li>
  {/each}
</ul>