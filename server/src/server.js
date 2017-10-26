// Call the packages needed
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
console.log(`port is ${port}`);

// Configure app to use bodyParser()
// This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register routes
// all routes will be prefixed with /api
// app.use('/api', router);

app.get('/', (req, res) => {
  console.log('in the home handler');
  res.send({ greeting: 'hello world' });
});

// Start server
app.listen(port, () => {
  console.log(`i m listening on port ${port}`);
});

export default app;
