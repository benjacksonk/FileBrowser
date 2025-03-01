<script lang="ts">
    let {
        splitFolderPane = $bindable(true),
        showFileExtensions = $bindable(true)
    } : {
        splitFolderPane: boolean,
        showFileExtensions: boolean
    } = $props();
</script>



<div class="FileBrowserConfig">
    <label for="splitFolderPane">
        <input id="splitFolderPane" type="checkbox" name="splitFolderPane" bind:checked={splitFolderPane}/>
        Split Folder Pane
    </label>
    <label for="showFileExtensions">
        <input id="showFileExtensions" type="checkbox" name="showFileExtensions" bind:checked={showFileExtensions}/>
        Show File Extensions
    </label>
</div>



<style>
    .FileBrowserConfig {
    }
</style>