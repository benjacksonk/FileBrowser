import { fileTreeState } from "./fileTreeState.svelte";
import { FileCollectionLayout } from "./types.svelte";

export const browserState = $state({
    fileCollectionLayout: new FileCollectionLayout(),
    rootFileSector: fileTreeState,
    showFileExtensions: true,
    splitSubsectors: false,
    textSize: 13,

    defaultPreviewSize: 21
});