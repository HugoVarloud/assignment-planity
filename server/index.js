import express from 'express';
import cors from 'cors';
import uploadRoutes from './src/routes/uploadRoutes.js';
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/upload', uploadRoutes);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
