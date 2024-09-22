import path from 'path';

const uploadFile = (file, description) => {    
    const uploadPath = path.join('../uploads', file.filename);
    console.log('Hello', uploadPath);

    return {
        message: 'File uploaded successfully!',
        fileName: file.filename,
        filePath: uploadPath,
        description,
    };
};

export { uploadFile };
