<script lang="ts">
    import { browserState } from "$lib/browserState.svelte";
    import { DetailLayout } from "$lib/types.svelte";
    import FileBrowserConfig from "./FileBrowserConfig.svelte";
    import FileCollectionUI from "./FileCollectionUI.svelte";
    import SectorViewConfig from "./SectorViewConfig.svelte";
</script>



<div class="Browser" style:grid-template-columns={browserState.splitSubsectors ? "max-content 1fr" : "unset"}>
    <div class="browserConfig">
        <FileBrowserConfig 
            bind:textSize={browserState.textSize}
            bind:splitSubsectors={browserState.splitSubsectors}
            bind:showFileExtensions={browserState.showFileExtensions}
        />
    </div>

    <div class="viewConfigs">
        {#if browserState.splitSubsectors}
        <SectorViewConfig 
            bind:fileCollectionLayout={browserState.fileCollectionLayout}
        />
        {/if}
    
        <SectorViewConfig 
            bind:fileCollectionLayout={browserState.rootFileSector.fileCollectionLayout}
            bind:fileSector={browserState.rootFileSector}
        />
    </div>

    <div class="sectorContents">
        {#if browserState.splitSubsectors}
        <FileCollectionUI
            fileGroups={browserState.rootFileSector.sectorGroups}
            fileCollectionLayout={browserState.fileCollectionLayout}
            detailLayout={DetailLayout.Beside}
            inRows={false}
            nameSize={browserState.textSize}
            showHeaders={browserState.fileCollectionLayout.groupedProperty !== ""}
        />
        {/if}
        
        <FileCollectionUI 
            fileGroups={browserState.splitSubsectors ? browserState.rootFileSector.assetGroups : browserState.rootFileSector.fileGroups}
            fileCollectionLayout={browserState.rootFileSector.fileCollectionLayout}
            detailLayout={browserState.rootFileSector.detailLayout}
            inRows={browserState.rootFileSector.inRows}
            nameSize={browserState.textSize}
            showHeaders={browserState.rootFileSector.fileCollectionLayout.groupedProperty !== ""}
        />
    </div>
</div>



<style>
    .Browser {
        width: 100%;
        height: 100%;
        background-color: var(--color-key-10);
        color: white;
        display: grid;
        grid-auto-flow: row;
        grid-template-rows: max-content max-content;
        grid-auto-rows: 1fr;
        grid-auto-columns: 1fr;
    }

    .browserConfig {
        grid-column: 1 / -1;
        display: grid;
        grid-auto-flow: row;
        grid-template-rows: max-content;
        grid-auto-columns: minmax(0, 1fr); 
    }

    .viewConfigs {
        grid-column: 1 / -1;
        padding: 20px;
        gap: 0.4em 4em;
        display: grid;
        grid-template: subgrid / subgrid;
        border-bottom: 1px solid var(--color-key-7);
    }

    .sectorContents {
        grid-column: 1 / -1;
        width: 100%;
        height: 100%;
        padding: 20px;
        display: grid;
        grid-template: subgrid / subgrid;
    }
</style>