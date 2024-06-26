const express = require('express');
const resumePDFController = require('../../controllers/resumePDF.controller');

const router = express.Router();

// router.route('/upload').post(upload.single('pdf'), resumePDFController.uploadResumePDF);
router.route('/files').get(resumePDFController.getResumeByList);
router.route('/file/:id').get(resumePDFController.getResumeById);
router.route('/file/:id').delete(resumePDFController.deleteResumeById);
router.route('/filepage').get(resumePDFController.getResumeBypage);
module.exports = router;
