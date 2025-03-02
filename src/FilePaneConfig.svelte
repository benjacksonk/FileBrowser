<script lang="ts">
    import { FileType } from "$lib/types.svelte";

    let {
        orderedProperty = $bindable()
    } : {
        orderedProperty: string
    } = $props();

    function handleClickOrderedProperty(event: MouseEvent, propertyName: string) {
        orderedProperty = propertyName;
    }
</script>



<div class="FilePaneConfig">
    <div>Ordered Property: <i>{orderedProperty}</i></div>
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