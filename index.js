import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import './src/services/db.js';
import config from './utils/config.js';
import handleError from './src/middleware/handleError.js';
import userRoutes from './src/routes/userRoutes.js';
import personRoutes from './src/routes/personRoutes.js';
import Person from './src/models/Person.js';
import seedPeople from './src/seed/people.js';

if ((await Person.count()) === 0) {
  console.log('Seeding people table...');
  await seedPeople();
}

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Table API');
});

app.use('/', userRoutes);
app.use('/api/people', personRoutes);

app.use(handleError);

app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}...`);
});
