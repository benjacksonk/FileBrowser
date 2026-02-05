<script lang="ts">
    import UiBrowser from "./UiBrowser.svelte";

    /* Wallpaper background image sources:

    jonflobrant (Jon Flobrant) - "body of water between trees under cloudy sky":
    https://unsplash.com/photos/body-of-water-between-trees-under-cloudy-sky-rB7-LCa_diU

    aaronburden (Aaron Burden) - "high angle photography of trees beside river":
    https://unsplash.com/photos/high-angle-photography-of-trees-beside-river-blPTIZuBhD8

    claudelrheault (Claudel Rheault) - "mountain covered with green grass":
    https://unsplash.com/photos/mountain-covered-with-green-grass-ZVbv1akA-l4

    lucabravo (Luca Bravo) - "brown house near body of water":
    https://unsplash.com/photos/brown-house-near-body-of-water-zAjdgNXsMeg
    */

   let wallpaperUrls: string[] = [
    "/images/wallpaper-Unsplash-AaronBurden.jpg",
    "/images/wallpaper-Unsplash-ClaudelRheault.jpg",
    "/images/wallpaper-Unsplash-JonFlobrant.jpg",
    "/images/wallpaper-Unsplash-LucaBravo.jpg"
   ];
</script>



<div class="UiDesktop"
style:background-image={`url(${wallpaperUrls[1]})`}
>
    <div class="frameBrowser">
        <UiBrowser/>
    </div>
</div>



<style>
    .UiDesktop {
        overflow: hidden;
        width: 100%;
        height: 100%;

        background-color: #273441;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .frameBrowser {
        width: 100%;
        height: 100%;
        padding: 20px;
    }
</style>