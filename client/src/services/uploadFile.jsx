import axios from 'axios';

const uploadFiles = async (formData) => {
    try {
        console.log(formData);
        
        const file = await axios.post(`${import.meta.env.VITE_API_PATH}/files/uploads`, formData, {
            responseType: 'blob',
        });
    
        return file;
    } catch (error) {
        console.log(error);
    }
}

export default uploadFiles