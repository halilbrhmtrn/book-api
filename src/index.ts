import express, { Request, Response } from 'express';
import Joi from 'joi';

const app = express();
const PORT = process.env.PORT || 3019;

app.use(express.json());

// Endpoint to test server
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

