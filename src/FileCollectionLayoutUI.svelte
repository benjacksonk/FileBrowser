<script lang="ts">
    import { DetailLayout, FileCollectionLayout, FileSector, PropertyType } from "$lib/types.svelte";

    let {
        fileCollectionLayout = $bindable(),
        fileSector = $bindable(null)
    } : {
        fileCollectionLayout: FileCollectionLayout,
        fileSector?: FileSector|null
    } = $props();

    let propertyTypes = Object.values(PropertyType);
</script>



<div class="SectorViewConfig">
    <div class="sectorViewConfigColumn">
        <label>
            <input type="range" bind:value={fileCollectionLayout.previewSize}/>
            <span>Preview Size: {fileCollectionLayout.previewSize}</span>
        </label>

        <label>
            <span>Group by:</span>
            <select bind:value={fileCollectionLayout.groupProperty}>
                {#each propertyTypes as property}
                <option value={property}>{property}</option>
                {/each}
            </select>
        </label>
        
        <label>
            <span>Order by:</span>
            <select bind:value={fileCollectionLayout.orderProperty}>
                {#each propertyTypes as property}
                <option value={property}>{property}</option>
                {/each}
            </select>
        </label>
    </div>

    {#if fileSector}
    <div class="sectorViewConfigColumn">
        <label>
            <span>Detail Layout:</span>
            <input class="numInput" type="number" min="1" max="9" step="1" bind:value={fileCollectionLayout.maxProperties}/>
            <select bind:value={fileSector.fileCollectionLayout.detailLayout}>
                {#each Object.values(DetailLayout) as detailLayoutMode}
                <option value={detailLayoutMode}>{detailLayoutMode}</option>
                {/each}
            </select>
        </label>

        <label>
            <input type="checkbox" name="inRows" bind:checked={fileSector.fileCollectionLayout.inRows}/>
            In Rows
        </label>
    </div>
    {/if}
</div>



<style>
    .SectorViewConfig {
        width: 100%;
        padding: var(--space-4) var(--space-5);
        display: grid;
        
        grid-auto-flow: column;
        grid-auto-rows: max-content;
        grid-auto-columns: max-content;
        column-gap: var(--space-9);
    }

    .sectorViewConfigColumn {
        display: grid;
        
        grid-auto-flow: row;
        grid-template-columns: subgrid;
        grid-auto-rows: max-content;
        row-gap: var(--space-4);
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

    .numInput {
        field-sizing: content;
        padding-left: var(--space-4);
    }
</style>