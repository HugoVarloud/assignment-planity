import express from 'express';
import cors from 'cors';
import multer from 'multer';

const app = express();
app.use(express.json());
app.use(cors());

// mutler.memoryStorage to send data to a bucket s3 for exemple
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
const upload = multer({ storage })

app.post('/api/file-upload', upload.single('file'), (req, res) => {
    try {
      console.log('', req.file);
      
        res.json(req.file);
    } catch (error) {
        res.status(500).json({ error: error });
    }
})
app.listen(3000, () => console.log('RUNNING ON PORT 3000'));