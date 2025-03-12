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
    <label>
        <span>Layout:</span>
        <select bind:value={flow}>
            {#each Object.values(Layout) as flowMode}
            <option value={flowMode}>{flowMode}</option>
            {/each}
        </select>
    </label>
    
    <label>
        <span>Group by:</span>
        <select bind:value={groupedProperty}>
            {#each sortProperties as sortPropertyName}
            <option value={sortPropertyName}>{sortPropertyName}</option>
            {/each}
        </select>
    </label>
    
    <label>
        <span>Order by:</span>
        <select bind:value={orderedProperty}>
            {#each orderProperties as orderPropertyName}
            <option value={orderPropertyName}>{orderPropertyName}</option>
            {/each}
        </select>
    </label>
</div>



<style>
    .SectorViewConfig {
        grid-row: 1 / -1;
        width: 100%;
        height: max-content;
        
        display: grid;
        grid-auto-flow: column;
        grid-template: subgrid / repeat(2, max-content);
    }

    label {
        grid-column: 1 / -1;

        display: grid;
        gap: 0 0.6em;
        grid-auto-flow: row;
        grid-template-columns: subgrid;
        grid-auto-rows: max-content;
        text-wrap: nowrap;
        align-items: center;
    }

    select {
        padding: 0 0.4em;
    }
</style>