<script lang="ts">
    let {
        textSize = $bindable(13),
        splitSubsectors = $bindable(true),
        showFileExtensions = $bindable(true)
    } : {
        textSize: number,
        splitSubsectors: boolean,
        showFileExtensions: boolean
    } = $props();
</script>



<div class="FileBrowserConfig">
    <label>
        <input type="range" bind:value={textSize}/>
        <span>Text Size: {textSize}</span>
    </label>

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
        grid-column: 1 / -1;
        width: 100%;
        height: max-content;
        padding: 8px 13px;
        text-wrap: nowrap;
        display: grid;

        grid-auto-flow: column;
        grid-auto-rows: max-content;
        grid-auto-columns: max-content;
        gap: 60px;
    }

    label {
        width: fit-content;
        height: max-content;
        text-wrap: nowrap;
        display: flex;
        
        flex-flow: row nowrap;
        gap: 0.6em;
        align-items: center;
    }
</style>