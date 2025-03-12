<script lang="ts">
    import { Layout } from "$lib/types.svelte";
    import { browserState } from "$lib/browserState.svelte";
    import { fileTreeState } from "$lib/fileTreeState.svelte";
    import FileBrowserConfig from "./FileBrowserConfig.svelte";
    import FileSupergroup from "./FileSupergroup.svelte";
    import SectorViewConfig from "./SectorViewConfig.svelte";
</script>



<div class="Browser">
    <div class="viewConfigs">
        <FileBrowserConfig 
            bind:splitSubsectors={browserState.splitSubsectors}
            bind:showFileExtensions={browserState.showFileExtensions}
        />

        <SectorViewConfig 
            bind:groupedProperty={fileTreeState.groupedProperty}
            bind:orderedProperty={fileTreeState.orderedProperty}
            bind:flow={fileTreeState.layout}
        />
    </div>

    <div class="sectorContents">
        {#if browserState.splitSubsectors}
        <FileSupergroup
            fileGroups={fileTreeState.sectorGroups}
            showHeaders={false}
            layout={Layout.LandscapeColumns}
        />
        {/if}
        
        <FileSupergroup 
            fileGroups={browserState.splitSubsectors ? fileTreeState.assetGroups : fileTreeState.fileGroups}
            bind:previewSize={fileTreeState.previewSize}
            bind:nameSize={fileTreeState.nameSize}
            showHeaders={fileTreeState.groupedProperty !== ""}
            layout={fileTreeState.layout}
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
        grid-template-rows: max-content 1fr;
    }

    .viewConfigs {
        padding: 20px;
        gap: 0.4em 4em;
        display: grid;
        grid-auto-flow: row;
        grid-template: repeat(3, 1fr) / repeat(2, max-content);
        border-bottom: 1px solid var(--color-key-7);
    }

    .sectorContents {
        width: 100%;
        height: 100%;
        padding: 20px;
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: minmax(0,1fr);
        grid-auto-columns: minmax(0,2fr);
    }
</style>