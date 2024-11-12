// routes/courseRoutes.js
const express = require('express');
const courseController = require('../controllers/courseController');
const { verifyToken, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

// Admin routes - CRUD
router.post('/courses', verifyToken, restrictTo, courseController.createCourse);
router.patch('/courses/:id', verifyToken, restrictTo, courseController.updateCourse);   
router.delete('/courses/:id', verifyToken, restrictTo, courseController.deleteCourse);

// Read-only access for all roles
router.get('/', verifyToken, courseController.getCourses);

module.exports = router;
