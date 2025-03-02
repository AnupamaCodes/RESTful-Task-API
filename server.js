const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON request bodies

let tasks = []; // In-memory array to store tasks
let currentId = 1; // To generate unique IDs

// GET /api/tasks - Returns a list of tasks
app.get("/api/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// POST /api/tasks - Adds a new task
app.post("/api/tasks", (req, res) => {
  const { name, completed } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Task name is required" });
  }
  const newTask = { id: currentId++, name, completed: completed || false };
  tasks.push(newTask);
  res.status(201).json(newTask);
  console.log(req.body);
});

// DELETE /api/tasks/:id - Deletes a task by its ID
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  tasks.splice(taskIndex, 1);
  res.status(200).json({ message: "Task deleted successfully" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
/* Instructions to Run the API Locally */
// 1. Clone the repository: git clone <repository_link>
// 2. Navigate to the project directory: cd project_folder
// 3. Install dependencies: npm install
// 4. Start the server: npm start
// 5. Access the API at http://localhost:3000/api/tasks
