<script lang="ts">
    import { browserState } from "$lib/browserState.svelte";
    import { rootFileSectorState } from "$lib/fileTreeState.svelte";
    import FileArray from "./FileArray.svelte";
    import FilePaneConfig from "./FilePaneConfig.svelte";
    import FileBrowserConfig from "./FileBrowserConfig.svelte";
</script>



<div class="FilePane">
    <FileBrowserConfig 
        bind:splitSubsectors={browserState.splitSubsectors}
        bind:showFileExtensions={browserState.showFileExtension}
    />

    <FilePaneConfig bind:orderedProperty={rootFileSectorState.orderedProperty}/>

    <div class="fileArrays">
        {#if browserState.splitSubsectors}
        <FileArray 
            bind:sortedFiles={rootFileSectorState.sectors} 
            bind:previewSize={browserState.subsectorPanePreviewSize} 
            bind:nameSize={browserState.subsectorPaneNameSize}
        />
        <FileArray 
            bind:sortedFiles={rootFileSectorState.files} 
            bind:previewSize={rootFileSectorState.previewSize} 
            bind:nameSize={rootFileSectorState.nameSize}
        />
        {:else}
        <FileArray 
            bind:sortedFiles={rootFileSectorState.afiles} 
            bind:previewSize={rootFileSectorState.previewSize} 
            bind:nameSize={rootFileSectorState.nameSize}
        />
        {/if}
    </div>
</div>



<style>
    .FilePane {
        width: 100%;
        height: 100%;
        padding: 20px;
    }

    .fileArrays {
        width: 100%;
        height: 100%;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 50%;
    }
</style>