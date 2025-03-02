<script lang="ts">
    import { browserState } from "$lib/browserState.svelte";
    import type { AFile } from "$lib/types.svelte";
    import File from "./File.svelte";

    let {
        sortedFiles = $bindable([]),
        previewSize = $bindable(21),
        nameSize = $bindable(13)
    } : {
        sortedFiles: AFile[],
        previewSize: number,
        nameSize: number
    } = $props();
</script>



<div class="FileArray">
    <div class="configBar">
        <div>
            <label for="previewSize">
                <input id="previewSize" type="range" name="previewSize" bind:value={previewSize} min="21" max="145">
                {previewSize}
            </label>
        </div>
    
        <div>
            <label for="fileNameSize">
                <input id="fileNameSize" type="range" name="fileNameSize" bind:value={nameSize} min="13" max="90">
                {nameSize}
            </label>
        </div>
    </div>
    
    {#each sortedFiles as afile}
    <File {afile} {previewSize} {nameSize} showFileExtension={browserState.showFileExtension}/>
    {/each}
</div>



<style>
    .FileArray {
        display: grid;
        grid-auto-flow: row;
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