const fs = require("fs");

const studentFile = "student.txt";
const profileFile = "profile.txt";

const studentData = `Name: Anshul
Roll Number: 12345`;

fs.writeFile(studentFile, studentData, (err) => {

    if (err) {
        console.log("Error writing file:", err);
        return;
    }

    console.log("student.txt created and data written.");

    fs.appendFile(
        studentFile,
        "\nCourse: Full Stack Web Development",
        (err) => {

            if (err) {
                console.log("Error appending file:", err);
                return;
            }

            console.log("Course name appended.");

            fs.readFile(
                studentFile,
                "utf8",
                (err, data) => {

                    if (err) {
                        console.log("Error reading file:", err);
                        return;
                    }

                    console.log("\nFile Content:");
                    console.log(data);

                    fs.rename(
                        studentFile,
                        profileFile,
                        (err) => {

                            if (err) {
                                console.log(
                                    "Error renaming file:",
                                    err
                                );
                                return;
                            }

                            console.log(
                                "\nFile renamed to profile.txt"
                            );
                        }
                    );
                }
            );
        }
    );
});