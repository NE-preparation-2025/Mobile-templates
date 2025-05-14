import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import tokenRoutes from './routes/token.js';



const app=express();
app.use(express.json());
app.use('/api/tokens',tokenRoutes);
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

export default app;