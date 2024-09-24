import { zipFile } from '../services/uploadService.js';

const uploadController = async (req, res) => {
    try {
        const { file } = req;
        if (!file) {
            return res.status(400).send({ 
                message: 'No file uploaded',
                success: false
            });
        }

        const zippedFile = await zipFile(file);
        console.log(zippedFile);
        
        res.download(zippedFile.path, `${file.originalname}.zip`, (err) => {
            if (err) {
                console.error('Error while sending the zip file:', err);
                throw new Error;
            }

            // cleanUpFiles(file.path, zipFilePath);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            message: 'File upload failed',
            success: false,
            error });
    }
};

export { uploadController };
