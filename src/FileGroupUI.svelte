<script lang="ts">
    import { DetailLayout, type FileGroup } from "$lib/types.svelte";
    import { browserState } from "$lib/browserState.svelte";
    import FileUI from "./FileUI.svelte";

    let {
        fileGroup,
        showHeader,
        previewSize = 21,
        nameSize = 13,
        detailLayout = DetailLayout.Beside,
        inRows = false
    } : {
        fileGroup: FileGroup,
        showHeader: boolean,
        previewSize: number,
        nameSize: number,
        detailLayout: DetailLayout,
        inRows: boolean
    } = $props();
</script>



<div class="FileGroupUI"
style:grid-row={inRows ? "unset" : "1 / -1"}
style:grid-column={inRows ? "1 / -1" : "unset"}
style:width={inRows ? "100%" : "fit-content"}
style:height={inRows ? "fit-content" : "100%"}
style:grid-template={`${inRows ? "auto" : "subgrid"} / subgrid`}
>
    {#if showHeader}
    <div class="groupHeader">
        <span class="headerText">{fileGroup.legiblePropertyValue}</span>
    </div>
    {/if}

    <div class="files"
    style:grid-row={inRows ? "unset" : `${showHeader ? "2" : "1"} / -1`}
    style:font-size={`${nameSize}px`}
    style:grid-auto-flow={inRows ? "row" : "column"}
    >
        {#each fileGroup.files as file}
        <FileUI {file} {previewSize} {nameSize} {detailLayout} showFileExtension={browserState.showFileExtensions}/>
        {/each}
    </div>
</div>



<style>
    .FileGroupUI {
        /* padding: 1em; */
        display: grid;

        grid-auto-flow: column;
    }

    .groupHeader {
        grid-column: 1 / -1;
        width: 100%;
        border-bottom: 1px solid var(--color-grey-4);
        margin-bottom: 1.618ch;
        display: grid;

        grid-auto-flow: row;
        grid-template-rows: subgrid;
        grid-template-columns: auto 1fr;
    }

    .headerText {
        text-wrap: nowrap;
        padding-bottom: 0.618ch;
    }

    .files {
        grid-column: 1 / -1;
        width: 100%;
        height: 100%;
        display: grid;

        grid-template: subgrid / subgrid;
        gap: 8px 13px;
    }
</style>