<script lang="ts">
	import Card from "$lib/components/Card.svelte";
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

<div>
  {#each data.projects.filter(filterProjects) as project}
    <Card href={project.path} post={project}/>
  {/each}
</div>