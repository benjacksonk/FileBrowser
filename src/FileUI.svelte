<script lang="ts">
    import { type File } from "$lib/types.svelte";

    let {
        file: file = $bindable(),
        previewSize,
        nameSize,
        showFileExtension, 
        nameBelow, 
        detailsBelow
    } : {
        file: File,
        previewSize: number,
        nameSize: number,
        showFileExtension: boolean, 
        nameBelow: boolean, 
        detailsBelow: boolean
    } = $props();

    let displayName = $derived(showFileExtension && file.extension !== "" ? `${file.name}.${file.extension}` : file.name);
</script>



<div class="FileUI" 
    style:gap={`${previewSize * (Math.sqrt(2) - 1)}px`} 
    style:flex-flow={`${nameBelow ? "column" : "row"} nowrap`} 
    style:align-items={"center"} 
    style:justify-items={nameBelow ? "center" : "start"}
>
    <img class="filePreview" alt="" src={file.preview} style:height={`${previewSize}px`}>

    <div class="fileDescription" 
        style:flex-flow={`${detailsBelow ? "column" : "row"} nowrap`} 
        style:align-items={detailsBelow ? "center" : "start"} 
        style:justify-items={detailsBelow ? "start" : "center"}
    >
        <span class="fileName" style:font-size={`${nameSize}px`}>{displayName}</span>
    </div>
</div>



<style>
    .FileUI {
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