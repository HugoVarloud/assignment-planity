import { uploadFile } from '../services/uploadService.js';

const uploadController = async (req, res) => {
    try {
        const file = req.file;
        const { description } = req.body;        

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const result = uploadFile(file, description);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'File upload failed', error });
    }
};

export { uploadController };
