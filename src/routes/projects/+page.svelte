<script lang="ts">
import Rss from "$lib/icons/Rss.svelte";

const filterProjects = (project: Record<string, any>) => {
  if (data.filter == "*") {
    return true;
  }
  else if (project.meta.tags.includes(data.filter)) {
    return true;
  }
  else {
    return false;
  }
}

export let data: any;
</script>

<h1>Projects <a href="/rss/projects"><Rss /></a></h1>

<ul>
  {#each data.posts.filter(filterProjects) as project}
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