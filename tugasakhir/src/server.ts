// server.ts
import express from 'express';
import db from './database'; // Adjust the path according to your project structure
import bodyParser from 'body-parser';
import routes from './route'; // Adjust the import path

const app = express();
const PORT = process.env.PORT || 3000;

db(); // Initialize database connection

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
