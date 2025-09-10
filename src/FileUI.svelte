<script lang="ts">
    import { DetailLayout, FileCollectionLayout, Format, type File } from "$lib/types.svelte";

    let {
        file: file = $bindable(),
        textSize = 13,
        previewSize = 21,
        maxShownProperties = 1,
        showFileExtension,
        hideFileExtensionProperty,
        detailLayout
    } : {
        file: File,
        textSize: number,
        previewSize: number,
        maxShownProperties: number,
        showFileExtension: boolean, 
        hideFileExtensionProperty: boolean,
        detailLayout: DetailLayout
    } = $props();

    let textBelow: boolean = $derived(detailLayout === DetailLayout.Below);
</script>



<div class="FileUI" 
    style:gap={`${(Math.sqrt(Math.max(textSize, previewSize)))}px ${(2 * Math.sqrt(Math.max(textSize, previewSize)))}px`} 
    style:flex-flow={textBelow ? "column" : "row"}
    style:align-items={"center"} 
    style:justify-items={textBelow ? "start" : "center"}
>
    <img class="filePreview" alt="" src={file.preview} style:height={`${previewSize}px`}>

    <div class="fileDescription" style:font-size={`${textSize}px`} 
        style:align-items={textBelow ? "center" : "start"} 
        style:justify-items={textBelow ? "start" : "center"}
    >
        <span class="fileName">
            {file.name}{#if showFileExtension && (file.extension != "")}<span class="extension">{`.${file.extension}`}</span>{/if}
        </span>

        <div class="fileProperties">
            {#each file.getProperties().filter(property => 
                property.key != Format.propertyKeyForName
                && !(hideFileExtensionProperty && property.key == Format.propertyKeyForExtension)
                && property.value.toString().trim() != ""
            ).slice(0, maxShownProperties - 1) as property, index}
            {#if (1 + index) < maxShownProperties}
            <span class="fileProperty">{`${isNaN(property.value) ? "" : `${property.key}: `}${property.value}`}</span>
            {/if}
            {/each}
        </div>
    </div>
</div>



<style>
    .FileUI {
        width: 100%;
        height: fit-content;
        display: flex;
    }

    .filePreview {
        width: auto;
    }

    .fileDescription {
        width: max-content;
        text-wrap: nowrap;
        display: flex;

        flex-flow: column nowrap;

        .fileName {
            width: max-content;
            font-size: inherit;

            > .extension {
                font-size: inherit;
                color: var(--gray-3);
            }
        }
        
        .fileProperties {
            width: fit-content;
            color: var(--gray-3);
            font-size: inherit;
            display: flex;

            flex-flow: column nowrap;
            gap: 0.38cap;

            .fileProperty {
                font-size: inherit;

                &:first-of-type {
                    padding-top: 0.38cap;
                }
            }
        }
    }
</style>