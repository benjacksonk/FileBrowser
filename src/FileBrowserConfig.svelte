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
        padding: var(--space-4) var(--space-5);
        text-wrap: nowrap;
        display: grid;

        grid-auto-flow: column;
        grid-auto-rows: max-content;
        grid-auto-columns: max-content;
        gap: var(--space-9);
    }

    label {
        width: fit-content;
        height: max-content;
        text-wrap: nowrap;
        display: flex;
        
        flex-flow: row nowrap;
        gap: var(--space-4);
        align-items: center;
    }
</style>