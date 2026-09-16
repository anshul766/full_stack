const express = require("express");

const router = express.Router();

let members = [
    {
        id: 1,
        name: "Anshul",
        email: "anshul@example.com"
    },
    {
        id: 2,
        name: "Rahul",
        email: "rahul@example.com"
    },
    {
        id: 3,
        name: "Aman",
        email: "aman@example.com"
    }
];

// GET /api/members
router.get("/", (req, res) => {
    res.json(members);
});

// GET /api/members/:id
router.get("/:id", (req, res, next) => {

    const id = Number(req.params.id);

    const member = members.find(
        member => member.id === id
    );

    if (!member) {
        const error = new Error("Member not found");
        error.status = 404;
        return next(error);
    }

    res.json(member);
});

// POST /api/members
router.post("/", (req, res) => {

    const { name, email } = req.body;

    const newMember = {
        id: members.length > 0
            ? Math.max(...members.map(member => member.id)) + 1
            : 1,
        name,
        email
    };

    members.push(newMember);

    res.status(201).json({
        message: "Member added successfully",
        member: newMember
    });
});

// PUT /api/members/:id
router.put("/:id", (req, res, next) => {

    const id = Number(req.params.id);

    const member = members.find(
        member => member.id === id
    );

    if (!member) {
        const error = new Error("Member not found");
        error.status = 404;
        return next(error);
    }

    const { name, email } = req.body;

    if (name !== undefined) {
        member.name = name;
    }

    if (email !== undefined) {
        member.email = email;
    }

    res.json({
        message: "Member updated successfully",
        member
    });
});

// DELETE /api/members/:id
router.delete("/:id", (req, res, next) => {

    const id = Number(req.params.id);

    const index = members.findIndex(
        member => member.id === id
    );

    if (index === -1) {
        const error = new Error("Member not found");
        error.status = 404;
        return next(error);
    }

    const deletedMember = members.splice(index, 1)[0];

    res.json({
        message: "Member deleted successfully",
        member: deletedMember
    });
});

module.exports = router;