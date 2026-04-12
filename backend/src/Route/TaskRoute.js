const router = require('express').Router();
const TaskController = require('../Controller/TaskController');
const authMiddleware = require('../Middleware/AuthMiddleware');

// All task routes are protected by authMiddleware
router.use(authMiddleware);

router.post('/add', TaskController.addTask);
router.get('/all', TaskController.getAllTasks);
router.get('/get/:id', TaskController.getTaskById);
router.put('/update/:id', TaskController.updateTask);
router.delete('/delete/:id', TaskController.deleteTask);

module.exports = router;
