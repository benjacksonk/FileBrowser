<script lang="ts">
    import { Layout, type FileGroup } from "$lib/types.svelte";
    import { browserState } from "$lib/browserState.svelte";
    import FileUI from "./FileUI.svelte";

    let {
        fileGroup,
        showHeader,
        previewSize = 21,
        nameSize = 13,
        layout
    } : {
        fileGroup: FileGroup,
        showHeader: boolean,
        previewSize: number,
        nameSize: number,
        layout: Layout
    } = $props();

    let isByRows = $derived(layout === Layout.LandscapeRows || layout === Layout.PortraitRows);
    let nameBelow = $derived(layout === Layout.PortraitColumns || layout === Layout.PortraitRows);
    let detailsBelow = $derived(layout !== Layout.List);
</script>



<div class="FileGroupUI"
    style:grid-row={isByRows ? "unset" : "1 / -1"}
    style:grid-column={isByRows ? "1 / -1" : "unset"}
>
    {#if showHeader}
    <span class="groupHeader">{fileGroup.legiblePropertyValue}</span>
    {/if}

    <div class="files"
        style:font-size={`${nameSize}px`}
        style:grid-auto-flow={isByRows ? "row" : "column"}
        style:grid-row={`${showHeader ? "2" : "1"} / -1`}
    >
        {#each fileGroup.files as file}
        <FileUI {file} {previewSize} {nameSize} {nameBelow} {detailsBelow} showFileExtension={browserState.showFileExtensions}/>
        {/each}
    </div>
</div>



<style>
    .FileGroupUI {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template: subgrid / subgrid;
    }

    .groupHeader {
        grid-column: 1 / -1;
        height: 2lh;
        width: 100%;
        /* margin: 0 1em; */
        border-bottom: 1px solid var(--color-grey-4);
    }

    .files {
        grid-column: 1 / -1;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template: subgrid / subgrid;
        gap: 10px;
        align-content: start;
        justify-content: start;
    }
</style>