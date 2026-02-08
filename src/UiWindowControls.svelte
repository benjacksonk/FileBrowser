<script lang="ts">
</script>



<div class="UiWindowControls">
    <div class="windowControl minimizeButton">
        <div class="windowControlIcon minimizeIcon"></div>
    </div>

    <div class="windowControl maximizeButton">
        <div class="windowControlIcon maximizeIcon"></div>
    </div>

    <div class="windowControl closeButton">
        <div class="windowControlIcon closeIconHalf"></div>
        <div class="windowControlIcon closeIconHalf"></div>
    </div>
</div>



<style>
    .UiWindowControls {
        /* background-color: #321; */
        display: flex;

        flex-flow: row nowrap;
        justify-content: center;
        align-content: center;
        justify-items: center;
        align-items: center;
    }

    .windowControl {
        --pillIconLong: 21;
        --pillIconShort: 13;
        --pillIconRadial: calc(var(--pillIconShort) / 2);
        --pillArea: calc(((var(--pillIconLong) - var(--pillIconShort)) * var(--pillIconShort)) + (pi * pow(var(--pillIconRadial), 2)));

        --pillIconLength: calc(1px * var(--pillIconLong));
        --pillIconWidth: calc(1px * var(--pillIconShort));
        --pillIconRadius: calc(1px * var(--pillIconRadial));
        --pillEqualCircleRadius: calc(1px * sqrt(var(--pillArea) / pi));
        --pillEqualCircleDiameter: calc(var(--pillEqualCircleRadius) * 2);
        --pillEqualSquircleWidth: calc(1px * sqrt(var(--pillArea) + ((4 - pi) * pow(var(--pillIconRadial), 2))));

        --pillIconSlantWidth: calc(((var(--pillIconLength) - var(--pillIconWidth)) / sqrt(2)) + var(--pillIconWidth));
        --pillIconSlantHalfNegSpace: calc((var(--pillIconLength) - var(--pillIconSlantWidth)) / 2);
        --pillIconPad: 13px;

        position: relative;
        width: calc(var(--pillIconLength) + (var(--pillIconPad) / 2));
        height: var(--pillIconLength);
        /* background-color: #444; */
        display: grid;
        
        justify-content: center;
        align-content: center;
        justify-items: center;
        align-items: center;

        &.closeButton {
            /* width: calc(var(--pillIconSlantWidth) + (var(--pillIconPad) / 2)); */
        }
        
        .windowControlIcon, 
        .closeIconHalf {
            position: absolute;
            top: 50%;
            left: 50%;
            translate: -50% -50%;
            transition: 0.05s ease-out;
        }
        
        .minimizeIcon,
        .maximizeIcon,
        .closeIconHalf {
            width: var(--pillEqualCircleDiameter);
            height: var(--pillEqualCircleDiameter);
            border-radius: var(--pillEqualCircleRadius);
        }

        .minimizeIcon {
            background-color: #5ec776;
        }
        &:hover .minimizeIcon {
            width: var(--pillIconLength);
            height: var(--pillIconWidth);
            border-radius: var(--pillIconRadius);
        }

        .maximizeIcon {
            background-color: #d4a703;
        }
        &:hover .maximizeIcon {
            /* width: var(--pillEqualSquircleWidth); */
            /* height: var(--pillEqualSquircleWidth); */
            /* border-radius: var(--pillIconRadius); */
            
            width: var(--pillIconWidth);
            height: var(--pillIconLength);
            border-radius: var(--pillIconRadius);
        }

        .closeIconHalf {
            /* width: var(--pillIconWidth); */
            /* height: var(--pillIconLength); */
            /* border-radius: var(--pillIconRadius); */
            background-color: #ff8474;
            rotate: 45deg;

            &:nth-child(2 of .closeIconHalf) {
                rotate: -45deg;
                visibility: hidden;
            }
        }
        &:hover .closeIconHalf {
            width: 5px;
            height: 27px;
            border-radius: 50%;

            &:nth-child(2 of .closeIconHalf) {
                visibility: visible;
            }
        }
    }
</style>