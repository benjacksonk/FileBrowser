<script lang="ts">
    import { DetailLayout, FileCollectionLayout, PropertyType } from "$lib/types.svelte";

    let {
        fileCollectionLayout = $bindable(),
        detailed
    } : {
        fileCollectionLayout: FileCollectionLayout,
        detailed: boolean
    } = $props();

    let propertyTypes = Object.values(PropertyType);
</script>



<div class="UiSectorViewConfig">
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

        <label>
            <input type="checkbox" name="showFileExtensions" bind:checked={fileCollectionLayout.showExtensions}/>
            Show File Extensions
        </label>
    </div>

    {#if detailed}
    <div class="sectorViewConfigColumn">
        <label>
            <span>Details:</span>
            <input class="numInput" type="number" min="1" max="9" step="1" bind:value={fileCollectionLayout.maxProperties}/>
            <select bind:value={fileCollectionLayout.detailLayout}>
                {#each Object.values(DetailLayout) as detailLayoutMode}
                <option value={detailLayoutMode}>{detailLayoutMode}</option>
                {/each}
            </select>
        </label>

        <label>
            <input type="checkbox" name="stackFiles" bind:checked={fileCollectionLayout.stackFiles}/>
            Stack Files
        </label>
    </div>
    {/if}
</div>



<style>
    .UiSectorViewConfig {
        width: 100%;
        height: 100%;
        padding: var(--space-4) var(--space-5);
        /* overflow: hidden; */
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