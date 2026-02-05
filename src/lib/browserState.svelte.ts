import { fileTreeState } from "./fileTreeState.svelte";
import { FileCollectionLayout } from "./types.svelte";

export const browserState = $state({
    fileCollectionLayout: new FileCollectionLayout(),
    rootFileSector: fileTreeState,
    splitSubsectors: false,
    textSize: 15,

    defaultPreviewSize: 19
});