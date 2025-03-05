<script lang="ts">
    import { FileFlow } from "$lib/types.svelte";
    import { browserState } from "$lib/browserState.svelte";
    import { fileTreeState } from "$lib/fileTreeState.svelte";
    import FileArray from "./FileArray.svelte";
    import FileBrowserConfig from "./FileBrowserConfig.svelte";
    import SectorViewConfig from "./SectorViewConfig.svelte";
</script>



<div class="SectorContents">
    <FileBrowserConfig 
        bind:splitSubsectors={browserState.splitSubsectors}
        bind:showFileExtensions={browserState.showFileExtensions}
    />
    <SectorViewConfig 
        bind:orderedProperty={fileTreeState.orderedProperty}
        bind:flow={fileTreeState.flow}
    />

    <div class="fileArrays">
        {#if browserState.splitSubsectors}
            <FileArray 
                bind:files={fileTreeState.sectors} 
                bind:previewSize={browserState.defaultPreviewSize} 
                bind:nameSize={browserState.defaultPaneNameSize}
                flow={FileFlow.LandscapeColumns}
            />
            <FileArray 
                bind:files={fileTreeState.files} 
                bind:previewSize={fileTreeState.previewSize} 
                bind:nameSize={fileTreeState.nameSize}
                flow={fileTreeState.flow}
            />
        {:else}
            <FileArray 
                bind:files={fileTreeState.afiles} 
                bind:previewSize={fileTreeState.previewSize} 
                bind:nameSize={fileTreeState.nameSize}
                flow={fileTreeState.flow}
            />
        {/if}
    </div>
</div>



<style>
    .SectorContents {
        width: 100%;
        height: 100%;
        padding: 20px;
    }

    .fileArrays {
        width: 100%;
        height: 100%;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(0,1fr);
    }
</style>