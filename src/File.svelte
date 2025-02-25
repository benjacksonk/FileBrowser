<script lang="ts">
    import { FileSectorViewConfig, type AFile } from "$lib/types.svelte";

    let {
        afile,
        fileSectorViewConfig
    } : {
        afile: AFile,
        fileSectorViewConfig: FileSectorViewConfig
    } = $props();
</script>



<div class="File" style:gap={`${fileSectorViewConfig.previewSize * (Math.sqrt(2) - 1)}px`}>
    <img class="filePreview" alt="" src={afile.preview} style:height={`${fileSectorViewConfig.previewSize}px`}>
    <span class="filename" style:font-size={`${fileSectorViewConfig.filenameSize}px`}>{afile.name}</span>
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