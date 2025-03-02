<script lang="ts">
    import { FileType } from "$lib/types.svelte";

    let {
        orderedProperty = $bindable()
    } : {
        orderedProperty: string
    } = $props();
</script>



<div class="FilePaneConfig">
    <label for="select-orderedProperty">Ordered Property: <i>{orderedProperty}</i></label>
    
    <select id="select-orderedProperty" name="select-orderedProperty" bind:value={orderedProperty}>
        {#each FileType.defaultsPerProperty.keys() as propertyName}
        <option value={propertyName}>{propertyName}</option>
        {/each}
    </select>
</div>



<style>
    .FilePaneConfig {
        width: 100%;
        height: max-content;
    }
</style>