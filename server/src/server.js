// Call the packages needed
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configure app to use bodyParser()
// This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register routes
// all routes will be prefixed with /api
app.use('/api/v1/users', userRoutes());

app.get('/', (req, res) => {
  res.send({ greeting: 'hello world' });
});

// error handler
app.use((err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    res.status(422).send({ error: err.errors[0].message });
  } else {
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
});


// Start server
app.listen(port, () => {
  console.log(`i m listening on port ${port}`);
});

export default app;
