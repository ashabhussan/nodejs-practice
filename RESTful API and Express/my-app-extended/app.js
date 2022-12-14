const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    response.send("Hello from express js!");
});

// GET => List
// GET detail => students/2
// POST

app.get('/api/students', (req, res) => {
    db.getDbStudents()
        .then(students => res.send(students));
});

app.post('/api/students', (req, res) => {
    const student = req.body;
    db.getDbStudents()
        .then(students => {
            students.push(student);
            db.insertDbStudent(students)
                .then(data => {
                    res.send(student);
                });
        });
});

app.get('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    db.getDbStudents()
        .then(students => {
            const student = students.find(s => s.id === id);
            if (!student) res.status(404).send("No student found with this id!");
            else res.send(student);
        });
});

app.put('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    db.getDbStudents()
        .then(students => {
            const student = students.find(s => s.id === id);
            if (!student) res.status(404).send("No student found with this id!");
            else {
                const i = students.findIndex(s => s.id === id);
                students[i] = updatedData;
                db.insertDbStudent(students)
                    .then(msg => res.send(updatedData));
            }
        });
});

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}....`);
});