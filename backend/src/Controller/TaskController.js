const Task = require('../Model/TaskModel');

const addTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({
            title,
            description,
            user: req.user.id // From AuthMiddleware
        });

        await newTask.save();
        res.status(201).json({
            message: "Task added successfully",
            data: newTask
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json({
            message: "Tasks fetched successfully",
            data: tasks
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({
            message: "Task fetched successfully",
            data: task
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { title, description, status },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        res.status(200).json({
            message: "Task updated successfully",
            data: task
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        
        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        res.status(200).json({
            message: "Task deleted successfully"
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};
