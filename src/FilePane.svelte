<script lang="ts">
    import { AFile, FileSector } from "$lib/types.svelte";
    import { rootFileSector } from "$lib/fileTreeState.svelte";
    import File from "./File.svelte";
    import FilePaneConfig from "./FilePaneConfig.svelte";

    let targetSector: FileSector = rootFileSector;
</script>



<div class="FilePane">
    <FilePaneConfig bind:fileSectorViewConfig={targetSector.viewConfig}/>
    
    {#each targetSector.files.sort(
        (a: AFile, b: AFile): number => {
            let orderedProperty = targetSector.viewConfig.orderedProperty;
            let propertyA = a.tryGetProperty(orderedProperty);
            let propertyB = b.tryGetProperty(orderedProperty);
            if (orderedProperty === "File Type") {
                propertyA = propertyA.name;
                propertyB = propertyB.name;
            }
            return propertyA < propertyB ? -1 : (propertyA > propertyB ? 1 : 0);
        }
    ) as afile}
    <File {afile} fileSectorViewConfig={targetSector.viewConfig}/>
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