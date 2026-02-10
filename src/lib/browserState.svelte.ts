import { fileTreeState } from "./fileTreeState.svelte";
import { FileCollectionLayout } from "./types.svelte";

export const browserState = $state({
    fileCollectionLayout: new FileCollectionLayout(),
    rootFileSector: fileTreeState,
    splitSubsectors: false,
    textSize: 14,

    defaultPreviewSize: 30
});