import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import { KojiBackend } from '@withkoji/core';

import kojiConfig from '../../koji.json';
import getEntries from './routes/getEntries';
import postEntry from './routes/postEntry';
import getWinner from './routes/getWinner';
import postWinner from './routes/postWinner';
import deleteEntry from './routes/deleteEntry';
import deleteWinner from './routes/deleteWinner';
import getUserId from './routes/getUserId';

const app = express();

// Use process.env as default (for deployments)
const PORT = process.env.PORT || 3333;

// Enable cors for preflight
app.options('*', cors());

// Whitelist all routes with cors
app.use(cors());

// Configure express to use Koji middleware
app.use(KojiBackend.middleware(kojiConfig));

// Use express json
app.use(express.json());

// Parse application/json
app.use(bodyParser.json());

// Make sure no responses are getting cached
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

// Enable gzip compression
app.use(compression());

// Define our routes
app.get('/entries', getEntries);
app.post('/entry', postEntry);
app.delete('/entry/:id', deleteEntry);
app.get('/winner', getWinner);
app.post('/winner', postWinner);
app.delete('/winner', deleteWinner);
app.get('/userId', getUserId);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
