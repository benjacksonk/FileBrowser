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
    <label>
        <input type="checkbox" name="splitSubsectors" bind:checked={splitSubsectors}/>
        Split Sectors
    </label>

    <label>
        <input type="checkbox" name="showFileExtensions" bind:checked={showFileExtensions}/>
        Show File Extensions
    </label>
</div>



<style>
    .FileBrowserConfig {
        width: fit-content;
        grid-row: 1 / -1;
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: subgrid;
        grid-template-columns: subgrid;
        text-wrap: nowrap;
    }

    label {
        gap: 0.6em;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    }
</style>