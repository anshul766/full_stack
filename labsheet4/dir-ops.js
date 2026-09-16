const fs = require("fs");

const folder = "uploads";

fs.mkdir(folder, { recursive: true }, (err) => {

    if (err) {
        console.log("Error creating folder:", err);
        return;
    }

    console.log("uploads folder created.");

    fs.writeFile(`${folder}/file1.txt`, "", (err) => {

        if (err) {
            console.log(err);
            return;
        }

        fs.writeFile(`${folder}/file2.txt`, "", (err) => {

            if (err) {
                console.log(err);
                return;
            }

            fs.writeFile(`${folder}/file3.txt`, "", (err) => {

                if (err) {
                    console.log(err);
                    return;
                }

                console.log("3 files created.");

                fs.readdir(folder, (err, files) => {

                    if (err) {
                        console.log(err);
                        return;
                    }

                    console.log("\nFiles in uploads:");
                    console.log(files);

                    fs.unlink(
                        `${folder}/file2.txt`,
                        (err) => {

                            if (err) {
                                console.log(err);
                                return;
                            }

                            console.log(
                                "\nfile2.txt deleted."
                            );
                        }
                    );
                });
            });
        });
    });
});