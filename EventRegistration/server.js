
const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Initial Registration Data
let registrations = [
    {
        id: 501,
        participantName: "Riya Sharma",
        eventName: "Tech Fest",
        department: "CSE",
        ticketCount: 2,
        paymentStatus: "Paid"
    },
    {
        id: 502,
        participantName: "Arjun Mehta",
        eventName: "Code Sprint",
        department: "IT",
        ticketCount: 1,
        paymentStatus: "Pending"
    },
    {
        id: 503,
        participantName: "Neha Verma",
        eventName: "Tech Fest",
        department: "ECE",
        ticketCount: 3,
        paymentStatus: "Paid"
    }
];

// Validation Function
function validateRegistration(data) {
    const {
        participantName,
        eventName,
        department,
        ticketCount,
        paymentStatus
    } = data;

    if (
        typeof participantName !== "string" ||
        !participantName.trim() ||
        typeof eventName !== "string" ||
        !eventName.trim() ||
        typeof department !== "string" ||
        !department.trim() ||
        !Number.isInteger(ticketCount) ||
        ticketCount <= 0 ||
        !["Paid", "Pending"].includes(paymentStatus)
    ) {
        return false;
    }

    return true;
}

// 1. GET All Registrations
app.get("/api/registrations", (req, res) => {
    res.status(200).json(registrations);
});

// 2. POST New Registration
app.post("/api/registrations", (req, res) => {

    const data = req.body;

    if (!validateRegistration(data)) {
        return res.status(400).json({
            message: "Invalid registration data"
        });
    }

    const newRegistration = {
        id: Math.max(...registrations.map(r => r.id), 500) + 1,
        participantName: data.participantName.trim(),
        eventName: data.eventName.trim(),
        department: data.department.trim(),
        ticketCount: data.ticketCount,
        paymentStatus: data.paymentStatus
    };

    registrations.push(newRegistration);

    res.status(201).json({
        message: "Registration created successfully",
        registration: newRegistration
    });
});

// 3. GET Registrations by Department
app.get("/api/registrations/filter", (req, res) => {

    const department = req.query.department;

    if (!department || !department.trim()) {
        return res.status(400).json({
            message: "Department query parameter is required"
        });
    }

    const result = registrations.filter(
        r => r.department.toLowerCase() === department.trim().toLowerCase()
    );

    res.status(200).json(result);
});

// 4. GET Pending Registrations
app.get("/api/registrations/pending", (req, res) => {

    const result = registrations.filter(
        r => r.paymentStatus === "Pending"
    );

    res.status(200).json(result);
});

// 5. GET Registration by ID
app.get("/api/registrations/:id", (req, res) => {

    const id = Number(req.params.id);

    const registration = registrations.find(
        r => r.id === id
    );

    if (!registration) {
        return res.status(404).json({
            message: "Registration not found"
        });
    }

    res.status(200).json(registration);
});

// 6. PUT Update Registration
app.put("/api/registrations/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = registrations.findIndex(
        r => r.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Registration not found"
        });
    }

    if (!validateRegistration(req.body)) {
        return res.status(400).json({
            message: "Invalid registration data"
        });
    }

    registrations[index] = {
        id: id,
        participantName: req.body.participantName.trim(),
        eventName: req.body.eventName.trim(),
        department: req.body.department.trim(),
        ticketCount: req.body.ticketCount,
        paymentStatus: req.body.paymentStatus
    };

    res.status(200).json({
        message: "Registration updated successfully",
        registration: registrations[index]
    });
});

// 7. DELETE Registration
app.delete("/api/registrations/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = registrations.findIndex(
        r => r.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Registration not found"
        });
    }

    registrations.splice(index, 1);

    res.status(200).json({
        message: "Registration deleted successfully"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
