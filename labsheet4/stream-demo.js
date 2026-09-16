const fs = require("fs");

const fileName = "large-file.txt";

let content = "";

for (let i = 1; i <= 50; i++) {
    content += `This is line number ${i} of the large file.\n`;
}


fs.writeFile(fileName, content, (err) => {

    if (err) {
        console.log("Error creating file:", err);
        return;
    }

    console.log("50-line file created.");

    const readStream =
        fs.createReadStream(fileName);

    readStream.on("data", (chunk) => {

        console.log(
            "Chunk received:",
            chunk.length,
            "bytes"
        );

    });


    readStream.on("end", () => {

        console.log(
            "Finished reading the file."
        );

    });


    readStream.on("error", (err) => {

        console.log(
            "Error reading file:",
            err
        );

    });

});