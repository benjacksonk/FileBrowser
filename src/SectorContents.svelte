<script lang="ts">
    import { Layout } from "$lib/types.svelte";
    import { browserState } from "$lib/browserState.svelte";
    import { fileTreeState } from "$lib/fileTreeState.svelte";
    import FileBrowserConfig from "./FileBrowserConfig.svelte";
    import SectorViewConfig from "./SectorViewConfig.svelte";
    import FileGroupUI from "./FileGroupUI.svelte";
    
    let isByRows = $derived(fileTreeState.flow === Layout.LandscapeRows || fileTreeState.flow === Layout.PortraitRows);
</script>



<div class="SectorContents">
    <FileBrowserConfig 
        bind:splitSubsectors={browserState.splitSubsectors}
        bind:showFileExtensions={browserState.showFileExtensions}
    />
    <SectorViewConfig 
        bind:groupedProperty={fileTreeState.groupedProperty}
        bind:orderedProperty={fileTreeState.orderedProperty}
        bind:flow={fileTreeState.flow}
    />

    <div class="fileSupergroup">
        <!-- {#if browserState.splitSubsectors}
        <div class="fileGroups" style:grid-auto-flow={"row"}>
            {#each fileTreeState.sectorGroups as fileGroup}
            <FileGroupUI 
                {fileGroup} 
                showHeader={false}
                previewSize={fileTreeState.previewSize} 
                nameSize={fileTreeState.nameSize} 
                flow={fileTreeState.flow}
            />
            {/each}
        </div>
        {/if} -->
        
        <div class="fileGroups" style:grid-auto-flow={isByRows ? "column" : "row"}>
            {#each (browserState.splitSubsectors ? fileTreeState.fileGroups/*assetGroups*/ : fileTreeState.fileGroups) as fileGroup}
            <FileGroupUI 
                {fileGroup}
                showHeader={fileTreeState.groupedProperty !== ""}
                previewSize={fileTreeState.previewSize} 
                nameSize={fileTreeState.nameSize} 
                flow={fileTreeState.flow}
            />
            {/each}
        </div>
    </div>
</div>



<style>
    .SectorContents {
        width: 100%;
        height: 100%;
        padding: 20px;
    }

    .fileSupergroup {
        width: 100%;
        height: 100%;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(0,1fr);
    }

    .fileGroups {
        width: 100%;
        height: 100%;
        display: grid;
        gap: 10px;
        grid-auto-rows: minmax(0,1fr);
        grid-auto-columns: minmax(0,1fr);
        grid-template: repeat(auto-fit, minmax(0,1fr)) / repeat(auto-fit, minmax(0,1fr));
        align-content: start;
        justify-content: start;
    }
</style>