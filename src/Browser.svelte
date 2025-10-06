<script lang="ts">
    import { browserState } from "$lib/browserState.svelte";
    import { Asset, DetailLayout, File, FileSector } from "$lib/types.svelte";
    import FileBrowserConfig from "./FileBrowserConfig.svelte";
    import FileCollectionUI from "./FileCollectionUI.svelte";
    import FileCollectionLayoutUI from "./FileCollectionLayoutUI.svelte";
</script>



<div class="Browser" style:grid-template-columns={browserState.splitSubsectors ? "max-content 1fr" : "unset"}>
    <div class="browserConfig">
        <FileBrowserConfig 
            bind:textSize={browserState.textSize}
            bind:splitSubsectors={browserState.splitSubsectors}
            bind:showFileExtensions={browserState.showFileExtensions}
        />
    </div>
    
    <div class="filePanes">
        {#if browserState.splitSubsectors}
        <div class="sectorPane filePane">
            <FileCollectionLayoutUI 
                bind:fileCollectionLayout={browserState.fileCollectionLayout}
            />
            
            <FileCollectionUI
                fileGroups={browserState.rootFileSector.fileCollectionLayout.getGroups<FileSector>(browserState.fileCollectionLayout.groupedProperty, FileSector)}
                fileCollectionLayout={browserState.fileCollectionLayout}
                detailLayout={DetailLayout.Beside}
                inRows={false}
                textSize={browserState.textSize}
                showHeaders={browserState.fileCollectionLayout.groupedProperty != null}
            />
        </div>
        {/if}

        <div class="filePane">
            <FileCollectionLayoutUI 
                bind:fileCollectionLayout={browserState.rootFileSector.fileCollectionLayout}
                bind:fileSector={browserState.rootFileSector}
            />
            
            <FileCollectionUI 
                fileGroups={browserState.splitSubsectors ? 
                    browserState.rootFileSector.fileCollectionLayout.getGroups<Asset>(browserState.rootFileSector.fileCollectionLayout.groupedProperty, Asset) : 
                    browserState.rootFileSector.fileCollectionLayout.getGroups<File>(browserState.rootFileSector.fileCollectionLayout.groupedProperty, File)
                }
                fileCollectionLayout={browserState.rootFileSector.fileCollectionLayout}
                detailLayout={browserState.rootFileSector.detailLayout}
                inRows={browserState.rootFileSector.inRows}
                textSize={browserState.textSize}
                showHeaders={browserState.rootFileSector.fileCollectionLayout.groupedProperty != null}
            />
        </div>
    </div>
</div>



<style>
    .Browser {
        width: 100%;
        height: 100%;
        background-color: var(--gray-9);
        color: white;
        display: grid;

        grid-auto-flow: row;
        grid-template-rows: repeat(2, max-content);
        grid-template-columns: max-content;
        justify-content: stretch;
        align-content: stretch;
    }

    .browserConfig {
        grid-column: 1 / -1;
        border-bottom: 1px solid var(--gray-7);
        display: grid;

        grid-template: subgrid / subgrid;
    }

    .filePanes {
        grid-row: span 2;
        grid-column: 1 / -1;
        display: grid;
        
        grid-template: subgrid / subgrid;
        grid-auto-flow: column;
    }
    
    .filePane {
        grid-row: span 2;
        display: grid;

        grid-auto-flow: row;
        grid-template: subgrid / subgrid;
        gap: 8px 13px;

        &:not(:first-of-type) {
            box-sizing: content-box;
            border-left: 1px solid var(--gray-7);
        }
    }
</style>