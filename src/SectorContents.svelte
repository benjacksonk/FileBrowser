<script lang="ts">
    import { Layout } from "$lib/types.svelte";
    import { browserState } from "$lib/browserState.svelte";
    import { fileTreeState } from "$lib/fileTreeState.svelte";
    import FileBrowserConfig from "./FileBrowserConfig.svelte";
    import SectorViewConfig from "./SectorViewConfig.svelte";
    import FileSupergroup from "./FileSupergroup.svelte";
</script>



<div class="SectorContents">
    <FileBrowserConfig 
        bind:splitSubsectors={browserState.splitSubsectors}
        bind:showFileExtensions={browserState.showFileExtensions}
    />

    <SectorViewConfig 
        bind:groupedProperty={fileTreeState.groupedProperty}
        bind:orderedProperty={fileTreeState.orderedProperty}
        bind:flow={fileTreeState.layout}
    />

    <div class="fileSupergroup">
        {#if browserState.splitSubsectors}
        <FileSupergroup
            fileGroups={fileTreeState.sectorGroups}
            showHeaders={false}
            layout={Layout.LandscapeRows}
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
    .SectorContents {
        width: 1fr;
        height: 1fr;
        padding: 20px;
    }

    .fileSupergroup {
        width: 1fr;
        height: 1fr;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(0,1fr);
    }
</style>