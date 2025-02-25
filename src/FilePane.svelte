<script lang="ts">
    import { rootFileSector } from "$lib/fileTreeState.svelte";
    import File from "./File.svelte";
    import FilePaneConfig from "./FilePaneConfig.svelte";
</script>



<div class="FilePane">
    <FilePaneConfig bind:fileSectorViewConfig={rootFileSector.viewConfig}/>
    
    {#each rootFileSector.files as afile}
    <File {afile} fileSectorViewConfig={rootFileSector.viewConfig}/>
    {/each}
</div>



<style>
    .FilePane {
        width: 100%;
        height: 100%;
        padding: 20px;
        display: grid;
        gap: 10px;
        align-content: start;
        justify-content: flex-start;
    }
</style>