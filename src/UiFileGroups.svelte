<script lang="ts">
    import { DetailLayout, FileCollectionLayout, PropertyType, type FileGroup } from "$lib/types.svelte";
    import UiFile from "./UiFile.svelte";

    let {
        singleColumn,
        fileGroups,
        fileCollectionLayout,
        textSize,
        showHeaders
    } : {
        singleColumn: boolean,
        fileGroups: FileGroup[],
        fileCollectionLayout: FileCollectionLayout,
        textSize: number,
        showHeaders: boolean
    } = $props();
    
    let previewSize: number = $derived(fileCollectionLayout.previewSize);
    let stackFiles: boolean = $derived(singleColumn ? true : fileCollectionLayout.stackFiles);
    let stackGroups: boolean = $derived(singleColumn ? true : !fileCollectionLayout.stackFiles);
    let scrollHorizontally: boolean = $derived(!stackGroups)
    let detailLayout: DetailLayout = $derived(singleColumn ? DetailLayout.Beside : fileCollectionLayout.detailLayout);
    
    let maxShownProperties: number = $derived.by(() => {
        let gapHeight: number = textSize * 0.38;
        return Math.min(fileCollectionLayout.maxProperties, 1 + Math.floor(fileCollectionLayout.previewSize / (gapHeight + textSize)));
    });
    
    let showExtensions: boolean = $derived(fileCollectionLayout.showExtensions && fileCollectionLayout.groupProperty != PropertyType.fileExtension);

    let fileHeightPx: number = $derived(Math.max(fileCollectionLayout.previewSize, textSize))
</script>



<div class="UiFileGroups"
style:overflow={stackGroups ? "hidden auto" : "auto hidden"}
style:flex-flow={`${stackGroups ? "column" : "row"} nowrap`}
>
    {#each fileGroups as fileGroup, i}
    <div class="fileGroup"
    >
        {#if showHeaders}
        <div class="groupHeader">
            <span class="groupHeaderText">{fileGroup.legiblePropertyValue == "" ? "Assorted" : fileGroup.legiblePropertyValue}</span>
        </div>
        {/if}

        <div class="files"
        style:font-size={`${textSize}px`}
        style:display={stackFiles ? "flex" : "grid"}
        style:grid-template-columns={`repeat(auto-fit, minmax(${fileHeightPx}px, calc(${fileHeightPx}px + 10em)))`}
        >
            {#each fileGroup.files as file, j}
            <UiFile {file} {textSize} {previewSize} {detailLayout} {maxShownProperties} showFileExtension={showExtensions} 
            hiddenProperties={
                showExtensions ? 
                (fileGroup.propertyType ? [fileGroup.propertyType, PropertyType.fileExtension] : [PropertyType.fileExtension]) : 
                (fileGroup.propertyType ? [fileGroup.propertyType] : [])
            }/>
            {/each}
        </div>
    </div>
    {/each}
</div>



<style>
    .UiFileGroups {
        display: flex;
    }

    .fileGroup {
        min-width: max-content;
        display: grid;

        grid-auto-rows: auto;
        grid-template-columns: auto;
        align-content: start;
    }

    .groupHeader {
        /* position: sticky; */
        align-self: start;
        padding: 0 var(--space-5);
        color: var(--gray-0);
        font-weight: 500;
        display: grid;

        grid-auto-flow: row;
        /* grid-template-columns: auto; */
    }

    .groupHeaderText {
        text-wrap: wrap;
        padding: 0.618cap 0;
    }

    .files {
        overflow: hidden;
        flex-flow: column wrap;
        flex-grow: 1;
        grid-auto-rows: auto;
        align-self: stretch;

        justify-content: start;
        align-content: start;
    }
</style>