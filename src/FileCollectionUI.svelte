<script lang="ts">
    import { DetailLayout, FileCollectionLayout, FileSector, type FileGroup } from "$lib/types.svelte";
    import FileGroupUI from "./FileGroupUI.svelte";

    let {
        fileGroups,
        fileCollectionLayout,
        detailLayout,
        inRows,
        nameSize,
        showHeaders
    } : {
        fileGroups: FileGroup[],
        fileCollectionLayout: FileCollectionLayout,
        detailLayout: DetailLayout,
        inRows: boolean,
        nameSize: number,
        showHeaders: boolean
    } = $props();
    
    let previewSize = $derived(fileCollectionLayout.previewSize);
</script>



<div class="FileCollectionUI">
    <div class="fileGroups" style:grid-auto-flow={inRows ? "column" : "row"}>
        {#each fileGroups as fileGroup}
        <FileGroupUI {fileGroup} showHeader={showHeaders} {previewSize} {nameSize} {detailLayout} {inRows}/>
        {/each}
    
        <!-- <div class="filr"><div>a</div></div> -->
    </div>
</div>



<style>
    .FileCollectionUI {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: repeat(2, max-content) 1fr;
    }

    .fileGroups {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template: 
        repeat(auto-fill, minmax(max-content, 1px)) / 
        repeat(auto-fill, minmax(max-content, 1px));
    }
</style>