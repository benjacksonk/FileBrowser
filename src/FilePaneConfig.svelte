<script lang="ts">
    import { FileSectorViewConfig, FileType } from "$lib/types.svelte";

    let {
        fileSectorViewConfig = $bindable()
    } : {
        fileSectorViewConfig: FileSectorViewConfig
    } = $props();

    function handleClickOrderedProperty(event: MouseEvent, propertyName: string) {
        fileSectorViewConfig.orderedProperty = propertyName;
    }
</script>



<div class="FilePaneConfig">
    <div>
        <label for="previewSize">
            <input id="previewSize" type="range" name="previewSize" bind:value={fileSectorViewConfig.previewSize} min="21" max="145">
            {fileSectorViewConfig.previewSize}
        </label>
    </div>

    <div>
        <label for="fileNameSize">
            <input id="fileNameSize" type="range" name="fileNameSize" bind:value={fileSectorViewConfig.fileNameSize} min="13" max="90">
            {fileSectorViewConfig.fileNameSize}
        </label>
    </div>
    
    <div>Ordered Property: <i>{fileSectorViewConfig.orderedProperty}</i></div>
    {#each FileType.defaultsPerProperty.keys() as propertyName}
    <button onmousedown={(event) => handleClickOrderedProperty(event, propertyName)}>{propertyName}</button>
    {/each}
</div>



<style>
    .FilePaneConfig {
        width: 100%;
        height: max-content;
    }
</style>