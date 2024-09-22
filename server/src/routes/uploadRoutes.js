import express from 'express';
import { uploadController } from '../controllers/uploadController.js';
import multer from 'multer';

const router = express.Router();

// const storage = mutler.memoryStorage... to hold data in a bucket s3 for exemple
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
const upload = multer({ storage })

router.post('/', upload.single('file'), uploadController);

export default router;
