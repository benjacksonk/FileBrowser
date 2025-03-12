<script lang="ts">
    import { Layout, type FileGroup } from "$lib/types.svelte";
    import FileGroupUI from "./FileGroupUI.svelte";

    let {
        fileGroups,
        previewSize = $bindable(4),
        nameSize = $bindable(4),
        showHeaders,
        layout
    } : {
        fileGroups: FileGroup[],
        previewSize?: number,
        nameSize?: number,
        showHeaders: boolean,
        layout: Layout
    } = $props();
    
    let isByRows = $derived(layout === Layout.LandscapeRows || layout === Layout.PortraitRows);
</script>



<div class="FileSupergroup">
    <label>
        <input type="range" bind:value={previewSize}/>
        <span>Preview Size: {previewSize}</span>
    </label>

    <label>
        <input type="range" bind:value={nameSize}/>
        <span>Name Size: {nameSize}</span>
    </label>

    <div class="fileGroups" 
        style:grid-auto-flow={isByRows ? "column" : "row"}
        style:grid-template-rows={`repeat(auto-fit, minmax(${previewSize}px, auto))`}
        style:grid-template-columns={`repeat(auto-fit, minmax(${previewSize}px, auto))`}
    >
        {#each fileGroups as fileGroup}
        <FileGroupUI 
            {fileGroup}
            showHeader={showHeaders}
            {previewSize} 
            {nameSize} 
            {layout}
        />
        {/each}
    </div>
</div>



<style>
    .FileSupergroup {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: repeat(2, max-content) 1fr;
    }

    .fileGroups {
        width: 100%;
        height: 100%;
        display: grid;
        gap: 10px;
        align-content: start;
        justify-content: start;
    }
</style>