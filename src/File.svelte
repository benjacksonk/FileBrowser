<script lang="ts">
    import { type AFile } from "$lib/types.svelte";

    let {
        afile = $bindable(),
        previewSize,
        nameSize,
        showFileExtension
    } : {
        afile: AFile,
        previewSize: number,
        nameSize: number,
        showFileExtension: boolean
    } = $props();

    let displayName = $derived(showFileExtension && afile.extension !== "" ? `${afile.name}.${afile.extension}` : afile.name);
</script>



<div class="File" style:gap={`${previewSize * (Math.sqrt(2) - 1)}px`}>
    <img class="filePreview" alt="" src={afile.preview} style:height={`${previewSize}px`}>
    <span class="fileName" style:font-size={`${nameSize}px`}>{displayName}</span>
</div>



<style>
    .File {
        width: max-content;
        height: max-content;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    }

    .filePreview {
        width: auto;
    }
</style>