<script lang="ts">
    import { DetailLayout, type File } from "$lib/types.svelte";

    let {
        file: file = $bindable(),
        previewSize,
        nameSize,
        showFileExtension, 
        detailLayout
    } : {
        file: File,
        previewSize: number,
        nameSize: number,
        showFileExtension: boolean, 
        detailLayout: DetailLayout
    } = $props();

    let textBelow = $derived(detailLayout === DetailLayout.Below);
    let displayName = $derived(showFileExtension && file.extension !== "" ? `${file.name}.${file.extension}` : file.name);
</script>



<div class="FileUI" 
    style:gap={`${previewSize * (Math.sqrt(2) - 1)}px`} 
    style:flex-flow={textBelow ? "column" : "row"}
    style:align-items={"center"} 
    style:justify-items={textBelow ? "start" : "center"}
>
    <img class="filePreview" alt="" src={file.preview} style:height={`${previewSize}px`}>

    <div class="fileDescription" 
        style:flex-flow={`${textBelow ? "column" : "row"} nowrap`} 
        style:align-items={textBelow ? "center" : "start"} 
        style:justify-items={textBelow ? "start" : "center"}
    >
        <span class="fileName" style:font-size={`${nameSize}px`}>{displayName}</span>
    </div>
</div>



<style>
    .FileUI {
        width: 100%;
        height: fit-content;
        display: flex;
        /* padding: 0.4em; */
    }

    .filePreview {
        width: auto;
    }

    .fileDescription {
        width: max-content;
        display: flex;
    }

    .fileName {
        width: max-content;
        text-wrap: nowrap;
    }
</style>