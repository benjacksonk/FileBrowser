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
        <div class="windowControlIcon closeIcon">
            <div class="closeIconHalf"></div>
            <div class="closeIconHalf"></div>
        </div>
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
        width: 29px;
        height: 29px;
        padding: 4px;
        /* background-color: #444; */
        display: grid;
        
        justify-content: center;
        align-content: center;
        justify-items: center;
        align-items: center;
        
        .windowControlIcon,
        .closeIconHalf {
            transition: 0.05s ease-out;
        }

        .minimizeIcon {
            width: 21px;
            height: 13px;
            border-radius: 6.5px;
            background-color: #8ca9ff;
        }
        &:hover .minimizeIcon {
            width: 13px;
        }

        .maximizeIcon {
            width: 13px;
            height: 21px;
            border-radius: 6.5px;
            background-color: #6ec480;
        }
        &:hover .maximizeIcon {
            /* height: 13px; */
            
            width: 21px;
            border-radius: 10.5px;
        }

        .closeIcon {
            display: grid;
            grid-template: auto / auto;
            justify-content: center;
            align-content: center;
            justify-items: center;
            align-items: center;
            rotate: 45deg;
            
            .closeIconHalf {
                grid-row: 1;
                grid-column: 1;
                width: 13px;
                height: 21px;
                border-radius: 6.5px;
                background-color: #f48c7d;

                &:nth-child(2) {
                    height: 13px;
                    rotate: 90deg;
                }
            }
        }
        &:hover .closeIconHalf {
            &, 
            &:nth-child(2) {
                width: 5px;
                height: 27px;
                border-radius: 50%;
            }
        }
    }
</style>