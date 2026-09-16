const express = require("express");

const router = express.Router();

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

// GET /api/students
router.get("/", (req, res) => {
    res.json(students);
});

// GET /api/students/:id
router.get("/:id", (req, res, next) => {

    const id = Number(req.params.id);

    const student = students.find(
        student => student.id === id
    );

    if (!student) {
        const error = new Error("Student not found");
        error.status = 404;
        return next(error);
    }

    res.json(student);
});

module.exports = router;