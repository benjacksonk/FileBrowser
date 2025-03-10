<script lang="ts">
    import { Layout, Format } from "$lib/types.svelte";

    let {
        orderedProperty = $bindable(),
        groupedProperty = $bindable(),
        flow = $bindable(Layout.LandscapeColumns)
    } : {
        orderedProperty: string,
        groupedProperty: string,
        flow: Layout
    } = $props();

    let sortProperties = Format.defaultsPerProperty.keys();
    let orderProperties = Format.defaultsPerProperty.keys();
</script>



<div class="SectorViewConfig">
    <div>
        <label id="label-flow" for="select-flow">Layout:</label>
        <select id="select-flow" name="select-flow" bind:value={flow}>
            {#each Object.values(Layout) as flowMode}
            <option value={flowMode}>{flowMode}</option>
            {/each}
        </select>
    </div>
    
    <div>
        <label id="label-groupedProperty" for="select-groupedProperty">Group by:</label>
        <select id="select-groupedProperty" name="select-groupedProperty" bind:value={groupedProperty}>
            {#each sortProperties as sortPropertyName}
            <option id={`option-groupedProperty-${sortPropertyName}`} value={sortPropertyName}>{sortPropertyName}</option>
            {/each}
        </select>
    </div>
    
    <div>
        <label id="label-orderedProperty" for="select-orderedProperty">Order by:</label>
        <select id="select-orderedProperty" name="select-orderedProperty" bind:value={orderedProperty}>
            {#each orderProperties as orderPropertyName}
            <option id={`option-orderedProperty-${orderPropertyName}`} value={orderPropertyName}>{orderPropertyName}</option>
            {/each}
        </select>
    </div>

    
    <!-- <label>
        Layout:
        <select name="select-flow" bind:value={flow}>
            {#each Object.values(FileFlow) as flowMode}
            <option value={flowMode}>{flowMode}</option>
            {/each}
        </select>
    </label>
    
    <label>
        Group by:
        <select name="select-groupedProperty" bind:value={groupedProperty}>
            {#each groupings as grouping}
            <option value={grouping}>{grouping}</option>
            {/each}
        </select>
    </label>
    
    <label>
        Order by:
        <select name="select-orderedProperty" bind:value={orderedProperty}>
            {#each sortings as sorting}
            <option value={sorting}>{sorting}</option>
            {/each}
        </select>
    </label> -->
</div>



<style>
    .SectorViewConfig {
        width: 100%;
        height: max-content;
    }
</style>