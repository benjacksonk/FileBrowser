<script lang="ts">
    import { browserState } from "$lib/browserState.svelte";
    import { Asset, File, FileSector } from "$lib/types.svelte";
    import UiFileBrowserConfig from "./UiFileBrowserConfig.svelte";
    import UiFileGroups from "./UiFileGroups.svelte";
    import UiFileCollectionLayout from "./UiFileCollectionLayout.svelte";
    import UiWindowControls from "./UiWindowControls.svelte";
</script>



<div class="UiBrowser"
style:grid-template-columns={
browserState.splitSubsectors ? 
"minmax(0,max-content) minmax(0,auto)" : 
"minmax(0,auto)"
}
>
    <div class="titleBar">
        <span class="titleBarLeftControls"></span>
        <span>Typical Window Title</span>
        <UiWindowControls/>
    </div>

    {#if browserState.splitSubsectors}
    <div class="filePane sectorPane">
        <UiFileGroups
            singleColumn={true}
            fileGroups={browserState.rootFileSector.getFileGroups(FileSector, browserState.fileCollectionLayout.groupProperty, browserState.fileCollectionLayout.groupReversal, browserState.fileCollectionLayout.orderProperty, browserState.fileCollectionLayout.orderReversal)}
            fileCollectionLayout={browserState.fileCollectionLayout}
            textSize={browserState.textSize}
            showHeaders={browserState.fileCollectionLayout.groupProperty != null}
        />

        <UiFileCollectionLayout 
            bind:fileCollectionLayout={browserState.fileCollectionLayout}
            detailed={false}
        />
    </div>
    {/if}

    <div class="filePane">
        <UiFileGroups 
            fileGroups={browserState.rootFileSector.getFileGroups(browserState.splitSubsectors ? Asset : File)}
            singleColumn={false}
            fileCollectionLayout={browserState.rootFileSector.fileCollectionLayout}
            textSize={browserState.textSize}
            showHeaders={browserState.rootFileSector.fileCollectionLayout.groupProperty != null}
        />

        <UiFileCollectionLayout 
            bind:fileCollectionLayout={browserState.rootFileSector.fileCollectionLayout}
            detailed={true}
        />
    </div>

    <div class="frame-browserConfig">
        <UiFileBrowserConfig 
            bind:textSize={browserState.textSize}
            bind:splitSubsectors={browserState.splitSubsectors}
        />
    </div>
</div>



<style>
    .UiBrowser {
        overflow: hidden;
        width: 100%;
        height: 100%;
        background-color: var(--gray-9);
        color: white;
        display: grid;

        grid-template-rows: max-content auto;
        grid-auto-rows: max-content;
    }

    .titleBar {
        grid-column: 1 / -1;
        border-bottom: 1px solid #fff1;
        display: flex;

        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }
    
    .filePane {
        grid-row: span 2;
        overflow: hidden;
        display: grid;

        gap: 8px 13px;
        grid-auto-flow: column;
        grid-template: subgrid / subgrid;

        &:not(:first-of-type) {
            border-left: 1px solid var(--gray-7);
        }
    }

    .frame-browserConfig {
        grid-column: 1 / -1;
        border-top: 1px solid var(--gray-7);
        display: flex;

        flex-flow: row wrap;
    }
</style>