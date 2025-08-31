<script lang="ts">
    import { DetailLayout, FileCollectionLayout, FileSector, Format } from "$lib/types.svelte";

    let {
        fileCollectionLayout = $bindable(),
        fileSector = $bindable(null)
    } : {
        fileCollectionLayout: FileCollectionLayout,
        fileSector?: FileSector|null
    } = $props();

    let groupedProperties = Format.defaultsPerProperty.keys();
    let orderedProperties = Format.defaultsPerProperty.keys();
</script>



<div class="SectorViewConfig">
    <div class="sectorViewConfigColumn">
        <label>
            <input type="range" bind:value={fileCollectionLayout.previewSize}/>
            <span>Preview Size: {fileCollectionLayout.previewSize}</span>
        </label>

        <label>
            <span>Group by:</span>
            <select bind:value={fileCollectionLayout.groupedProperty}>
                {#each groupedProperties as groupedPropertyName}
                <option value={groupedPropertyName}>{groupedPropertyName}</option>
                {/each}
            </select>
        </label>
        
        <label>
            <span>Order by:</span>
            <select bind:value={fileCollectionLayout.orderedProperty}>
                {#each orderedProperties as orderedPropertyName}
                <option value={orderedPropertyName}>{orderedPropertyName}</option>
                {/each}
            </select>
        </label>
    </div>

    {#if fileSector}
    <div class="sectorViewConfigColumn">
        <label>
            <span>Detail Layout:</span>
            <select bind:value={fileSector.detailLayout}>
                {#each Object.values(DetailLayout) as detailLayoutMode}
                <option value={detailLayoutMode}>{detailLayoutMode}</option>
                {/each}
            </select>
        </label>

        <label>
            <input type="checkbox" name="inRows" bind:checked={fileSector.inRows}/>
            In Rows
        </label>
    </div>
    {/if}
</div>



<style>
    .SectorViewConfig {
        /* grid-row: 1 / -1; */
        width: 100%;
        height: max-content;
        
        display: flex;
        flex-flow: row nowrap;
    }

    .sectorViewConfigColumn {
        width: max-content;
        display: flex;
        flex-flow: column nowrap;
        gap: 8px;
        padding: 8px 13px;

        &:not(:first-of-type) {
            box-sizing: content-box;
            border-left: 1px solid #555;
        }
    }

    label {
        /* grid-column: 1 / -1;

        display: grid;
        gap: 0 0.6em;
        grid-auto-flow: row;
        grid-template-columns: subgrid;
        grid-auto-rows: max-content;
        text-wrap: nowrap;
        align-items: center; */
    }

    select {
        padding: 0 0.4em;
    }
</style>