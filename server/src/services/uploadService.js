import AdmZip from 'adm-zip';
import path from 'path';
import fs from 'fs';

const zipFile = async (file) => {
    try {
        const uploadPath = path.join('./uploads', file.filename);
        if (!fs.existsSync(uploadPath)) {
            throw new Error('File does not exist');
        }

        const zip = new AdmZip();
        zip.addLocalFile(uploadPath);
        const outputFile = path.join('./zip', `${file.filename}.zip`);
        zip.writeZip(outputFile);
        console.log(`Created ${outputFile} successfully`);
        return {
            path: outputFile,
            message: 'File uploaded and zipped successfully!',
            success: true
        };
    } catch (error) {
        console.error('Error while zipping file:', error);
        return {
            message: 'Failed to zip the file',
            success: false
        };
    }
};

export { zipFile };
