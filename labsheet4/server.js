const http = require("http");
const url = require("url");

const students = [
    {
        id: 1,
        name: "Anshul",
        course: "B.Tech CSE"
    },
    {
        id: 2,
        name: "Rahul",
        course: "B.Tech CSE"
    },
    {
        id: 3,
        name: "Aman",
        course: "B.Tech CSE"
    }
];


const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(
        req.url,
        true
    );

    const pathname = parsedUrl.pathname;


    // GET /
    if (req.method === "GET" && pathname === "/") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(`
            <h1>Welcome to Student Server</h1>
            <p>Node.js HTTP Server is running.</p>
        `);

        return;
    }


    // GET /students
    if (
        req.method === "GET" &&
        pathname === "/students"
    ) {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(students));

        return;
    }


    // GET /students/:id
    if (
        req.method === "GET" &&
        pathname.startsWith("/students/")
    ) {

        const id = parseInt(
            pathname.split("/")[2]
        );

        const student = students.find(
            (student) => student.id === id
        );


        if (student) {

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(student));

        } else {

            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            res.end(
                JSON.stringify({
                    error: "Student not found"
                })
            );
        }

        return;
    }


    // GET /search?keyword=node
    if (
        req.method === "GET" &&
        pathname === "/search"
    ) {

        const keyword =
            parsedUrl.query.keyword || "";

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(`
            <h1>Search Result</h1>
            <p>Keyword: ${keyword}</p>
        `);

        return;
    }


    // Any other route
    res.writeHead(404, {
        "Content-Type": "text/html"
    });

    res.end(`
        <h1>404 - Page Not Found</h1>
    `);
});


server.listen(3000, () => {

    console.log(
        "Server running at http://localhost:3000"
    );

});