<script lang="ts">
    import { browserState } from "$lib/browserState.svelte";
    import { FileFlow, type AFile } from "$lib/types.svelte";
    import File from "./File.svelte";

    let {
        files = $bindable([]),
        previewSize = $bindable(21),
        nameSize = $bindable(13),
        flow
    } : {
        files: AFile[],
        previewSize: number,
        nameSize: number,
        flow: FileFlow
    } = $props();

    let isByRows = $derived(flow === FileFlow.LandscapeRows || flow === FileFlow.PortraitRows);
    let nameBelow = $derived(flow === FileFlow.PortraitColumns || flow === FileFlow.PortraitRows);
    let detailsBelow = $derived(flow !== FileFlow.List);
</script>



<div class="FileArray">
    <div class="configBar">
        <label>
            {previewSize}
            <input type="range" name="previewSize" bind:value={previewSize} min="21" max="145">
        </label>
    
        <label>
            {nameSize}
            <input type="range" name="fileNameSize" bind:value={nameSize} min="13" max="90">
        </label>
    </div>
    
    <div class="files"
        style:font-size={`${nameSize}px`}
        style:grid-auto-flow={isByRows ? "row" : "column"}
        style:grid-template-columns={isByRows ? `repeat(auto-fill, minmax(0, calc(${previewSize}px + 10em)))` : "unset"}
        style:grid-template-rows={isByRows ? "unset" : `repeat(auto-fill, ${previewSize}px)`}
    >
        {#each files as afile}
        <File {afile} {previewSize} {nameSize} {nameBelow} {detailsBelow} showFileExtension={browserState.showFileExtensions}/>
        {/each}
    </div>
</div>



<style>
    .FileArray {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
    }

    .configBar {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
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