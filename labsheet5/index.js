const express = require("express");
const dotenv = require("dotenv");

const studentsRouter = require("./routes/students");
const booksRouter = require("./routes/books");
const membersRouter = require("./routes/members");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;


// ==========================================
// BUILT-IN MIDDLEWARE
// ==========================================

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// ==========================================
// STATIC FILES
// ==========================================

app.use(express.static("public"));


// ==========================================
// CUSTOM LOGGER MIDDLEWARE
// ==========================================

app.use((req, res, next) => {

    const time = new Date().toLocaleString();

    console.log(
        `[${time}] ${req.method} ${req.url}`
    );

    next();
});


// ==========================================
// API KEY MIDDLEWARE
// Applied only to /admin
// ==========================================

const adminAuth = (req, res, next) => {

    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
        return res.status(403).json({
            error: "Forbidden: x-api-key is required"
        });
    }

    next();
};

app.use("/admin", adminAuth);


// ==========================================
// BASIC ROUTES
// ==========================================

// GET /
app.get("/", (req, res) => {

    res.send("Express Lab Running");

});


// GET /about
app.get("/about", (req, res) => {

    res.json({
        name: "Anshul",
        rollNumber: "YOUR_ROLL_NUMBER"
    });

});


// GET /courses
app.get("/courses", (req, res) => {

    res.json([
        "Full Stack Web Development",
        "Data Structures and Algorithms",
        "Database Management System"
    ]);

});


// POST /echo
app.post("/echo", (req, res) => {

    res.json(req.body);

});


// ==========================================
// STUDENT ROUTE - SIMPLE VERSION
// Part C
// ==========================================

app.get("/students/:id", (req, res) => {

    const id = req.params.id;

    res.json({
        id: id,
        message: "Student details"
    });

});


// ==========================================
// SEARCH QUERY
// GET /search?name=Anshul&age=20
// ==========================================

app.get("/search", (req, res) => {

    const name = req.query.name;
    const age = req.query.age;

    res.json({
        name: name,
        age: age
    });

});


// ==========================================
// PRODUCT CATEGORY + ID
// ==========================================

app.get(
    "/products/:category/:id",
    (req, res) => {

        res.json({
            category: req.params.category,
            id: req.params.id
        });

    }
);


// ==========================================
// ADMIN DASHBOARD
// ==========================================

app.get("/admin/dashboard", (req, res) => {

    res.json({
        message: "Welcome to Admin Dashboard",
        data: "Protected admin data"
    });

});


// ==========================================
// REGISTER
// ==========================================

app.post("/register", (req, res) => {

    const {
        name,
        email,
        password
    } = req.body;

    res.json({
        message: `Registration successful for ${name}`,
        email: email
    });

});


// ==========================================
// CONTACT
// ==========================================

app.post("/contact", (req, res) => {

    console.log("Contact Form Data:");
    console.log(req.body);

    res.json({
        message: "Thank you for contacting us!"
    });

});


// ==========================================
// ROUTERS
// ==========================================

app.use("/api/students", studentsRouter);

app.use("/api/books", booksRouter);

app.use("/api/members", membersRouter);


// ==========================================
// 404 HANDLER
// ==========================================

app.use((req, res, next) => {

    const error = new Error("Route not found");

    error.status = 404;

    next(error);

});


// ==========================================
// CENTRAL ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {

    console.error("Error:", err.message);

    const statusCode = err.status || 500;

    res.status(statusCode).json({
        error: err.message || "Internal Server Error"
    });

});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {

    console.log(
        `Express server running on port ${PORT}`
    );

    console.log(
        `http://localhost:${PORT}`
    );

});