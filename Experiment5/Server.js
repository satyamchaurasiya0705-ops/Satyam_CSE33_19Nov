
const express = require("express");

const app = express();

// Middleware to read JSON data
app.use(express.json());

// Sample student data
let students = [
    { id: 1, name: "Satyam", course: "CSE" },
    { id: 2, name: "Rahul", course: "IT" }
];

// GET - Retrieve all students
app.get("/students", (req, res) => {
    res.status(200).json(students);
});

// POST - Add a new student
app.post("/students", (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        course: req.body.course
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

// PUT - Update student details
app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.course = req.body.course;

    res.json({
        message: "Student updated successfully",
        student: student
    });
});

// DELETE - Delete a student
app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.json({
        message: "Student deleted successfully"
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
