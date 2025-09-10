<script lang="ts">
    import { DetailLayout, FileCollectionLayout, Format, type FileGroup } from "$lib/types.svelte";
    import { browserState } from "$lib/browserState.svelte";
    import FileUI from "./FileUI.svelte";

    let {
        fileGroup,
        showHeader,
        textSize = 13,
        previewSize = 21,
        maxShownProperties = 1,
        detailLayout = DetailLayout.Beside,
        inRows = false,
        showFileExtension,
        isFirstGroup = false
    } : {
        fileGroup: FileGroup,
        showHeader: boolean,
        textSize: number,
        previewSize: number,
        maxShownProperties: number,
        detailLayout: DetailLayout,
        inRows: boolean,
        showFileExtension: boolean,
        isFirstGroup: boolean,
    } = $props();
</script>



<div class="FileGroupUI"
style:grid-row={inRows ? "unset" : "1 / -1"}
style:grid-column={inRows ? "1 / -1" : "unset"}
style:width={inRows ? "100%" : "fit-content"}
style:height={inRows ? "fit-content" : "100%"}
style:grid-template={`${inRows ? "auto" : "subgrid"} / subgrid`}
style:border-top-width={(inRows && !isFirstGroup) ? "1px" : "0"}
style:border-left-width={(!inRows && !isFirstGroup) ? "1px" : "0"}
>
    {#if showHeader}
    <div class="groupHeader">
        <span class="headerText">{fileGroup.legiblePropertyValue}</span>
    </div>
    {/if}

    <div class="files"
    style:grid-row={inRows ? "unset" : `${showHeader ? "2" : "1"} / -1`}
    style:font-size={`${textSize}px`}
    style:grid-auto-flow={inRows ? "row" : "column"}
    >
        {#each fileGroup.files as file}
        <FileUI {file} {textSize} {previewSize} {detailLayout} {maxShownProperties} {showFileExtension} hideFileExtensionProperty={fileGroup.propertyKey == Format.propertyKeyForExtension || showFileExtension}/>
        {/each}
    </div>
</div>



<style>
    .FileGroupUI {
        padding: var(--space-4) var(--space-5);
        border: 0 solid var(--gray-8);
        display: grid;

        grid-auto-flow: column;
    }

    .groupHeader {
        grid-column: 1 / -1;
        width: 100%;
        margin-bottom: 1cap;
        color: var(--gray-0);
        font-weight: 500;
        display: grid;

        grid-auto-flow: row;
        grid-template-rows: subgrid;
        grid-template-columns: auto 1fr;
    }

    .headerText {
        text-wrap: nowrap;
        padding-bottom: 0.618cap;
    }

    .files {
        grid-column: 1 / -1;
        width: 100%;
        height: 100%;
        display: grid;

        grid-template: subgrid / subgrid;
        gap: var(--space-3) var(--space-4);
    }
</style>