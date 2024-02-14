import express from 'express';
const app = express();
app.use(express.json());

import { router as getRoutes } from './HTTP-req/get.js';
import { router as delRoutes } from './HTTP-req/delete.js';
import { router as putRoutes } from './HTTP-req/put.js';
import { router as postRoutes } from './HTTP-req/post.js';

app.use(getRoutes);
app.use(delRoutes);
app.use(putRoutes);
app.use(postRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port: ${port}...`));