<script lang="ts">
    import { FileSectorViewConfig } from "$lib/types.svelte";

    let {
        fileSectorViewConfig = $bindable()
    } : {
        fileSectorViewConfig: FileSectorViewConfig
    } = $props();
</script>



<div class="FilePaneConfig">
    <input type="range" name="previewSize" bind:value={fileSectorViewConfig.previewSize} min="21" max="145">
    <input type="range" name="fileNameSize" bind:value={fileSectorViewConfig.filenameSize} min="13" max="90">
</div>



<style>
    .FilePaneConfig {
        width: 100%;
        height: max-content;
    }
</style>