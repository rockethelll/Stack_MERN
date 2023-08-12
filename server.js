import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import indexRouter from './routes/index.js';
import authorRouter from './routes/authors.js';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
  });
  app.use('/', indexRouter);
  app.use('/authors', authorRouter);
})
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });


