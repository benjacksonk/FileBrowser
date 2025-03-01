<script lang="ts">
    import { FileSectorViewConfig, type AFile } from "$lib/types.svelte";

    let {
        afile,
        fileSectorViewConfig,
        showFileExtension
    } : {
        afile: AFile,
        fileSectorViewConfig: FileSectorViewConfig,
        showFileExtension: boolean
    } = $props();
</script>



<div class="File" style:gap={`${fileSectorViewConfig.previewSize * (Math.sqrt(2) - 1)}px`}>
    <img class="filePreview" alt="" src={afile.preview} style:height={`${fileSectorViewConfig.previewSize}px`}>
    <span class="fileName" style:font-size={`${fileSectorViewConfig.fileNameSize}px`}>
        {showFileExtension ? `${afile.name}.${afile.extension}` : afile.name}
    </span>
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