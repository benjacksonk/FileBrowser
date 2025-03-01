<script lang="ts">
    import { AFile, FileSector, FileType } from "$lib/types.svelte";
    import { rootFileSectorState } from "$lib/fileTreeState.svelte";
    import File from "./File.svelte";
    import FilePaneConfig from "./FilePaneConfig.svelte";
    import FileBrowserConfig from "./FileBrowserConfig.svelte";

    let splitFolderPane: boolean = $state(true);
    let showFileExtensions: boolean = $state(true);

    let sortedFiles: AFile[] = $derived(
        rootFileSectorState.files.toSorted((a: AFile, b: AFile): number => {
            let orderedProperty = rootFileSectorState.viewConfig.orderedProperty;
            let propertyA = a.tryGetProperty(orderedProperty);
            let propertyB = b.tryGetProperty(orderedProperty);
            if (orderedProperty === "Type") {
                propertyA = propertyA.name;
                propertyB = propertyB.name;
            }
            return propertyA < propertyB ? -1 : (propertyA > propertyB ? 1 : 0);
        }));
    let subSectors: FileSector[] = $derived(sortedFiles.filter(it => it instanceof FileSector));
    let subFiles: FileSector[] = $derived(sortedFiles.filter(it => it !instanceof FileSector));
</script>



<div class="FilePane">
    <div class="configBar">
        <FileBrowserConfig bind:splitFolderPane bind:showFileExtensions/>
        <FilePaneConfig bind:fileSectorViewConfig={rootFileSectorState.viewConfig}/>
    </div>
    
    {#each sortedFiles as afile}
    <File {afile} fileSectorViewConfig={rootFileSectorState.viewConfig} showFileExtension={showFileExtensions}/>
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

    .configBar {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
    }
</style>