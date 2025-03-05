<script lang="ts">
    import { type AFile } from "$lib/types.svelte";

    let {
        afile = $bindable(),
        previewSize,
        nameSize,
        showFileExtension, 
        nameBelow, 
        detailsBelow
    } : {
        afile: AFile,
        previewSize: number,
        nameSize: number,
        showFileExtension: boolean, 
        nameBelow: boolean, 
        detailsBelow: boolean
    } = $props();

    let displayName = $derived(showFileExtension && afile.extension !== "" ? `${afile.name}.${afile.extension}` : afile.name);
</script>



<div class="File" 
    style:gap={`${previewSize * (Math.sqrt(2) - 1)}px`} 
    style:flex-flow={`${nameBelow ? "column" : "row"} nowrap`} 
    style:align-items={"center"} 
    style:justify-items={nameBelow ? "center" : "start"}
>
    <img class="filePreview" alt="" src={afile.preview} style:height={`${previewSize}px`}>

    <div class="fileDescription" 
        style:flex-flow={`${detailsBelow ? "column" : "row"} nowrap`} 
        style:align-items={detailsBelow ? "center" : "start"} 
        style:justify-items={detailsBelow ? "start" : "center"}
    >
        <span class="fileName" style:font-size={`${nameSize}px`}>{displayName}</span>
    </div>
</div>



<style>
    .File {
        width: fit-content;
        height: fit-content;
        display: flex;

        background-color: #345;
    }

    .filePreview {
        width: auto;
    }

    .fileDescription {
        display: flex;
    }
</style>