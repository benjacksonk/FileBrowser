<script lang="ts">
    let {
        splitSubsectors = $bindable(true),
        showFileExtensions = $bindable(true)
    } : {
        splitSubsectors: boolean,
        showFileExtensions: boolean
    } = $props();
</script>



<div class="FileBrowserConfig">
    <label for="splitSubsectors">
        <input id="splitSubsectors" type="checkbox" name="splitSubsectors" bind:checked={splitSubsectors}/>
        Split Subsectors
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