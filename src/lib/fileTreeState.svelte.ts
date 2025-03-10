import { Asset, FileSector } from "./types.svelte";

export const fileTreeState = $state<FileSector>(generateRootFileSector());

function generateRootFileSector() {
    return new FileSector("Documents", [
        new Asset("June.doc"),
        new FileSector("January"),
        new Asset("November.doc"),
        new Asset("April.doc"),
        new FileSector("July"),
        new Asset("February.txt"),
        new FileSector("December"),
        new Asset("May.pdf"),
        new Asset("September.doc"),
        new Asset("October.png"),
        new Asset("March.doc"),
        new Asset("August.png")
    ]);
    
    /*
    return new FileSector("Root", [
        // apps tools installations addons extensions programs utilities modules
        new FileSector("Apps"),
        new FileSector("Desktop"),
        new FileSector("Documents", [
            new Asset("June.doc"),
            new FileSector("January"),
            new Asset("November.doc"),
            new Asset("April.doc"),
            new FileSector("July"),
            new Asset("February.txt"),
            new FileSector("December"),
            new Asset("May.pdf"),
            new Asset("September.doc"),
            new Asset("October.png"),
            new Asset("March.doc"),
            new Asset("August.png")
        ]),
        new FileSector("Downloads", []),
        new FileSector("Games"),
        new FileSector("Music", []),
        new FileSector("Pictures", [
            new Asset("Rat.jpg"),
            new Asset("Ox.png"),
            new Asset("Tiger.jpg"),
            new Asset("Rabbit.jpg"),
            new Asset("Dragon.png"),
            new Asset("Snake.bmp"),
            new Asset("Horse.png"),
            new Asset("Goat.jpg"),
            new Asset("Monkey.jpg"),
            new Asset("Rooster.webp"),
            new Asset("Dog.jpg"),
            new Asset("Pig.webp")
        ]),
        new FileSector("Videos")
    ])
    .files.find(it => it instanceof FileSector && it.name === "Documents") as FileSector;
    /**/
}