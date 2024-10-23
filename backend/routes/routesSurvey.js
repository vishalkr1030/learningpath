const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
const course = require('../controllers/course');
const certificate = require('../controllers/certificate');
const { getLearningPaths, addLearningPath } = require('../controllers/learningPath');
const enrollment = require('../controllers/enrollment');

router.get('/login/getUsers', login.getUsers);
router.post('/login', login.getUsersByEmail);
router.delete('/login/delUsers/:id', login.delUsers);
router.put('/login/updateUsers/:id', login.updateUsers);

router.post('/signup', login.postUsers);

router.get('/getCourses', course.getCourses);

router.post('/certificates', certificate.getCertificates);
router.post('/certificates/post', certificate.updateCertificateStatus);
router.post('/performance/score', certificate.submitScore);

router.get('/learning-paths', getLearningPaths);
router.post('/learning-paths', addLearningPath);

router.post('/assign-courses', enrollment.assignCourse);
router.post('/enrollcourses', enrollment.enrollCourse);
router.post('/getEmployeeProgress', enrollment.getEmployeeProgress);
router.get('/getEnrollments', enrollment.getEnrollments);

router.post('/completionRate', enrollment.completionRate);
router.post('/getUserCourses', enrollment.getUserCourses);
router.post('/getUserCoursestype', enrollment.getUserCoursesType);

module.exports = router;
