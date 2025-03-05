<script lang="ts">
    import { FileFlow, FileType } from "$lib/types.svelte";

    let {
        orderedProperty = $bindable(),
        flow = $bindable(FileFlow.LandscapeColumns)
    } : {
        orderedProperty: string,
        flow: FileFlow
    } = $props();
</script>



<div class="SectorViewConfig">
    <label>
        Layout:
        <select name="select-flow" bind:value={flow}>
            {#each Object.values(FileFlow) as flowMode}
            <option value={flowMode}>{flowMode}</option>
            {/each}
        </select>
    </label>

    <label>
        Order by:
        <select name="select-orderedProperty" bind:value={orderedProperty}>
            {#each FileType.defaultsPerProperty.keys() as propertyName}
            <option value={propertyName}>{propertyName}</option>
            {/each}
        </select>
    </label>
</div>



<style>
    .SectorViewConfig {
        width: 100%;
        height: max-content;
    }
</style>