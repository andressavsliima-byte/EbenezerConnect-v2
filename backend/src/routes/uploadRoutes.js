import express from 'express';
import upload from '../middleware/upload.js';
import * as uploadController from '../controllers/uploadController.js';
import { authenticate, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Upload de imagem (admin)
router.post('/upload', authenticate, adminOnly, upload.single('image'), uploadController.uploadImage);

// Upload de avatar (usuário logado)
router.post('/upload/avatar', authenticate, upload.single('image'), uploadController.uploadImage);

// Delete de imagem (admin) - usa publicId do Cloudinary
router.delete('/upload/:publicId', authenticate, adminOnly, uploadController.deleteImage);

export default router;
