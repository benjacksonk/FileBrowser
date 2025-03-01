import { File, FileSector } from "./types.svelte";

export const rootFileSectorState = $state(generateRootFileSector());

function generateRootFileSector() {
    return new FileSector("Documents", [
        new File("June.doc"),
        new FileSector("January"),
        new File("November.doc"),
        new File("April.doc"),
        new FileSector("July"),
        new File("February.txt"),
        new FileSector("December"),
        new File("May.pdf"),
        new File("September.doc"),
        new File("October.png"),
        new File("March.doc"),
        new File("August.png")
    ]);
    
    return new FileSector("Root", [
        // apps tools installations addons extensions programs utilities modules
        new FileSector("Apps"),
        new FileSector("Desktop"),
        new FileSector("Documents", [
            new File("June.doc"),
            new FileSector("January"),
            new File("November.doc"),
            new File("April.doc"),
            new FileSector("July"),
            new File("February.txt"),
            new FileSector("December"),
            new File("May.pdf"),
            new File("September.doc"),
            new File("October.png"),
            new File("March.doc"),
            new File("August.png")
        ]),
        new FileSector("Downloads", []),
        new FileSector("Games"),
        new FileSector("Music", []),
        new FileSector("Pictures", [
            new File("Rat.jpg"),
            new File("Ox.png"),
            new File("Tiger.jpg"),
            new File("Rabbit.jpg"),
            new File("Dragon.png"),
            new File("Snake.bmp"),
            new File("Horse.png"),
            new File("Goat.jpg"),
            new File("Monkey.jpg"),
            new File("Rooster.webp"),
            new File("Dog.jpg"),
            new File("Pig.webp")
        ]),
        new FileSector("Videos")
    ])
    .files.find(it => it instanceof FileSector && it.name === "Documents") as FileSector //temp;
}