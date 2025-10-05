<script lang="ts">
    import { browserState } from "$lib/browserState.svelte";
    import { DetailLayout, FileCollectionLayout, Format, PropertyType, type FileGroup } from "$lib/types.svelte";
    import FileGroupUI from "./FileGroupUI.svelte";

    let {
        fileGroups,
        fileCollectionLayout,
        detailLayout,
        inRows,
        textSize,
        showHeaders
    } : {
        fileGroups: FileGroup[],
        fileCollectionLayout: FileCollectionLayout,
        detailLayout: DetailLayout,
        inRows: boolean,
        textSize: number,
        showHeaders: boolean
    } = $props();
    
    let previewSize = $derived(fileCollectionLayout.previewSize);
    
    let maxShownProperties: number = $derived.by(() => {
        let gapHeight: number = textSize * 0.38;
        return Math.min(fileCollectionLayout.maxProperties, 1 + Math.floor(fileCollectionLayout.previewSize / (gapHeight + textSize)));
    })
</script>



<div class="FileCollectionUI">
    <div class="fileGroups" style:grid-auto-flow={inRows ? "column" : "row"}>
        {#each fileGroups as fileGroup, index}
        <FileGroupUI 
        {fileGroup} {textSize} 
        {previewSize} {maxShownProperties} {detailLayout} {inRows}
        showHeader={showHeaders}
        isFirstGroup={index == 0}
        showFileExtension={browserState.showFileExtensions && fileCollectionLayout.groupedProperty != PropertyType.fileExtension}
        />
        {/each}
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