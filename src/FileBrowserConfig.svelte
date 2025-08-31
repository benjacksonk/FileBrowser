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
        width: 100%;
        height: fit-content;
        display: flex;
        flex-flow: row nowrap;
        gap: 60px;
        text-wrap: nowrap;
    }

    label {
        gap: 0.6em;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    }
</style>