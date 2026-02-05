<script lang="ts">
    let {
        textSize = $bindable(13),
        splitSubsectors = $bindable(true)
    } : {
        textSize: number,
        splitSubsectors: boolean
    } = $props();
</script>



<div class="UiFileBrowserConfig">
    <label>
        <input type="range" bind:value={textSize}/>
        <span>Text Size: {textSize}</span>
    </label>

    <label>
        <input type="checkbox" name="splitSubsectors" bind:checked={splitSubsectors}/>
        Split Sectors
    </label>
</div>



<style>
    .UiFileBrowserConfig {
        width: 100%;
        height: max-content;
        padding: var(--space-4) var(--space-5);
        text-wrap: nowrap;
        display: flex;

        flex-flow: row wrap;
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