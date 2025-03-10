<script lang="ts">
    import { Layout, type FileGroup } from "$lib/types.svelte";
    import { browserState } from "$lib/browserState.svelte";
    import FileUI from "./FileUI.svelte";

    let {
        fileGroup,
        previewSize = 21,
        nameSize = 13,
        flow
    } : {
        fileGroup: FileGroup,
        previewSize: number,
        nameSize: number,
        flow: Layout
    } = $props();

    let isByRows = $derived(flow === Layout.LandscapeRows || flow === Layout.PortraitRows);
    let nameBelow = $derived(flow === Layout.PortraitColumns || flow === Layout.PortraitRows);
    let detailsBelow = $derived(flow !== Layout.List);
</script>



<div class="FileGroupUI">
    <!-- {#if fileGroup.propertyValue !== "" && fileGroup.propertyValue != null} -->
    <span class="groupHeader">{fileGroup.propertyValue}</span>
    <!-- {/if} -->

    <div class="files"
        style:font-size={`${nameSize}px`}
        style:grid-auto-flow={isByRows ? "row" : "column"}
        style:grid-template-columns={isByRows ? `repeat(auto-fill, minmax(0, calc(${previewSize}px + 10em)))` : "unset"}
        style:grid-template-rows={isByRows ? "unset" : `repeat(auto-fill, ${previewSize}px)`}
    >
        {#each fileGroup.files as afile}
        <FileUI {afile} {previewSize} {nameSize} {nameBelow} {detailsBelow} showFileExtension={browserState.showFileExtensions}/>
        {/each}
    </div>
</div>



<style>
    .FileGroupUI {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
    }

    .groupHeader {
        height: 2lh;
        width: 100%;
        /* margin: 0 1em; */
        border-bottom: 1px solid var(--color-grey-4);
    }

    .files {
        width: 100%;
        height: 100%;
        display: grid;
        gap: 10px;
        grid-auto-rows: max-content;
        grid-auto-columns: max-content;
        align-content: start;
        justify-content: start;
    }
</style>